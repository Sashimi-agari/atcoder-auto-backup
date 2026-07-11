import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { z } from "zod";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import { exit } from "process";
import * as cheerio from "cheerio";
import { execSync } from "child_process";

dayjs.extend(utc);
dayjs.extend(timezone);

const SETTING_JSON = "settings.json";
const BASE_API_ENDPOINT =
  "https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions";
const BASE_SUBMISSION_ENDPOINT = "https://atcoder.jp/contests";

type Setting = {
  userName: string;
  lastModified: number;
};

const submission = z.object({
  id: z.number(),
  contest_id: z.string(),
  problem_id: z.string(),
  language: z.string(),
  result: z.string(),
});

// ここで現在のyyyymmddを取得して、そのディレクトリに提出物ファイルを作っていきます。
const getCurrent = () => {
  const yyyymmdd = dayjs()
    .tz("Asia/Tokyo")
    .format("YYYYMMDD");
  return {
    currentUnix: dayjs().unix(),
    yyyymmdd,
  };
};

// settings.jsonのlastModifiedを更新 & commitしてコードを終了する
const end = (json: Setting, yyyymmdd: string, count: number) => {
  writeFileSync(SETTING_JSON, JSON.stringify(json), "utf-8");
  execSync(`git add ${SETTING_JSON}`);
  const commitMessage = `AtCoder submissions on ${yyyymmdd} - ${count} submissions`;
  execSync(`git commit -m "${commitMessage}"`);
  exit(0);
};


const main = async () => {
  // 現在時刻の取得と設定JSONからAtCoderユーザーとlastModifiedの取得
  const { currentUnix, yyyymmdd } = getCurrent();
  const settings = JSON.parse(readFileSync(SETTING_JSON, "utf-8")) as Setting;
  const user = settings.userName;
  const lastModified = settings.lastModified;
  const nextJson = { ...settings, lastModified: currentUnix };
  
  if (!user || !lastModified) {
    throw new Error("settings.jsonが壊れてます！");
  }

  // kenkoooさんありがとうございます！
  const endpoint = `${BASE_API_ENDPOINT}?user=${user}&from_second=${lastModified}`;
  const resp = await fetch(endpoint);
  const json = await resp.json();
  const submissions = submission.array().parse(json);

  // 自分は普段C++しかつかわないので提出をC++でフィルタしていて、ACした提出のみをcommitするようにしています。
  const cppAcSubs = submissions.filter(
    ({ result, language }) =>
      result === "AC" && language.toLowerCase().startsWith("c++"),
  );

  // 提出がない場合はコミットしないように
  if (cppAcSubs.length === 0) {
    return;
  }
  
  const acCount = cppAcSubs.length;

  // submissions/yyyymmdd/ ディレクトリの作成
  const dir = `submissions/${yyyymmdd}`;
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  // 同じ問題への違う提出があった際に別々のファイルとして格納できるように提出数をもっておくcounter
  const counter: Record<string, number> = {};
  
  for (const { contest_id, id, problem_id } of cppAcSubs) {
    const endpoint = `${BASE_SUBMISSION_ENDPOINT}/${contest_id}/submissions/${id}`;
    const resp = await fetch(endpoint);
    const html = await resp.text();

    // 提出コードの取得
    const $ = cheerio.load(html);
    const code = $("#submission-code").text();
    
    const baseFileName = `submissions/${yyyymmdd}/${problem_id}`;
    const preCount = counter[problem_id];
    
    // 同じ問題への提出が重なった場合はsubmissions/20250101/abc123a-2.cpp とかで格納されるように 
    const fileName = preCount
      ? `${baseFileName}_${preCount + 1}.cpp`
      : `${baseFileName}.cpp`;
    
    const cc = preCount ?? 0;
    counter[problem_id] = cc + 1;

    // ファイルの作成・git操作
    writeFileSync(fileName, code, "utf-8");
    execSync(`git add ${fileName}`);
    const commitMessage = `Submission for ${problem_id} on ${yyyymmdd}`;
    console.log(commitMessage);
    execSync(`git commit -m "${commitMessage}"`);
  }
  end(nextJson, yyyymmdd, acCount);
};


main().catch(console.error);

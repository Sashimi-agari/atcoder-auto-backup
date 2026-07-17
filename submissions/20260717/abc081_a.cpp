#include <bits/stdc++.h>
using namespace std;

int main() {
  string a;
  cin >> a;
  
  int ans = 0;
  
  if(a.at(0) == '1') ans++;
  if(a.at(1) == '1') ans++;
  if(a.at(2) == '1') ans++;
  
  cout << ans << endl;
}

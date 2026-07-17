#include <bits/stdc++.h>
using namespace std;

int main() {
  int H, W;
  cin >> H >> W;
  vector<string> a(H);
  string b;
  
  for(int i = 0; i < H; i++) {
    cin >> a.at(i);
  }
  
  for(int i = 0; i < W + 2; i++){
    b += '#';
  }
  
  cout << b << endl;
  
  for(int i = 0; i < H; i++) {
    cout << "#" << a.at(i) << "#" << endl;
  }
  
  cout << b <<endl;
}

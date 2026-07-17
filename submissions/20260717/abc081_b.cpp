#include <bits/stdc++.h>
using namespace std;

int main() {
  int N;
  cin >> N;
  
  int ans = 0;
  
  vector<int> a(N);
  for(int i = 0; i < N; i++) {
    cin >> a.at(i);
  }
  
  while(true) {
    bool odd = false;
    
    for(int i = 0; i < N; i++) {
      if(a.at(i) % 2 != 0) {
        odd = true;
      }
    }
    
    if(odd) break;
    
    for(int i = 0; i < N; i++) {
      a.at(i) /= 2;
    }
    
    ans++;
  }
  
  cout << ans <<endl;
}

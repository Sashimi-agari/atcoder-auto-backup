#include <bits/stdc++.h>
using namespace std;

int main() {
  int n;
  cin >> n;
  
  int x = 10000, y = 10000;
  
  for(int i = 0; i < n; i++) {
    int a, b;
    cin >> a >> b;
    y -= a;
    
    string s;
    cin >> s;
    
    if(s == "keep") {
      x -= b;
    }
    else {
      x -= a;
    }
  }
  
  cout << y - x <<endl;
}
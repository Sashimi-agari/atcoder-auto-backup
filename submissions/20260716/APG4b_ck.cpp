#include <bits/stdc++.h>
using namespace std;

int main() {
  string S;
  cin >> S;
  int a = 1;

  for(int i = 1; i < S.size(); i += 2) {
    if(S.at(i) == '+') {
      a += 1;
    }
    else {
      a -= 1;
    }
  }
  
  cout << a <<endl;
}

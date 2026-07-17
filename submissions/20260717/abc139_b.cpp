#include <bits/stdc++.h>
using namespace std;

int main() {
  int a, b, m, i;
  cin >> a >> b;
  
  i = 0;
  
  for(m = 1; m < b; i++) {
    m = m - 1 + a;
  }
  
  cout << i << endl;
}
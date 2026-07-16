#include <bits/stdc++.h>
using namespace std;

int main() {
  int N, a;
  cin >> N;
  int i;
  
  for(i = 0; i < N; i++) {
    int l, r;
    cin >> l >> r;
    a += r - l + 1;
  }
  
  cout << a << endl;
}

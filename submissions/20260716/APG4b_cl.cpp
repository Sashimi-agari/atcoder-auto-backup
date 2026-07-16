#include <bits/stdc++.h>
using namespace std;

int main() {
  int N, A;
  cin >> N >> A;
  int i;

  for(i = 0; i < N; i++) {
    int B;
    string op;
    cin >> op >> B;
    
    if(op == "+") {
      A += B;
      cout << i + 1 << ":" << A << endl;
    }
    
    else if(op =="-") {
      A -= B;
      cout << i + 1 << ":" << A << endl;
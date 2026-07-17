#include <bits/stdc++.h>
using namespace std;

int main() {
  int A, B, C;
  cin >> A >> B >> C;
  
  int high, low;
  high = max(max(A, B), C);
  low = min(min(A, B), C);
  
  int answer;
  answer = high - low;
  cout << answer << endl;
}

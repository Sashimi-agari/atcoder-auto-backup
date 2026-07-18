#include <bits/stdc++.h>
using namespace std;

int main() {
  double h, w;
  cin >> h >> w;
  
  double bmi;
  bmi = w * 100 * 100 / h / h;
  
  if(bmi < 25) {
    cout << "No" << endl;
  }
  else {
    cout << "Yes" << endl;
  }
  
}
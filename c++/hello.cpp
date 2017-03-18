#include <iostream>
#include <ctime>
using namespace std;

int max(int x,int y);
int main(){
  cout << "Hello World \n";
  for(int i=0;i<5;i++){
  cout << "Run forever\n";
  }
  cout << max(7,666);
  int y=[](int x, int y){ return x - y ; }(799,8);
  cout << [](){return "\nwhat?\n";}();
  cout << y;
  srand(time(NULL));
  cout << rand() <<endl;
  cout << &y <<endl;
time_t now = time(0);
 cout << now <<endl;
  return 0;
}

int max(int x,int y){
return  x>y?x:y;
}

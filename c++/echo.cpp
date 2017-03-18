#include <iostream>
using namespace std;
int main(int x,char* args[]){
    for(int i=1;i<x;i++){
        cout << args[i]<< " ";
    }
    cout <<endl;
    /**
    string line;
    getline(cin,line);
    cout<<line<<endl;
    **/
    return true;
}
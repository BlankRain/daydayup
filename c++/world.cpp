#include <pthread.h>
#include <iostream>
using namespace std;

void* say_hello(void* args);
int main (){
cout << "world" <<endl;

pthread_t tids[5];
 for(int i=0;i<5;i++){
   int ret=pthread_create(&tids[i],NULL,say_hello,&i);
   if(ret != 0){
     cout << "error" <<endl;
   }
 }
 pthread_exit(NULL);
}


void* say_hello(void* args){
    cout << "Hello Runoob！" << args << endl;
}

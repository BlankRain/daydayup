"use strict";

function World(){
    "World"
}

class OK{}
interface LookGood{}

class Person{
    ok:OK
    lookGood:LookGood
    constructor(x:OK,y:LookGood){
        this.ok=x;
        this.lookGood=y;
    }
}
let v=new Person("a","b");

import process=require('process')

var currentDir = process.cwd();

console.log(currentDir)

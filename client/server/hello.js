function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
class Student {
    constructor(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}
var user = new Student("Jane", "M.", "User");
console.log(greeter(user));
let isDone = false;
let hex = 0x999;
//# sourceMappingURL=hello.js.map
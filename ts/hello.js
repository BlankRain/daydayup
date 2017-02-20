function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var Student = (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    return Student;
}());
var user = new Student("Jane", "M.", "User");
console.log(greeter(user));

/////////////PROTOTYPE////////////

/*

//es5 

var Person = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth; 
    this.job = job; 
}

Person.prototype.calAge = function() {
    console.log(2019 - this.yearOfBirth); 
}

var john = new Person('john', 1996, 'junior web developer'); 

console.log(john);
john.calAge();


var ben = new Person('ben', 1993, 'senior web developer'); 

ben.calAge();

*/

/////////   OBJECT.CREATE    ///////////

/*

var personProto = {
    calAge: function() {
        console.log(2016 - this.birth);
    }
};

var john = Object.create(personProto);
john.name = "john";
john.job = "desginer";


var ben = Object.create(personProto, {
    name: {value: 'ben'},
    birth: {value: '1993'},
    job: {value: "web dev"}
}); 

*/

////////////PRIMITIVES AND OBJECTS///////////////
// strings, bool, numbers, etc are primitives 

/*

var a = 3;
var b = a; 

a = 50; 
console.log(a + " " + b);

var obj1 = {
    name: 'john',
    age: 24
}

var obj2 = obj1;
obj1.age = 34; 
console.log(obj1);
console.log(obj2);

var age = 24; 
var obj3 = {
    name: 'tony',
    city: 'portland'
}

function change (a, b) {
    a = 30; 
    b.city = 'green bay';
}

change(age, obj3); 
console.log(age);
console.log(obj3.city)

*/

///////FIRST CLASS FUNCTIONS FUNCTION AS AN ARGUMENT/////////

/*

var years = [1990,1223,2009,2012,1945];

function arrayCal(arr, fn) {
    var arrRes = [];
    for (var i = 0; i < arr.length; i++) {
        arrRes.push(fn(arr[i])); 
    }
    return arrRes;
}

function calAge(el) {
    return (2016 - el); 
}

function isFullAge(el) {
    return el >= 18; 
}

function maxHeartRate(el) {

    if (el >= 18 && el <= 81) {
        return Math.round(206.9 - (.67 * el));
    } else {
        return -1; 
    }
}


var ages = arrayCal(years, calAge);

console.log(ages);

console.log(arrayCal(ages, maxHeartRate));

*/

/////////FIRST CLASS FUNCTIONS RETURNING A FUNCTION///////////

/*

function interviewQuestion(job) {
    if (job === 'designer') {
        return function(name) {
            console.log(name + ", explain what UX design is");
        }
    } else if (job === 'teacher') {
        return function(name) {
            console.log(name + ", explain why beating kids is OK");
        }
    } else {
        return function(name) {
            console.log('hello ' + name + " the fuck you do?");
        }
    } 
}

//passes in first param, then it returns a function and accepts the second param 
//which is declared using the variable after it was defined

//first param passed
var teachQuestion = interviewQuestion('teacher');
var designQueston = interviewQuestion('designer');

//second param passed
teachQuestion('john'); 
designQueston('ben');

//can do both first and second params in one sweep
interviewQuestion('dev')('bob');

*/

//////////  IIFE IMMEADIATELY INVOKED FUNCTION EXPRESSIONS   ////////////

// IIFE not reused, used for data privacy

/*

function game() {
    score = Math.random() * 10; 
    console.log(score >= 5);
}

game();

(function(goodLuck){
    score = Math.random() * 10; 
    console.log(score >= 5 - goodLuck);
})(5);

*/

////////////// CLOSURES ////////////

/*

function retire(retireAge) {
    return function(birth){
        var age = 2016 - birth; 
        console.log(retireAge - age);
    }
}

var retireUS = retire(66);
retireUS(1994);

function interviewQuestion(job) {
    return function (name) {
        if (job === 'designer') {
            console.log(name + ", explain what UX design is");
        } else if (job === 'teacher') {
            console.log(name + ", explain why beating kids is OK");
        } else {
            console.log('hello ' + name + " the fuck you do?");
        } 
    }
}

var designQuestion = interviewQuestion('designer');
var teacherQuestion = interviewQuestion('teacher');

designQuestion('Ben');
teacherQuestion('Arron');

**/

//////////// BIND CALL and APPLY /////////////

/*

var john = {
    name: "john",
    age: 34,
    job: "teacher",
    present: function(style, time) {
        if (style === 'formal') {
            console.log('Good ' + time + ' people ' + ' I am ' + this.name + ' I am ' + this.age  + ' I am a ' + this.job);
        } else if (style === 'friendly') {
            console.log('What\'s up I am ' + this.name + ' I am ' + this.age  + ' I am a ' + this.job + ' Have a good ' + time);
        }
    }
}

var emily = {
    name: "emily",
    age: 23,
    job: "developer"
}

john.present('formal', 'morning');

john.present.call(emily, 'friendly', 'afternoon')
same as call, sends params as array instead of individually 
john.present.apply(emily, ['friendly', 'night'])
var johnFriendly = john.present.bind(john, 'friendly');

johnFriendly('night');
johnFriendly('dawn');

var emilyFormal = john.present.bind(emily, 'formal');

emilyFormal('dusk');


var years = [1990,2001,1993,1995,2005];

function arrayCal(arr, fn) {
    var arrRes = [];
    for (var i = 0; i < arr.length; i++) {
        arrRes.push(fn(arr[i])); 
    }
    return arrRes;
}

function calAge(el) {
    return (2019 - el); 
}

function isFullAge(limit, el) {
    return el >= limit; 
}

var ages = arrayCal(years, calAge);
var fullJapan = arrayCal(ages, isFullAge.bind(this, 20)); 
var fullAmerican = arrayCal(ages, isFullAge.bind(this, 18));

console.log(ages);
console.log(fullAmerican);


*/


//////////////////    MAPS    ////////////
////////    HASH MAPS     /////////

/*

//a key value data structure 
//similar to creating objects

//creating a new map
const question = new Map(); 

//using the set method 
//first parameter of .set is the key, second value is the value of the key
question.set('question', 'what latest major js version?');
question.set(1,'es5');
question.set(2, 'es6');
question.set(3, 'es2015');
question.set(4, 'es2017');
question.set('correct', 3); 
question.set(true, 'correct answer');
question.set(false, 'wrong, try again');

//retreive data from a map 
//use the key to retrieve value of the key
//console.log(question.get('question'));
//can get the size or length of a map and cannot do that with an object
console.log(question.size);

using the .has method to check for a certain key, .delete() is used 
to delete data from a map 
if(question.has(4)){
    question.delete(4);
}

//.clear will clear all the data from a map 
question.clear()

*/

//////////  LOOPING THROUGH A MAP  /////////////

//USING FOR EACH
//value must come before key in forEach..?
//question.forEach((val, key) => console.log(`the key is ${key}, it's value is ${val}`));

//USING FOR OF 
//uses entries to return all entries of the map 
//destructures the data with [] so the values can be saved in seperate variables 

/*

for (let [key, val] of question.entries()) {
    console.log(`the key is ${key}, it's value is ${val}`);

can test data for specific types of data and print relevant information
for (let [key, val] of question.entries()) {
    if(typeof(key) === 'number') {
        console.log(`answer is ${key}: ${val} `);
    }
}

//parseInt() will turn input into an integer, otherwise it would be processed as a string
//if data entered is in string format parseInt() will not work 
const ans = parseInt(prompt('enter the answer'))

//below code use a condition statement instead of an if/else to determine if the answer is correct
console.log(question.get(ans === question.get('correct'))); 

//WHY MAPS ARE SUPERIOR TO OBJECTS
// 1. CAN USE ANYTHING AS A KEY
// 2. THEY CAN BE LOOPED THROUGH OBJECTS CANNOT 
// 3. YOU GET THE LENGTH OF THEM 
// 4. EASY TO ADD AND REMOVE DATA FROM A MAP

*/

/////////////// CLASSES  ///////////
//make it easier to manipulate inheritance 
/*

//es5 

var Person5 = function(name, birth, job) {
    this.name = name,
    this.birth = birth, 
    this.job = job 
}

Person5.prototype.calAge = function() {
    var age = new Date().getFullYear - this.birth; 
    console.log(age);
}

var john5 = new Person5('ben', 1993, 'web developer');
john5.calAge();

//es6
//removes the need for writing out functions, commas, and prototypes
//syntactic sugar that makes it easier to create classes
//downside, hides the object oriented nature of inheritance
//classes are not hoisted, they must be defined before they are used  

class Person6 {
    //define properties
    constructor (name, birth, job) {
        this.name = name; 
        this.birth = birth; 
        this.job = job;
    }
    //add methods
    calAge() {
        let age = new Date().getFullYear() - this.birth; 
        console.log(age);
    }
}

const ben1 = new Person6('ben', 1993, 'web dev')
ben1.calAge();

*/

///////     CLASSES WITH SUBCLASSES    ////////

/*
//es5 
//creating an object and then creating another object that inherits the properties of the first
//A super class is a class that defines properties of a sub class
//person5 is the super class, athlete5 is the sub class 

var Person5 = function(name, birth, job) {
    this.name = name,
    this.birth = birth, 
    this.job = job 
}

Person5.prototype.calAge = function() {
    var age = new Date().getFullYear() - this.birth; 
    //console.log(age);
    return age; 
}

var john5 = new Person5('ben', 1993, 'web developer');

var Athlete5 = function(name, birth, job, games, medals) {
    //calling "super class" 
    Person5.call(this, name, birth, job);
    this.games = games; 
    this.medals = medals;
}

//connects the two function constructors and their prototypes
Athlete5.prototype = Object.create(Person5.prototype);

//any prototypes an object should inherit must be connected before new prototypes declared
//only athlete instances will inherit this method
Athlete5.prototype.wonMedal = function()  {
    this.medals++; 
    console.log(this.medals);
}

var benAthlete5 = new Athlete5('ben', 1993, 'boxer', 4, 15); 

*/

//ES6 classes and subclasses 

/*

class Person5 {
    constructor(name, birth, job) {
        this.name = name; 
        this.birth = birth; 
        this.job = job; 
    }

    calAge() {
        var age = new Date().getFullYear() - this.birth; 
        //console.log(age);
        return age; 
    }   
}

//////// EXTENDING A CLASS ////////////

class Athlete5 extends Person5 
    //have to repeat propteries of class thats being inherited 
    constructor(name, birth, job, games, medals) {
        //call super with values from super class to fill in properties from there
        super(name, birth, job)
        this.games = games;
        this.medals = medals; 
    }

    wonMedal() {
        this.medals++;
        console.log(this.medals);  
    }
}

let newAthlete = new Athlete5('ben', 1993, 'boxer', 5, 158); 

*/

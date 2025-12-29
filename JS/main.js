const firstname = "Garrick";
console.log("Hello, " + firstname + "!");

let age = 30;
let height = 5.9;

let isStudent = false;

// firstname = "test"; // เนื่องด้วยตัวแปรเป็น const จึงไม่สามารถ re-assign ค่าได้
console.log("My name is", firstname, "and I am", age, "years old.");

let number1 = 5;
let number2 = 10;
let result = number1 % number2;
console.log("Mod = ", result);
let number3 = "It's number3 variable";
console.log("String concat: ", number1 + number3);
console.log(`${number1} > ${number2}: `, number1 > number2);

if (number1 > number2) console.log(`${number1} is more than ${number2}`);
else console.log(`${number1} is lower than ${number2}`);

console.log("----------");

// // Grade
// let score = prompt("Enter your score");
// console.log("Your score: ", score);

// if (score >= 80) {
//   console.log("เกรด A");
// } else if (score >= 70) {
//   console.log("เกรด B");
// } else if (score >= 60) {
//   console.log("เกรด C");
// } else if (score >= 50) {
//   console.log("เกรด D");
// } else {
//   console.log("เกรด F");
// }

let num = 20;
if (num % 2 === 0) {
  console.log(num, "is Even");
} else {
  console.log(num, "is Odd");
}

let counter = 0;
while (counter < 10) {
  // Do 10 times
  console.log("Hello, World");
  counter += 1;
  counter++;
}

for (let index = 0; index < 10; index++) {
  console.log("Hello World from for loop");
}

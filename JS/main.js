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

// let ages = [25, 30, 35, 40, 45];
// console.log("Ages:", ages);

// let fruits = ["apple", "banana", "cherry"];
// console.log("Fruits:", fruits);

// fruits.push("Mango");

// console.log("Fruits after push:", fruits);

// console.log("First fruit:", fruits.length);

// console.log("All element in fruits array");
// fruits.forEach((element, index) => {
//   console.log(index, element);
// });

// let student = [
//   { name: "John", age: 18, grade: "A" },
//   { name: "Jane", age: 18, grade: "B" },
// ];

// // console.log("All keys of object:", Object.keys(student));
// student.forEach((element, index) => {
//   console.log("Name", element.name);
//   console.log("Age", element.age);
//   console.log("Grade", element.grade);
//   if (index + 1 != student.length) {
//     console.log("--------------------");
//   }
// });
// student.push({ name: "Mike", age: 28, grade: "C" });
// console.log("Added new student:", student[student.length - 1]);
// student.pop();
// console.log("Removed last student. Current students:", student);

// let score1 = 10;
// let score2 = 80;

// function calculateGrade(score) {
//   if (score < 0 || score > 100) {
//     return "Invalid score";
//   }

//   if (score >= 90) {
//     return "A";
//   } else if (score >= 80) {
//     return "B";
//   } else if (score >= 70) {
//     return "C";
//   } else if (score >= 60) {
//     return "D";
//   } else {
//     return "F";
//   }
// }

// console.log("Score1:", score1, ", Grade:", calculateGrade(score1));
// console.log("Score2:", score2, ", Grade:", calculateGrade(score2));

let scores = [90, 80, 70, 60, 50];
// let newScores = [];

// for (let i = 0; i < scores.length; i++) {
//   console.log(scores[i]);
//   if (scores[i] >= 60) {
//     newScores.push(scores[i]);
//   }
// }

// for (let i = 0; i < scores.length; i++) {
//   console.log(`Score ${i + 1}: ${scores[i]}`);
// }

// console.log("------------------------------");
// scores = scores.map((s) => s - 10);

// scores.forEach((s, i) => {
//   console.log(`Score ${i + 1}:`, s);
// });

// let newScores = scores.filter((score) => score >= 70);
// console.log("new scores:", newScores);

let students = [
  { name: "Jim", age: 16, grade: "A" },
  { name: "Sara", age: 15, grade: "B" },
  { name: "John", age: 17, grade: "C" },
  { name: "Maya", age: 16, grade: "D" },
  { name: "Tom", age: 15, grade: "F" },
];

console.log("Students", students[0]);

let student = students.find((s) => {
  return s.name === "Jim";
});
let doubleScoreStudents = students.map((s) => ({ ...s, age: s.age * 2 }));
let highGradeStudents = students.filter((s) => s.grade === "A");
console.log("Found Student", student);
console.log("Double Score Student", doubleScoreStudents);
console.log("High Grade Student", highGradeStudents);

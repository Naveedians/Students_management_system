#! /user/bin/env node
import inquirer from "inquirer"
class student{
    id:string;
    name:string;
    coursesEnrolled:string[];
    feesAmount:number;
    constructor(id:string,name:string, coursesEnrolled:string[], feesAmount:number)
{
    this.id = id ,
    this.name = name,
    this.coursesEnrolled = coursesEnrolled,
    this.feesAmount = feesAmount
}
}
let baseId = 10000;
let studentId : string ="";
let continueEnrollment:boolean = true;

let students: student[] = [];

do{
    let action = await inquirer.prompt({
        type:"list",
        name:"ans",
        message:"Please select an option.\n",
        choices:["Enroll a student","Show student status"]

    })
    if(action.ans === "Enroll a student"){
        let studentName = await inquirer.prompt({
            type:"input",
            name:"ans",
            message:"Please enter your name:"
        })
        
        let trimmedStudentName =(studentName.ans).trim().toLowerCase()
        let studentNameCheck= students.map(obj=> obj.name)
        if(studentNameCheck.includes(trimmedStudentName) === false ){
        if(trimmedStudentName !== ""){
            baseId++
            studentId = "STID"+baseId
            console.log("\n\tYour account has been created")
            console.log(`Welcome, ${trimmedStudentName}!`);
            let course = await inquirer.prompt({
                type:"list",
                name:"ans",
                message:"Please select a course",
                choices:["C.S","Web 3.0","A.I","I.T","Crypto"]
            })
            let coursesFees = 0;
            switch(course.ans){
                case "C.S":coursesFees=5000;
                break;
                case "Web 3.0":coursesFees=4000;
                break;
                case "A.I":coursesFees=6000;
                break;
                case "I.T":coursesFees=7000
                break;
                case "Crypto":coursesFees=3000;
                break; 
            }
            let courseConfirm = await inquirer.prompt({
                type:"confirm",
                name:"ans",
                message:"Do you want to enroll in this course"
            })
            if(courseConfirm.ans=== true){
                let Student= new student(studentId, trimmedStudentName, [course.ans], coursesFees)
                students.push(Student)
                console.log("You have enrolled in this course");
            }
        }else{
            console.log("Invalid Name")
        }
        }else{
            console.log("This name is already exists")
        }
    }
    else if(action.ans ==="Show student status"){
        if(students.length !==0){
            let studentNameCheck =students.map(e => e.name)
            let selectStudent = await inquirer.prompt({
                type:"list",
                name:"ans",
                message:"Please select name",
                choices:studentNameCheck
            })
            let foundStudent= students.find(Student => Student.name === selectStudent.ans)
            console.log("Student Information");
            console.log(foundStudent);
            console.log("\n");
        }else {
            console.log("Record is empty")
        }
        let userConfirm = await inquirer.prompt({
            type:"confirm",
            name:"ans",
            message:"Do you want to continue?"
        })
        if(userConfirm.ans=== false){
            continueEnrollment=false
        }
    }
}while(continueEnrollment)
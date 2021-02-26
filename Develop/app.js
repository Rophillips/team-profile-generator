const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
//const { inherits } = require("util");
const team = [];
//const buildTeam = [];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const employeeQuestions = [
    
      {
          type: "input",
          message: "What is your name?",
          name: "name",
      },
      {
          type: "input",
          message: "What is your id?",
          name: "id",
      },
      {
          type: "input",
          message: "What is your email address?",
          name: "email",
      },
    
    ];


function getEngineer(){
    const engineerQuestions = [
        {
            type: "input",
            message: "What is your github name?",
            name: "github",
        }
    ]
    inquirer.prompt(employeeQuestions.concat(engineerQuestions)).then(response =>{
        let newEngineer = new Engineer(response.name, response.id, response.email, response.github)
        team.push(newEngineer);
        console.log(team);
        getTeam();
    })
}

function getIntern(){
    const internQuestions = [
        {
            type: "input",
            message: "What is the name of your school?",
            name: "school",
        }
    ]
    inquirer.prompt(employeeQuestions.concat(internQuestions)).then(response =>{
        let newIntern= new Intern(response.name, response.id, response.email, response.school)
        team.push(newIntern);
        console.log(team);
        getTeam();
    })
}




function getTeam(){
    inquirer.prompt([  {
        
        type: "list",
        message: "What type of employee would you like to add?",
        choices: ["Engineer", "Intern", "no employee"],
        name: "role"
    }])
    .then(response => {
        console.log(response)
        const employeeChoice = response.role
        if(employeeChoice === "Engineer"){
            getEngineer()
        }
        else  if(employeeChoice === "Intern"){
            getIntern()
        }

        else {
            console.log(team)
            //write file to render function 
            writeHTML();
        }
        
    });
   
    //rendering to output html
    const writeHTML = () => {
        fs.writeFile(outputPath, render(team), (err) =>
        err ? console.error(err) : console.log ("File Written!")
        );
    };
  
   
    
}
function init(){
    const managerQuestions = [
        {
            type: "input",
            message: "What is your office number?",
            name: "officeNumber",
        }
    ]
    inquirer.prompt(employeeQuestions.concat(managerQuestions)).then(response =>{
        let newManager = new Manager(response.name, response.id, response.email, response.officeNumber)
        team.push(newManager);
        console.log(team);
        getTeam();
    })
}
   



init();








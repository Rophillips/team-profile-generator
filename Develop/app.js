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
   

    const writeHTML = () => {
        fs.writeFile(outputPath, render(team), (err) =>
        err ? console.error(err) : console.log ("File Written!")
        );
    };
  
   
    // fs.writeFile(outputPath, render(team), err => {
    //     if(err){
    //         return err
    //     }
    //     console.log("File Written")
    // });
    
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






// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

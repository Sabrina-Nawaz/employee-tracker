const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
// Require console.table.package to print MySQL rows 
const cTable = require('console.table');
//Require inquirer to prompt user questions
const inquirer = require('inquirer');

//Set up PORT
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'password1',
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);

const menuQuestions = () => {
    return inquirer.prompt([
        {
            type: 'list',
            message: 'Please select an option',
            name: 'options',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role'
            ]
        }
    ])
    .then((data) => {
        switch(data.options) {
            case 'View all departments':
                viewDepartments();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'View all employees':
                viewEmployees();
                break;
            case 'Add a department':
                departmentAdd();
                break;
            case 'Add an employee':
                employeeAdd();
                break;
            case "Update an employee role":
                updateRole();
                break;
        }
    })
};

menuQuestions();

const viewDepartments = () => {
    db.query(`SELECT * FROM department`, function (err, results) {
        console.log(`\n`);
        console.table(results);
        menuQuestions();
    })
}

const viewRoles = () => {
    db.query(`SELECT * FROM role`, function (err, results){
        console.log(`\n`);
        console.table(results);
        menuQuestions();
    })
}

const viewEmployees = () => {
    db.query(`SELECT `, function (err, results){
        console.log(`\n`);
        console.table(results);
        menuQuestions();
    })
}

const departmentAdd = () => {
    
}
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
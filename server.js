// Import and require mysql2
const mysql = require('mysql2');
// Require console.table.package to print MySQL rows 
require('console.table');
//Require inquirer to prompt user questions
const inquirer = require('inquirer');

//Set up PORT


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
            switch (data.options) {
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
                case 'Add a role':
                    roleAdd();
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
    console.log('starting the departments query')
    db.query(`SELECT * FROM department;`, function (err, results) {
        console.log(`\n`);
        console.log(results)
        console.table(results);
        menuQuestions();
    })
}

const viewRoles = () => {
    db.query(`SELECT * FROM role`, function (err, results) {
        console.log(`\n`);
        console.table(results);
        menuQuestions();
    })
}

const viewEmployees = () => {
    db.query(`SELECT employee.*, role.title, role.salary, department.name FROM employee 
    JOIN role 
        ON employee.role_id = role.id 
    JOIN department 
        ON role.department_id = department.id;`, function (err, results) {
        console.log(`\n`);
        console.table(results);
        menuQuestions();
    })
}

const departmentAdd = () => {
    return inquirer.prompt([
        {
            type: 'input',
            message: "Create a new department?",
            name: 'name'
        }
    ])
        .then((data) => {
            db.query(`INSERT INTO department (name) VALUES (?)`, data.name, (err, results) => {
                console.log("\nAdded new department:");
                viewDepartments();
            })
        })
}

// const roleAdd = () => {
//     let deptArr = [];
//     db.query(`SELECT * FROM department`, function (err, results) {
//         for (let i = 0; i < results.length; i++) {
//             deptArr.push(results[i].name);
//         }
//     })
// }
// return inquirer.prompt([

// ])


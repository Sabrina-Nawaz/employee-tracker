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

const roleAdd = () => {
    // Create an array to hold new departments 
    let deptArr = [];
    db.query(`SELECT * FROM department`, function (err, results) {
        for (let i = 0; i < results.length; i++) {
            deptArr.push(results[i].name);
        }
        return inquirer.prompt([
            {
                type: 'input',
                message: "What is the role name?",
                name: 'role',
            },
            {
                type: 'input',
                message: "How much is the salary of the role?",
                name: 'salary',
            },
            {
                type: 'input',
                message: "Which department does this role belong to?",
                name: deptArr
            }

        ])
            .then((data => {
                //Retrieve the dept ID
                db.query(`SELECT id FROM department WHERE department.name = ?`, data.department, (err, results) => {
                    let department_id = results[0].id; // Bug with this function, can't read 
                    db.query(`INSERT INTO role(title, salary, department_id) VALUES (?,?,?)`, [data.title, data.salary, department_id], (err, results) => {
                        console.log("\nNew role added:");
                        viewRoles();
                    })
                })
            }))
    })
}

const employeeAdd = () => {
    const roleArr = [];
    const employeeArr = [];
    // Grabs all the roles in the role array
    db.query(`SELECT * FROM role`, function (err, results) {
        for (let i = 0; i < results.length; i++) {
            roleArr.push(results[i].role);
        }
        // Grabs all employees in the employee array
        db.query(`SELECT * from employee`, function (err, results) {
            for (let i = 0; i < results.length; i++) {
                let empName = `${results[i].first_name} ${results[i].last_name}`
                employeeArr.push(empName);
            }
            return inquirer.prompt([
                {
                    type: 'input',
                    message: "Enter employee's first name",
                    name: 'first_name',
                },
                {
                    type: 'input',
                    message: "Enter employee's last name",
                    name: 'last_name',
                },
                {
                    type: 'list',
                    message: "Is there a manager for this employee?",
                    choices: ["No", "Yes"],
                    name: "empManager"
                },
                {
                    type: 'list',
                    message: "What role does the employee fall under?",
                    name: 'empRole',
                    choices: roleArr
                }
            ]).then((data) => {
                let roleTitle = data.role;
                let first_name = data.first_name;
                let last_name = data.last_name;
                let role_id = '';
                let employeeManager = '';
                // Grabs the role id 
                db.query(`SELECT id FROM role WHERE role.title = ?`, data.role, (err, results) => {
                    role_id = results[0].id;
                });
                if (data.empManager === "Yes") {
                    return inquirer.prompt([
                        {
                            type: 'list',
                            message: "Please select the employees manager",
                            name: 'employeeManager',
                            choices: employeeArr
                        }
                    ]).then((data) => {
                        // Grabs role ID
                        db.query(`SELECT id FROM role WHERE role role.title = ?`, roleTitle, (err, results) => {
                            role_id = results[0].id;
                        })
                        db.query(`SELECT id FROM employee WHERE employee.first_name = ? AND employee.last_name = ?;`, data.employeeManager.split(" "), (err, results) => {
                            employeeManager = results[0].id;
                            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`, [first_name, last_name, role_id, employeeManager], (err, results) => {
                                console.log("\nNew employee added:");
                                viewEmployees();
                            })
                        })
                    })
                } else {
                    employeeManager = null;
                // grabs role ID
                db.query(`SELECT id FROM role WHERE role.title = ?`, roleTitle, (err, results) => {
                    role_id = results[0].id;
                    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`, [data.first_name, data.last_name, role_id, employeeManager], (err, results) => {
                        console.log("\nNew employee added:")
                        viewEmployees();
                    })
                } )
                }
            }) 
        })
    })
}

const updateRole = () => {
    const roleArr = [];
    const employeeArr = [];
    //Grabs all roles in the role array
    db.query(`SELECT * FROM role`, function (err, results) {
        for (let i = 0; i < results.length; i++) {
            roleArr.push(results[i].role);
        }
    // Grabs all employees from employee array
    db.query(`SELECT * FROM employee`, function (err, results) {
        for (let i = 0; i < results.length; i++) {
            let empName = `${results[i].first_name} ${results[i].last_name}`
            employeeArr.push(empName);
        }
        return inquirer.prompt([
            {
                type: 'list',
                message: "Choose an employee to update",
                name: "updateEmployee",
                choices: employeeArr
            },
            {
                type: 'list',
                message: "What new role is assigned to this employee?",
                name: 'newRole',
                choices: roleArr
            },
        ]).then((data) => {
            db.query(`SELECT id FROM role WHERE role.title = ?`, data.role, (err, results) => {
                role_id = results[0].id;
                db.query(`SELECT id FROM employee WHERE employee.first_name = ? AND employee.last_name = ?;`, data.updateEmployee.split(" ", (err, results) => {
                    db.query(`UPDATE employee SET role_id = ? WHERE id = ?;`, [role_id, results[0].id], (err, results) => {
                        console.log("\nEmployee role has been updated:");
                        viewEmployees();
                    })
                }))
            })
        })
    })
    })

}


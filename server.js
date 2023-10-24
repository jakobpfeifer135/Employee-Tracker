
const mysql = require ('mysql2');
const inquirer = require('inquirer');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'imacodernow@126422$',
    database: ''
},
    console.log('Connected')
);

const questions = [
    {
      type: 'list',
      name: 'employee_db',
      message: 'which department would you like to view',
      choices: ['Sales','Finance','Engineering','Logistics','Legal','Human Resources']
    },
]

inquirer.prompt(questions)
.then((answers) => {
    if (answers.employee_db === 'Sales') {
        const Sales = [{ 
            type: 'list',
            name: 'roles',
            message: 'select a role from within the selected department',
            choices: ['Sales Manager','']
        }]
    }
})
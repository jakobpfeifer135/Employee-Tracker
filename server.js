
const mysql = require('mysql2');
const inquirer = require('inquirer');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'imacodernow@126422$',
  database: 'employee_db', 
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

const departmentQuestion = {
  type: 'list',
  name: 'department',
  message: 'Which department would you like to view?',
  choices: ['Sales', 'Finance', 'Engineering', 'Logistics', 'Legal', 'Human Resources'],
};

inquirer
  .prompt(departmentQuestion)
  .then((answers) => {
    const department = answers.department;

    // Now, based on the department selection, we will present a list of roles
    // related to that department.
    const roleQuery = 'SELECT title FROM role WHERE department_id = (SELECT id FROM department WHERE name = ?)';

    db.query(roleQuery, [department], (err, results) => {
      if (err) {
        throw err;
      }

      const roleChoices = results.map((row) => row.title);

      if (roleChoices.length === 0) {
        console.log('No roles found for the selected department.');
        db.end();
      } else {
        inquirer
          .prompt([
            {
              type: 'list',
              name: 'role',
              message: 'Select a role from the selected department:',
              choices: roleChoices,
            },
          ])
          .then((roleAnswers) => {
            const selectedRole = roleAnswers.role;
            console.log('You selected role:', selectedRole);
            db.end();
          });
      }
    });
  });
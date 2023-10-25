
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
  displayOptions();
});

function displayOptions() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'options',
        message: 'What would you like to do?',
        choices: ['Add Department', 'Add Role', 'Add Employee', 'View Department', 'View Role', 'View Employee', 'Exit'],
      },
    ])
    .then((optionAnswers) => {
      const selectedOption = optionAnswers.options;
      if (selectedOption === 'Add Department') {
        promptAddDepartment();
      } else if (selectedOption === 'Add Role') {
        promptAddRole();
      } else if (selectedOption === 'Add Employee') {
        promptAddEmployee();
      } else if (selectedOption === 'View Department') {
        viewDepartments();
      } else if (selectedOption === 'View Role') {
        viewRoles();
      } else if (selectedOption === 'View Employee') {
        viewEmployees();
      } else if (selectedOption === 'Exit') {
        db.end();
        console.log('Disconnected from MySQL database');
      }
    });
}

function promptAddDepartment() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter department name:',
    },
  ]).then((answers) => {
    const departmentName = answers.name;
    // Check if the department with the same name already exists
    db.query('SELECT id FROM department WHERE name = ?', [departmentName], (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        // Department doesn't exist, so add it
        db.query('INSERT INTO department (name) VALUES (?)', [departmentName], (err) => {
          if (err) throw err;
          console.log(`Added department: ${departmentName}`);
        });
      } else {
        // Department already exists
        console.log(`Department '${departmentName}' already exists.`);
      }
      displayOptions();
    });
  });
}

function promptAddRole() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter role title:',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter role salary:',
    },
    {
      type: 'input',
      name: 'department_id',
      message: 'Enter department ID for the role:',
    },
  ]).then((answers) => {
    const { title, salary, department_id } = answers;
    db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
      [title, salary, department_id],
      (err, result) => {
        if (err) throw err;
        console.log(`Added role: ${title}`);
        displayOptions();
      });
  });
}

function promptAddEmployee() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'Enter employee first name:',
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'Enter employee last name:',
    },
    {
      type: 'input',
      name: 'role_id',
      message: 'Enter role ID for the employee:',
    },
  ]).then((answers) => {
    const { first_name, last_name, role_id } = answers;
    db.query('INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)',
      [first_name, last_name, role_id],
      (err, result) => {
        if (err) throw err;
        console.log(`Added employee: ${first_name} ${last_name}`);
        displayOptions();
      });
  });
}

function viewDepartments() {
  // Static seed data for departments
  const seedDepartments = [
    { id: 1, name: 'Sales' },
    { id: 2, name: 'Finance' },
    { id: 3, name: 'Engineering' },
    { id: 4, name: 'Logistics' },
    { id: 5, name: 'Legal' },
    { id: 6, name: 'Human Resources' },
  ];

  db.query('SELECT * FROM department', (err, userDepartments) => {
    if (err) throw err;

    console.log('List of Departments:');
    console.log('User-created Departments:');
    userDepartments
      .filter(userDept => !seedDepartments.some(seedDept => seedDept.id === userDept.id))
      .forEach((row) => {
        console.log(`ID: ${row.id}, Name: ${row.name}`);
      });

    console.log('Seed Data Departments:');
    seedDepartments.forEach((row) => {
      console.log(`ID: ${row.id}, Name: ${row.name}`);
    });

    displayOptions();
  });
}

function viewRoles() {
  db.query('SELECT * FROM role', (err, results) => {
    if (err) throw err;
    console.log('List of Roles:');
    results.forEach((row) => {
      console.log(`ID: ${row.id}, Title: ${row.title}, Salary: ${row.salary}`);
    });
    displayOptions();
  });
}

function viewEmployees() {
  db.query('SELECT * FROM employee', (err, results) => {
    if (err) throw err;
    console.log('List of Employees:');
    results.forEach((row) => {
      console.log(`ID: ${row.id}, Name: ${row.first_name} ${row.last_name}`);
    });
    displayOptions();
  });
}

const mysql = require('mysql2');
const inquirer = require('inquirer');

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'imacodernow@126422$',
  database: 'employee_db',
});

// Connect to the database
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
  displayOptions(); // Start the application by displaying options
});

// Function to display a list of available options to the user
function displayOptions() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'options',
        message: 'What would you like to do?',
        choices: [
          'Add Department',
          'Add Role',
          'Add Employee',
          'View Department',
          'View Role',
          'View Employee',
          'Update Employee Role', // New option to update employee role
          'Exit',
        ],
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
      } else if (selectedOption === 'Update Employee Role') { // Handle updating employee role
        promptUpdateEmployeeRole();
      } else if (selectedOption === 'Exit') {
        db.end();
        console.log('Disconnected from MySQL database');
      }
    });
}

// Function to prompt for updating an employee's role
function promptUpdateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'employee_id',
        message: 'Enter the ID of the employee you want to update:',
      },
      {
        type: 'input',
        name: 'new_role_id',
        message: 'Enter the new role ID for the employee:',
      },
    ])
    .then((answers) => {
      const { employee_id, new_role_id } = answers;

      // Update the employee's role in the database
      const updateQuery = 'UPDATE employee SET role_id = ? WHERE id = ?';
      db.query(updateQuery, [new_role_id, employee_id], (err, result) => {
        if (err) throw err;

        if (result.affectedRows === 1) {
          console.log('Employee role updated successfully.');
        } else {
          console.log('Employee not found or role update failed.');
        }

        displayOptions();
      });
    });
}
// prompt to handle adding a department to the database
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
//a prompt to add a designated role to the database with salaries and what department they go too
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
    {
      type: 'input',
      name: 'manager_id',
      message: 'Enter manager id',
    },
  ]).then((answers) => {
    const { first_name, last_name, role_id, manager_id } = answers;
    db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
      [first_name, last_name, role_id, manager_id],
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
//a query to show all seed based departments and user created departments
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
    console.table(userDepartments);
    displayOptions();
  });
}
// used to show each role what it pays and the department it belongs too
const viewRoles = () => {
  db.query('SELECT role.id, role.title,  role.salary, department.name  FROM role LEFT JOIN department ON role.department_id = department.id ', function(err,result,fields){
    console.table(result)
    displayOptions()
  })
}
// function viewRoles() {
//   const query = `
//     SELECT r.id AS role_id, r.title AS role_title, r.salary, d.name AS department_name
//     FROM role AS r
//     LEFT JOIN department AS d ON r.department_id = d.id
//   `;

//   db.query(query, (err, results) => {
//     if (err) throw err;
//     console.log('List of Roles with Associated Departments:');

//     const roleChoices = results.map((row) => ({
//       name: `Role: ${row.role_title}, Salary: ${row.salary}, Department: ${row.department_name}`,
//       value: row.role_id,
//     }));

//     inquirer
//       .prompt([
//         {
//           type: 'list',
//           name: 'selectedRole',
//           message: 'Select a role to see employees assigned to it:',
//           choices: roleChoices,
//         },
//       ])
//       .then((answers) => {
//         const selectedRoleId = answers.selectedRole;

//         // Query the database to get employees for the selected role
//         const employeesQuery = `
//           SELECT e.id, e.first_name, e.last_name
//           FROM employee AS e
//           WHERE e.role_id = ?`;

//         db.query(employeesQuery, [selectedRoleId], (err, employeeResults) => {
//           if (err) throw err;
//           console.log('Employees in the selected role:');
//           employeeResults.forEach((employee) => {
//             console.table(`ID: ${employee.id}, Name: ${employee.first_name} ${employee.last_name}`);
//           });


//           displayOptions();
//         });
//       });
//   });
// }
// use this to view all of the employees in the database will all of their info
function viewEmployees() {
  const query = `
    SELECT 
      e.id, 
      e.first_name, 
      e.last_name, 
      r.title AS role, 
      r.salary, 
      d.name AS department,
      CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM 
      employee AS e
      LEFT JOIN role AS r ON e.role_id = r.id
      LEFT JOIN department AS d ON r.department_id = d.id
      LEFT JOIN employee AS m ON e.manager_id = m.id`;

  db.query(query, (err, results) => {
    if (err) throw err;
    console.log('List of Employees:');
    results.forEach((row) => {
      console.log(`ID: ${row.id}, Name: ${row.first_name} ${row.last_name}, Role: ${row.role}, Salary: ${row.salary}, Department: ${row.department}, Manager: ${row.manager || 'None'}`);
    });
    console.table(results);
    displayOptions();
  });
}
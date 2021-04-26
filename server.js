// dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');
// const consTable = require('console.table');

// connection
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'New2Austin!M',
    database: 'employee_db'
});

// inquirer prompt for view, add, and update
const viewList = () => {
    inquirer
      .prompt({
        name: 'action',
        type: 'rawlist',
        message: 'What would you like to do?',
        choices: [
          'View departments',
          'View roles',
          'View employees',
          'Create Department',
          'Create Role',
          'Create Employee',
          'Update Employee Role',
          'Exit'
        ],
      })
      .then((answer) => {
        switch (answer.action) {
          case 'View departments':
            departmentSearch();
            break;
  
          case 'View roles':
            roleSearch();
            break;
  
          case 'View employees':
            employeeSearch();
            break;
        
          case 'Create Department':
            addDepartment();
            break;
          
          case 'Create Role':
            addRole();
            break;
          
          case 'Create Employee':
           addEmployee();
           break;

          case 'Update Employee Role':
            updateEmployeeRole();
            break;

          case 'Exit':
            exit();
            break;
  
          default:
            console.log(`Invalid action: ${answer.action}`);
            break;
        }
      });
  };

const exit =() => {
    connection.end();
}
  // View departments
const departmentSearch = () => {
        const query = 'SELECT * FROM department';
        connection.query(query, (err, res) => {
          if (err) throw err;
          res.forEach(({ id, departmentName }) => {
            console.log(
              `Department ID: ${id} || Department Name: ${departmentName}`
            );
          });
          viewList();
        });
 };
 // View roles
const roleSearch = () => {
    const query = 'SELECT * FROM role';
    connection.query(query, (err, res) => {
      if (err) throw err;
      res.forEach(({ id, jobTitle, salary, department_id}) => {
        console.log(
          `Role ID: ${id} || Job Title: ${jobTitle} || Salary: ${salary} || Department ID: ${department_id} ||`
        );
      });
      viewList();
    });
};
// View employees
const employeeSearch = () => {
    const query = 'SELECT * FROM employee';
    connection.query(query, (err, res) => {
      if (err) throw err;
      res.forEach(({ id, first_name, last_name, role_id, manager_id}) => {
        console.log(
          `Employee ID: ${id} || First Name: ${first_name} || Last Name: ${last_name} || Role ID: ${role_id} || Manager ID: ${manager_id}`
        );
      });
      viewList();
    });
};

// Add departments 
const addDepartment = () => {
    inquirer
    .prompt({
      name: 'department',
      type: 'input',
      message: 'What is the name of the new department?',
    })
    .then((answer) => {
        const query = 'INSERT INTO department SET ?';
        connection.query(query, { departmentName: answer.department}, (err, res) => {
            if (err) throw err;
            console.log(`Your department has been added.`);
          });
        viewList();
        });
      };

// Add roles 

const addRole = () => {
  inquirer
  .prompt([{
    name: 'role',
    type: 'input',
    message: 'What is the name of the new role?',
  },
  {
    name: 'salary',
    type: 'input',
    message: 'What is the role salary?',
  },
  {
    name: 'departmentId',
    type: 'input',
    message: 'What is the department ID?',
  }]
  )
  .then((answer) => {
      const query = 'INSERT INTO role SET ?';
      connection.query(query, 
        { 
          jobTitle: answer.role,
          salary: answer.salary,
          department_id: answer.departmentId
        }, 
        (err, res) => {
          if (err) throw err;
          console.log(`Your role has been added.`);
        });
      viewList();
      });
    };

    // Add employees
const addEmployee = () => {
  inquirer
  .prompt([{
    name: 'first',
    type: 'input',
    message: 'What is the first name of the new employee?',
  },
  {
    name: 'last',
    type: 'input',
    message: 'What is the last name of the new employee?',
  },
  {
    name: 'roleId',
    type: 'input',
    message: 'What is the new employee role id?',
  },
  {
    name: 'managerId',
    type: 'input',
    message: 'What is the new employee manager id?',
  }]
  )
  .then((answer) => {
    console.log(answer);
    const query = 'INSERT INTO employee SET ?';
      connection.query(query, 
        { 
          first_name: answer.first,
          last_name: answer.last,
          role_id: answer.roleId,
          manager_id: answer.managerId
        }, 
        (err, res) => {
          if (err) throw err;
          console.log(`Your employee has been added.`);
        });
      viewList();
      });
    };

// Update employee roles

const updateEmployeeRole = () => {
  inquirer
  .prompt ([
    {
      name:"employeeId",
      type: "input",
      question: "Enter the ID of the employee you are updating."
    },
    {
      name:"roleId",
      type: "input",
      question: "Enter their new role ID."
    }
  ])
  .then((answer) => {
    const query = 'UPDATE employee SET ? WHERE ?';
    connection.query(query, 
      [
      { 
        role_id: answer.roleId
      },
      {
        employee_id: answer.employeeId
      }
      ], 
      (err, res) => {
        if (err) throw err;
        console.log(`Your employee role is updated.`);
      });
    viewList();
    });
  };

// Connect to db
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    viewList ();
  });
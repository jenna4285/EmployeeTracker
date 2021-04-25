// dependencies
const mysqul = require('mysql');
const inquirer = require('inquirer');
const consTable = require('console.table');

// connection
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'New2Austin!M',
    database: 'xxxxx'
});

// View departments
// View roles
// View employees
const viewList = () => {
    inquirer
      .prompt({
        name: 'action',
        type: 'rawlist',
        message: 'What would you like to do?',
        choices: [
          'View departments',
          'View roles',
          'View employees'
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
  
          default:
            console.log(`Invalid action: ${answer.action}`);
            break;
        }
      });
  };

const departmentSearch = () => {
        const query = 'SELECT * FROM department';
        connection.query(query, (err, res) => {
          res.forEach(({ id, departmentName }) => {
            console.log(
              `Department ID: ${id} || Department Name: ${departmentName}`
            );
          });
          viewList();
        });
 };

const roleSearch = () => {
    const query = 'SELECT * FROM role';
    connection.query(query, (err, res) => {
      res.forEach(({ id, jobTitle, salary, department_id}) => {
        console.log(
          `Role ID: ${id} || Job Title: ${jobTitle} || Salary: ${salary} || Department ID: ${department_id} ||`
        );
      });
      viewList();
    });
};

const employeeSearch = () => {
    const query = 'SELECT * FROM employee';
    connection.query(query, (err, res) => {
      res.forEach(({ id, first_name, last_name, role_id, manager_id}) => {
        console.log(
          `Employee ID: ${id} || First Name: ${first_name} || Last Name: ${last_name} || Role ID: ${role_id} || Manager ID: ${manager_id}`
        );
      });
      viewList();
    });
};

// Add departments 
// Add roles 
// Add employees


// Update employee roles





// Connect to db
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    FIRSTFUNCITON TO CALL ();
  });
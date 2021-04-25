-- database
CREATE DATABASE employee_db;

-- tables:

USE DATABASE employee_db;

CREATE TABLE department (
id INT(10) AUTO_INCREMENT NOT NULL,
departmentName VARCHAR(30) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE role (
id INT(10) AUTO_INCREMENT,
jobTitle VARCHAR(30) NOT NULL,
salary DECIMAL(10,2) NOT NULL,
department_id INT(5) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE employee (
id INT(10) AUTO_INCREMENT NOT NULL,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30,2) NOT NULL,
role_id INT(10) NOT NULL,
manager_id INT(10),
PRIMARY KEY (manager_id)
);

FOREIGN KEY (department_id) 
    REFERENCES department (department_id)

FOREIGN KEY (role_id) 
    REFERENCES department (role_id)

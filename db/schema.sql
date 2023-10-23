DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE IF NOT EXISTS employee_db;
USE employee_db;


SELECT DATABASE();

CREATE TABLE department (
    id INT PRIMARY KEY,
    name VARCHAR(30)
);


CREATE TABLE role (
    id INT PRIMARY KEY,
    title VARCHAR(60),
    salary DECIMAL(10, 2),
    department_id INT
);

CREATE TABLE employee (
    id INT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    salary DECIMAL(10, 2)
);
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE IF NOT EXISTS employee_db;
USE employee_db;


SELECT DATABASE();

CREATE TABLE department (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);


CREATE TABLE role (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  salary DECIMAL(10, 2),
  department_id INT
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    salary DECIMAL(10, 2)
);

INSERT INTO department (id, name)
VALUES (1, "Sales"),
(2, "Finance"),
(3, "Engineering"),
(4, "Logistics"),
(5, "Legal"),
(6, "Human Resources");

(IF (SELECT COUNT(*) FROM department WHERE id = 1) = 1, DELETE FROM department WHERE id = 1),
(IF (SELECT COUNT(*) FROM department WHERE id = 2) = 1, DELETE FROM department WHERE id = 2),
(IF (SELECT COUNT(*) FROM department WHERE id = 3) = 1, DELETE FROM department WHERE id = 3),
(IF (SELECT COUNT(*) FROM department WHERE id = 4) = 1, DELETE FROM department WHERE id = 4),
(IF (SELECT COUNT(*) FROM department WHERE id = 5) = 1, DELETE FROM department WHERE id = 5),
(IF (SELECT COUNT(*) FROM department WHERE id = 6) = 1, DELETE FROM department WHERE id = 6);


ALTER TABLE role
ADD COLUMN manager_id INT NULL;


INSERT INTO role (id, title, salary, department_id, manager_id)
VALUES (1, "Sales Manager", 80000.00 , 1, NULL),
(2, "Sales Representative", 40000.00, 1, 1),
(3, "Sales Associate", 25000.00, 1, 1),
(4, "Account Executive", 116000.00, 1, 1),
(5, "Business Development Representative", 62000.00, 1, 1),
(6, "Sales Support Specialist", 51000.00, 1, 1),
(7, "Sales Trainer", 65000.00, 1, 1),
(8, "Regional Sales Manager", 140000.00, 1, NULL),

(9, "Chief Financial Officer (CFO)", 240000, 2, NULL),
(10, "Finance Manager", 82000.00, 2, NULL),
(11, "Financial Analyst", 55000.00, 2, 1),
(12, "Accountant", 76500.00, 2, 1),
(13, "Tax Specialist", 69000.00, 2, 1),
(14, "Treasury Analyst", 46000.00, 2, 1),
(15, "Financial Planner", 47000.00, 2, 1),
(16, "Credit Analyst", 34000.00, 2, 1),

(17, "Chief Technology Officer (CTO)", 145000.00, 3, NULL),
(18, "Engineering Manager", 125000.00, 3, NULL),
(19, "Software Engineer", 95000.00, 3, 1),
(20, "Project Engineer", 55000.00, 3, 1),
(21, "Electrical Engineer", 90000.00, 3, 1),
(22, "Mechanical Engineer", 120000.00, 3, 1),

(23, "Logistics Manager", 75000.00, 4, NULL),
(24, "Supply Chain Analyst", 55000.00, 4, 1),
(25, "Warehouse Manager", 65000.00, 4, NULL),
(26, "Transportation Manager", 65000.00, 4, NULL),
(27, "Distribution Center Supervisor", 70000.00, 4, 1),
(28, "Route Planner", 48000.00, 4, 1),
(29, "Freight Broker", 45000.00, 4, 1),
(30, "Packaging Specialist", 35000.00, 4, 1),


(31, "General Counsel", 215000.00, 5, 1),
(32, "In-House Counsel", 135000.00, 5, 1),
(33, "Corporate Counsel", 145000.00, 5, 1),
(34, "Compliance Officer", 75000.00, 5, 1),
(35, "Contracts Manager", 85000.00, 5, NULL),
(36, "Litigation Attorney", 77000.00, 5, 1),
(37, "Privacy Officer", 65000.00, 5, 1),
(38, "Tax Attorney", 55000.00, 5, 1),



(39, "Human Resources Manager", 70000.00, 6, NULL),
(40, "HR Generalist", 65000.00, 6, 1),
(41, "Employee Relations Specialist", 55000.00, 6, 1),
(42, "Recruitment Specialist", 40000.00, 6, 1),
(43, "Training and Development Specialist", 57000.00, 6, 1),
(44, "HR Coordinator", 67000.00, 6, 1),
(45, "Health and Safety Officer", 68000.00, 6, 1);




ALTER TABLE employee ADD COLUMN salary DECIMAL(10, 2);


ALTER TABLE employee ADD COLUMN department_id INT;


INSERT INTO employee (id, first_name, last_name, role_id)
VALUES
    (1, "John", "Doe", 1),  
      
    (6, "Grace", "Davis", 6), 
    (7, "Mike", "Lee", 7),  
    (8, "Sarah", "Wilson", 8),  
    (9, "Olivia", "Jones", 9), 
    (10, "Daniel", "Martinez", 10), 
    (11, "Linda", "Lopez", 11),  
    (12, "Ryan", "Garcia", 12),  
    (13, "Sophia", "Hernandez", 13),  
    (14, "Michael", "Young", 14),  
    (15, "Emma", "Moore", 15),  
    (16, "William", "Scott", 16),  
    (17, "Oliver", "Walker", 17),  
    (18, "Ava", "King", 18),  
    (19, "James", "Baker", 19),  
    (20, "Mia", "Green", 20),  
    (21, "Lucas", "Adams", 21),  
    (22, "Emily", "Wright", 22),  
    (23, "Benjamin", "Perez", 23),  
    (24, "Ella", "Hill", 24),  
    (25, "Logan", "Mitchell", 25),  
    (26, "Sofia", "Turner", 26),  
    (27, "Jackson", "Phillips", 27),  
    (28, "Avery", "Campbell", 28), 
    (29, "Joseph", "Parker", 29), 
    (30, "Scarlett", "Evans", 30),  
    (31, "Mateo", "Edwards", 31),  
    (32, "Chloe", "Collins", 32),  
    (33, "Victoria", "Stewart", 33),  
    (34, "Zachary", "Sanders", 34),  
    (35, "Henry", "Morris", 35),  
    (36, "Lily", "Nguyen", 36),  
    (37, "Thomas", "Rivera", 37),  
    (38, "Nora", "Long", 38),  
    (39, "Emily", "Parker", 39),  
    (40, "Lucas", "Anderson", 40),  
    (41, "Ava", "Mitchell", 41),  
    (42, "William", "Harris", 42),  
    (43, "Sophia", "Carter", 43),  
    (44, "Logan", "Turner", 44),  
    (45, "Jackson", "Wilson", 45); 


INSERT INTO employee (id,first_name, last_name, role_id, manager_id)
VALUES (2, "Jackson", "Wilson", 45, 1),
    (3, "Alice", "Smith", 2, 1),  
    (4, "Bob", "Johnson", 3, 1),  
    (5, "Eva", "Williams", 4, 1),  
    (46, "Chris", "Brown", 5, 1);
UPDATE employee AS e
INNER JOIN role AS r ON e.role_id = r.id
SET e.salary = r.salary;

SELECT * FROM employee;
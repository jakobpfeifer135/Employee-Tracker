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

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Sales Manager", 80000.00 , 1),
(2, "Sales Representative", 40000.00, 1),
(3, "Sales Associate", 25000.00, 1),
(4, "Account Executive", 116000.00, 1),
(5, "Business Development Representative", 62000.00, 1),
(6, "Sales Support Specialist", 51000.00, 1),
(7, "Sales Trainer", 65000.00, 1),
(8, "Regional Sales Manager", 140000.00, 1),

(9, "Chief Financial Officer (CFO)", 240000, 2),
(10, "Finance Manager", 82000.00, 2),
(11, "Financial Analyst", 55000.00, 2),
(12, "Accountant", 76500.00, 2),
(13, "Tax Specialist", 69000.00, 2),
(14, "Treasury Analyst", 46000.00, 2),
(15, "Financial Planner", 47000.00, 2),
(16, "Credit Analyst", 34000.00, 2),

(17, "Chief Technology Officer (CTO)", 145000.00, 3),
(18, "Engineering Manager", 125000.00, 3),
(19, "Software Engineer", 95000.00, 3),
(20, "Project Engineer", 55000.00, 3),
(21, "Electrical Engineer", 90000.00, 3),
(22, "Mechanical Engineer", 120000.00, 3),

(23, "Logistics Manager", 75000.00, 4),
(24, "Supply Chain Analyst", 55000.00, 4),
(25, "Warehouse Manager", 65000.00, 4),
(26, "Transportation Manager", 65000.00, 4),
(27, "Distribution Center Supervisor", 70000.00, 4),
(28, "Route Planner", 48000.00, 4),
(29, "Freight Broker", 45000.00, 4),
(30, "Packaging Specialist", 35000.00, 4),

(31, "General Counsel", 215000.00, 5),
(32, "In-House Counsel", 135000.00, 5),
(33, "Corporate Counsel", 145000.00, 5),
(34, "Compliance Officer", 75000.00, 5),
(35, "Contracts Manager", 85000.00, 5),
(36, "Litigation Attorney", 77000.00, 5),
(37, "Privacy Officer", 65000.00, 5),
(38, "Tax Attorney", 55000.00, 5),

(39, "Human Resources Manager", 70000.00, 6),
(40, "HR Generalist", 65000.00, 6),
(41, "Employee Relations Specialist", 55000.00, 6),
(42, "Recruitment Specialist", 40000.00, 6),
(43, "Training and Development Specialist", 57000.00, 6),
(44, "HR Coordinator", 67000.00, 6),
(45, "Health and Safety Officer", 68000.00, 6);



ALTER TABLE employee ADD COLUMN salary DECIMAL(10, 2);



INSERT INTO employee (id, first_name, last_name, role_id)
VALUES
    (1, "John", "Doe", 1),  -- Sales Manager
    (2, "Alice", "Smith", 2),  -- Sales Representative
    (3, "Bob", "Johnson", 3),  -- Sales Associate
    (4, "Eva", "Williams", 4),  -- Account Executive
    (5, "Chris", "Brown", 5),  -- Business Development Representative
    (6, "Grace", "Davis", 6),  -- Sales Support Specialist
    (7, "Mike", "Lee", 7),  -- Sales Trainer
    (8, "Sarah", "Wilson", 8),  -- Regional Sales Manager
    (9, "Olivia", "Jones", 9),  -- Chief Financial Officer (CFO)
    (10, "Daniel", "Martinez", 10),  -- Finance Manager
    (11, "Linda", "Lopez", 11),  -- Financial Analyst
    (12, "Ryan", "Garcia", 12),  -- Accountant
    (13, "Sophia", "Hernandez", 13),  -- Tax Specialist
    (14, "Michael", "Young", 14),  -- Treasury Analyst
    (15, "Emma", "Moore", 15),  -- Financial Planner
    (16, "William", "Scott", 16),  -- Credit Analyst
    (17, "Oliver", "Walker", 17),  -- Chief Technology Officer (CTO)
    (18, "Ava", "King", 18),  -- Engineering Manager
    (19, "James", "Baker", 19),  -- Software Engineer
    (20, "Mia", "Green", 20),  -- Project Engineer
    (21, "Lucas", "Adams", 21),  -- Electrical Engineer
    (22, "Emily", "Wright", 22),  -- Mechanical Engineer
    (23, "Benjamin", "Perez", 23),  -- Logistics Manager
    (24, "Ella", "Hill", 24),  -- Supply Chain Analyst
    (25, "Logan", "Mitchell", 25),  -- Warehouse Manager
    (26, "Sofia", "Turner", 26),  -- Transportation Manager
    (27, "Jackson", "Phillips", 27),  -- Distribution Center Supervisor
    (28, "Avery", "Campbell", 28),  -- Route Planner
    (29, "Joseph", "Parker", 29),  -- Freight Broker
    (30, "Scarlett", "Evans", 30),  -- Packaging Specialist
    (31, "Mateo", "Edwards", 31),  -- General Counsel
    (32, "Chloe", "Collins", 32),  -- In-House Counsel
    (33, "Victoria", "Stewart", 33),  -- Corporate Counsel
    (34, "Zachary", "Sanders", 34),  -- Compliance Officer
    (35, "Henry", "Morris", 35),  -- Contracts Manager
    (36, "Lily", "Nguyen", 36),  -- Litigation Attorney
    (37, "Thomas", "Rivera", 37),  -- Privacy Officer
    (38, "Nora", "Long", 38),  -- Tax Attorney
    (39, "Emily", "Parker", 39),  -- Human Resources Manager
    (40, "Lucas", "Anderson", 40),  -- HR Generalist
    (41, "Ava", "Mitchell", 41),  -- Employee Relations Specialist
    (42, "William", "Harris", 42),  -- Recruitment Specialist
    (43, "Sophia", "Carter", 43),  -- Training and Development Specialist
    (44, "Logan", "Turner", 44),  -- HR Coordinator
    (45, "Jackson", "Wilson", 45);  -- Health and Safety Officer


UPDATE employee AS e
INNER JOIN role AS r ON e.role_id = r.id
SET e.salary = r.salary;

SELECT * FROM employee;
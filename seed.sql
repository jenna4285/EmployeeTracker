-- Populate Departments

INSERT INTO department (department_name)
VALUES ("Preconstruction"), ("Operations");

INSERT INTO role (jobTitle, salary, department_id)
VALUES ("Superintendent", 200000, "1"), ("Project Manager", 100000.75, "1"), ("Senior Engineer", 80000, "1"), ("Project Manger", 90000, "2"), ("Senior Engineer", 75000.50, "2"), ("Office Engineer", 55000, "2");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Trevor", "Tropical", 1, 1), ("Bob", "Single", 2, 2), ("Fitz", "Homey", 3, 2), ("Aja", "Awesome", 4, 4),("Kat", "Pfunk", 5, 4), ("Samantha", "Gold", 6, 4)

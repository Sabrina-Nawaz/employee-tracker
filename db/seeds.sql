-- Inserting department names into department table
INSERT INTO department (name)
VALUES ("Sales"),
       ("Finance"),
       ("Legal"),
       ("IT"),
       ("Marketing");

-- Inserting role information for title, salary and department_id
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Manager",100000, 1),
        ("Sales Associate",70000, 1),
        ("Finance Manager",125000, 2),
        ("Lawyer", 140000, 3),
        ("Co-Op", 60000, 5),
        ("Developer", 130000, 4),
        ("DevOps",120000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Goku", "Son", 1, null),
    ("Vegeta", "Fourth", 3, null),
    ("Trunks", "Enchanto", 3, 3),
    ("Gohan", "Son", 1, 1),
    ("Videl", "Bideru", 4, 5),
    ("Bulma", "Enchanto", 4, null);

-- Creates a new view, or replaces an existing view if the OR REPLACE clause is given. If the view does not exist, CREATE OR REPLACE VIEW is the same as CREATE VIEW
CREATE VIEW employee_data AS
(SELECT
role.id AS role_id,
role.title,
role.salary,
department.name AS department_name
FROM role 
JOIN department 
on role.department_id = department.id);

CREATE VIEW employees_managers AS
(SELECT staff.id,
staff.first_name,
staff.last_name,
staff.role_id,
CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name
FROM employee AS manager RIGHT OUTER JOIN employee AS staff ON manager.id = staff.manager_id);
    
-- INSERT INTO reviews (movie_id, review)
-- VALUES (1, "Zazu is underrated. Give that hornbill a sequel!"),
--        (2, "I'm gonna make him an offer you can't refuse, watch this movie"),
--        (1, "Scar is the lion everyone loves to hate"),
--        (3, "Ten years of ballet and three years of tap to join a gang in this neighborhood"),
--        (5, "The tin man gave a metallic, hollow performance"),
--        (1, "Hakuna matata"),
--        (5, "Those flying monkeys are nightmare fuel!");
       

-- SELECT movies.movie_name AS movie, reviews.review
-- FROM reviews
-- LEFT JOIN movies
-- ON reviews.movie_id = movies.id
-- ORDER BY movies.movie_name;

-- THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

-- `SELECT employee.*, role.title, role.salary, department.name FROM employee 
--     JOIN role 
--         ON employee.role_id = role.id 
--     JOIN department 
--         ON role.department_id = department.id WHERE employee.manager_id IS NULL;`

SELECT employee.*, role.title, role.salary, department.name FROM employee 
JOIN role 
	ON employee.role_id = role.id 
JOIN department 
	ON role.department_id = department.id;
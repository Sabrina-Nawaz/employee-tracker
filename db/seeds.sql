-- Inserting department names into department table
INSERT INTO department (name)
VALUES ("Sales"),
       ("Finance"),
       ("Legal"),
       ("IT"),
       ("HR");

-- Inserting role information for title, salary and department_id
INSERT INTO role(title, salary, department_id)
VALUES ("Sales Manager",100000, 1),
        ("Sales Associate",70000, 1),
        ("Finance Manager",125000, 2),
        ("Lawyer", 140000, 3),
        ("Paralegal", 95000, 3),
        ("Developer", 130000, 4),
        ("DevOps",120000, 4),
        ("Office Manager", 90000, 5);
    
-- INSERT INTO reviews (movie_id, review)
-- VALUES (1, "Zazu is underrated. Give that hornbill a sequel!"),
--        (2, "I'm gonna make him an offer you can't refuse, watch this movie"),
--        (1, "Scar is the lion everyone loves to hate"),
--        (3, "Ten years of ballet and three years of tap to join a gang in this neighborhood"),
--        (5, "The tin man gave a metallic, hollow performance"),
--        (1, "Hakuna matata"),
--        (5, "Those flying monkeys are nightmare fuel!");
       

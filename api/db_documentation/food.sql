CREATE DATABASE food;

CREATE TABLE recipe (
    recipe_id serial PRIMARY KEY,
    name varchar(100) NOT NULL,
    description varchar(1000) NOT NULL,
    h_lvl smallint,
    s_by_s TEXT [],
    created_on TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE dietTypes(
    diet_id serial PRIMARY KEY,
    diet_name varchar(100)
);

CREATE TABLE recipe_dietTypes(
    recipe_id int NOT NULL,
    diet_id int NOT NULL,
    PRIMARY KEY (recipe_id, diet_id),
    FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id) ON DELETE CASCADE,
    FOREIGN KEY (diet_id) REFERENCES dietTypes(diet_id) ON DELETE CASCADE
);

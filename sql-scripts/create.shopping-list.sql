
DROP TYPE IF EXISTS grocery;
CREATE TYPE grocery AS ENUM (
    'Main',
    'Snack',
    'Lunch',
    'Breakfast'
    );

CREATE TABLE IF NOT EXISTS shopping_list (
id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
name_ TEXT NOT NULL,
price DECIMAL(38,2) NOT NULL,
category grocery NOT NULL,
checked BOOLEAN DEFAULT FALSE,
date_added TIMESTAMP DEFAULT now() NOT NULL
);

-- CREATE DATABASE orbital;

CREATE TABLE projects(
    project_id SERIAL PRIMARY KEY,
    teamName VARCHAR(255),
    teamMember1 VARCHAR(255),
    teamMember2 VARCHAR(255),
    teamAdvisor VARCHAR(255)
);

TRUNCATE TABLE someTable RESTART IDENTITY;

CREATE TABLE users(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    studentNumber VARCHAR(255) NOT NULL,
    userID VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    contactNumber VARCHAR(255) NOT NULL,
    programme VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO users (username, email, password) VALUES ('admin', 'orbital@u.nus.edu', 'P@sssw0rd');

CREATE TABLE staffs(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    staffName VARCHAR(255), 
    staffEmail VARCHAR(255), 
    staffGithub VARCHAR(255), 
    staffWebsite VARCHAR(255), 
    staffLinkedin VARCHAR(255),
    staffTitle VARCHAR(255)
);
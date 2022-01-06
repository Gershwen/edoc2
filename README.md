# Preface

# Introduction

# Glossary

# System architecture

# System requirements specification

# How to use the app.

# Installation

# Security of sensitive information

# Deployment

# Preface

version: 1.1
This document is meant for all users, doctor and administrator as well as developers.

# Introduction

This application is designed to assist doctors in managing their appoinments with patients.
Its meant to replace all paper based appointments that will assist in keeping a log of patient visits
and will assist the doctor in preparing for upcoming appointments.

# Glossary

MERN - Web technologies consisting of MongoDB, Express, React.js, Node.js
JWT - JSON Web Token
admin - administrator/secretory
app - the application
user - adminstrator or doctor

# System architecture

Web stack - MERN Stack.

## Motivation for selected stack:

Using MERN as it provides a complete end to end solution.
Next.js to provide server side rendering. So that the app stays operational
under heavy load and can run optimally even on devices with low bandwidth.

## Deployment

The app will be deployed using Vercel to easily build the Next.js app in the production environment.

## Styling

Will be using the layout model from Next.js to ensure consistent styles across pages.

# System requirements specification

1. What does this app do?

- It allows doctors to conveniently organise, plan and create patient appointments.
- The doctor will be able to view appointment in advance.
- The doctor will only have view functionality.
- The admin will have full functionality to be able to create, remove, update and assign appointments.

2. Who will use this product?

- Doctors and their admin staff.

3. How will they benefit?

- Instead of logging appointments to paper it will be web based.
- This means the doctor can access appointments from any device having internet.

## User stories

1. Admin registers for the 1st time:

- The admin enters their own username and password.
- The system encrypts this password and user using JWT.
- The system stores the encrypted data in a database.

2. Admin signs in:

- The admin enters existing username and password.
- The system verifies this username and password using JWT. If theres a match the admin will be redirected to the app. If there is no match then the system will prompt the user to try again.

3. Admin creates appoinment:

- The admin clicks on "Schedule appoinment" button.
- The system reveal a form with input fields to complete and submit.
- Once admin clicks submit, data that was added to input field gets stored inside the database.

4. Admin updates appoinment:

- Admin clicks on "edit" button.
- "edit" changes to "save".
- Admin enters updated information and clicks "save".
- System sends updated information to database where it updates the document with the same ID.

5. Admin removes appointment:

- Admin clicks "delete" button.
- System sends ID of appointment to database to be deleted.

6. Doctor reads appointments:

- Doctor signs in with username and password.
- Doctor is only able to view appointments.

## Functional requirements:

1. User needs to be able to sign up with username and password.
2. User needs to be able to log in with username and password.
3. Admin should be able to add appointments.
4. Admin should be able to delete tasks.
5. Admin should be able to edit tasks.
6. Doctor should be able to view upcoming appointments.

## Non - functional Requirements:

1. Usability

- User interface should be clean and easy to understand.
- Detailed documentation should be made available should the user require information about the web app.

2. Reliability

- Appropriate error handling should be in place to cater for unforseen events.

3. Performance

- Web app should be fast and load times reduced even on clients using low bandwidth.

4. Security

- Apply JWT to all passwords. Data to be stored using MongoDB.

# How to use the app.

This app is built to aid doctors rooms in managing appointments.

1. User needs to register by completing username, password and user type field.

2. After successful registration the user will be redirected to the login page.

3. User needs to type in same registration details to log in with the exception of the user type.

4. Admin user has access to all operational functionality.

- Creating appointments
- Reading appointments
- Updating appointments
- Deleting appointments

5. Doctor user has view only access and is able to see all appointments.

# Installation

This app is built with Next.js and Express. 

## To install follow these instructons:

1. Fork this repository to your local machine.
2. In your command line: 'npm install' or 'yarn install' to install node modules.
3. To run in development: 'npm run dev' 
4. To test: 'npm run test' 

Clear instructions that an end user will be able to follow to install, test
and run your app on their local machine. This should include
instructions for modifying any MongoDB URIs or API keys etc for your
app.

# Security of sensitive information

1. All passwords recieved are encrypted using bcrypt before being passed to the database. 
2. Database URI is safely stored in .env file. 
3. Username and user permission stored in JWT. 
4. JWT secret key safely stored in .env file. 

# Deployment

Application was deployed using Heroku.
Both back and frontend was deployed together. 
Since this app has a custom express server it could not be deployed by Vercel. 
Heroku offered the solution to be able to build the next.js app along with the express server.

# Link to deployed app

 https://edoc2.herokuapp.com/
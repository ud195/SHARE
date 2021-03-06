PROJECT SHARE 
--------------------------------------------------------------------

This is the main project for our web app project share - uploaded on 13/04/17 for the first time.

The project contains the following functionalities up to now:
--------------------------------------------------------------------
- Database, UI
- Searching
- Uploading items
- Managing items 
- Register 
- Login 
- Verification of accounts (sending an email with a verification link)
- Adding and removing users
- Comments 
- Contact page 
- Some stats on items 
- Routing and navigation


How to install and run 
----------------------------------------------------------------------

------------------------------------------------------
Installing dependencies
------------------------------------------------------
1. Install meteor from this link: https://www.meteor.com/install

2. Open command prompt and set the path to the project directory
through : cd "project location" 
example : cd c:/users/project/share-master 
press ENTER 

3. Installing dependencies ..
run the following commands to install the dependencies 
(copy and paste each line and press enter and wait for the packages to finish installing) 

meteor npm install --save babel-runtime react react-dom react-router react-router-dom bootstrap

meteor npm install --save semantic-ui-react

meteor npm install --save react-addons-pure-render-mixin 

meteor npm install --save react-router@3

meteor add session

meteor add accounts-base

meteor add accounts-password

------------------------------------------------------
Running the project
------------------------------------------------------
after all the dependencies have finished installing..
enter the command 

meteor run
press ENTER

Note: The web app will be empty at the start so you need to register and upload items to view them, this is because the database is local.

-------------------------------------------------------
Instructions for special cases 
-------------------------------------------------------
If you get any errors follow the prompts given by meteor it will indicate which dependency
is missing. 

If the first meteor npm install command doesn't work install each package individually.


-------------------------------------------------------------------------------------------
Packages
-------------------------------------------------------------------------------------------

npm specific packages
-------------------------
"babel-runtime": "^6.23.0",  

"bcrypt": "^1.0.2",   

"bootstrap": "^3.3.7", 

"classnames": "^2.2.5",

"react": "^15.5.4",

"react-addons-pure-render-mixin": "^15.5.2",

"react-dom": "^15.5.4", 

"react-router": "^3.0.5", 

"react-router-dom": "^4.1.1",

"semantic-ui-react": "^0.67.2"


Meteor specific packages 
--------------------------
session

accounts-base

accounts-password

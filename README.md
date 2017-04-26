
 .----------------.  .----------------.  .----------------.  .----------------.  .----------------.  .----------------.  .----------------.   
| .--------------. || .--------------. || .--------------. || .--------------. || .--------------. || .--------------. || .--------------. |  
| |   ______     | || |  _______     | || |     ____     | || |     _____    | || |  _________   | || |     ______   | || |  _________   | |  
| |  |_   __ \   | || | |_   __ \    | || |   .'    `.   | || |    |_   _|   | || | |_   ___  |  | || |   .' ___  |  | || | |  _   _  |  | |  
| |    | |__) |  | || |   | |__) |   | || |  /  .--.  \  | || |      | |     | || |   | |_  \_|  | || |  / .'   \_|  | || | |_/ | | \_|  | |  
| |    |  ___/   | || |   |  __ /    | || |  | |    | |  | || |   _  | |     | || |   |  _|  _   | || |  | |         | || |     | |      | |  
| |   _| |_      | || |  _| |  \ \_  | || |  \  `--'  /  | || |  | |_' |     | || |  _| |___/ |  | || |  \ `.___.'\  | || |    _| |_     | |  
| |  |_____|     | || | |____| |___| | || |   `.____.'   | || |  `.___.'     | || | |_________|  | || |   `._____.'  | || |   |_____|    | |  
| |              | || |              | || |              | || |              | || |              | || |              | || |              | |  
| '--------------' || '--------------' || '--------------' || '--------------' || '--------------' || '--------------' || '--------------' |  
 '----------------'  '----------------'  '----------------'  '----------------'  '----------------'  '----------------'  '----------------'   
                     .----------------.  .----------------.  .----------------.  .----------------.  .----------------.                       
                    | .--------------. || .--------------. || .--------------. || .--------------. || .--------------. |                      
                    | |    _______   | || |  ____  ____  | || |      __      | || |  _______     | || |  _________   | |                      
                    | |   /  ___  |  | || | |_   ||   _| | || |     /  \     | || | |_   __ \    | || | |_   ___  |  | |                      
                    | |  |  (__ \_|  | || |   | |__| |   | || |    / /\ \    | || |   | |__) |   | || |   | |_  \_|  | |                      
                    | |   '.___`-.   | || |   |  __  |   | || |   / ____ \   | || |   |  __ /    | || |   |  _|  _   | |                      
                    | |  |`\____) |  | || |  _| |  | |_  | || | _/ /    \ \_ | || |  _| |  \ \_  | || |  _| |___/ |  | |                      
                    | |  |_______.'  | || | |____||____| | || ||____|  |____|| || | |____| |___| | || | |_________|  | |                      
                    | |              | || |              | || |              | || |              | || |              | |                      
                    | '--------------' || '--------------' || '--------------' || '--------------' || '--------------' |                      
                     '----------------'  '----------------'  '----------------'  '----------------'  '----------------'                       



This is the main project for our web app project share - uploaded on 13/04/17 for the first time.

The project contains the following functionalities up to now:

1. Separated pages for UI design (.jsx) based on react.
2. Routing so now you can access multiple pages through links (react-router).
3. Added some sample forms and a navigation bar. 
4. Data from forms can be captured.
5. Added states for form data.

----------------------------------------------------------------------
How to install and run 
----------------------------------------------------------------------
 ____  ____   _____ ______   ____  _      _       ____  ______  ____  ___   ____  
|    ||    \ / ___/|      | /    || |    | |     /    ||      ||    |/   \ |    \ 
 |  | |  _  (   \_ |      ||  o  || |    | |    |  o  ||      | |  ||     ||  _  |
 |  | |  |  |\__  ||_|  |_||     || |___ | |___ |     ||_|  |_| |  ||  O  ||  |  |
 |  | |  |  |/  \ |  |  |  |  _  ||     ||     ||  _  |  |  |   |  ||     ||  |  |
 |  | |  |  |\    |  |  |  |  |  ||     ||     ||  |  |  |  |   |  ||     ||  |  |
|____||__|__| \___|  |__|  |__|__||_____||_____||__|__|  |__|  |____|\___/ |__|__|
                                                                                  

------------------------------------------------------
installing dependencies
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
running the project
------------------------------------------------------
after all the dependencies have finished installing..

meteor run
press ENTER

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


meteor specific packages 
--------------------------
session
 
accounts-base

accounts-password

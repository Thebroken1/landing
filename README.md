Tech Stack Used:
    ReactJS
    PHP
    CSS

How to Run locally:

    Install Node JS
    Install XAMPP for php, unless another software is used
    Navigate to package.json
    Install all depenancies using npm install
    Change line 15 in App.js to http://localhost:yourlocalhostid/GetLang.php?lang=${language} , remember to put php servers local host instead of yourlocalhostid
    Change line 58 in ContactUs.js to http://localhost:youlocalhostid/Process.php , remember to put php servers local host instead of yourlocalhostid
    Create folder 'lang' in php server folder, paste the 3 files from lang in public folder
    Paste Process.php and GetLang.php in php server folder but not in 'lang'
    Start using npm start
    Project Should start.

Assumption:
XAMPP is used

Notes:
As I have used XAMPP, all files were extracted in 'XAMPP/htdocs' folder with another new folder created called "uploads" which consists of user documents

If XAMPP is used, a folder called 'lang' must be created  inside 'htdocs' and all 3 files in the projects 'public/lang/' folder should be pasted there

Inside of the same 'htdocs' folder Process.php and GetLang.php must be pasted.
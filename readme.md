# Angular Demo Project


# How to : setup and use
1. Clone repository
2. Install NPM if not already done.
3. Install bower if not already done using the following command:
   'npm install -g bower'
4. Install all bower dependencies (required):
- Go to the application directory
- Run command:
```
    'bower install'
```
5. Run application by setting up a web server using Gulp or other means.
- If using Gulp install gulp using 'npm install -g gulp'
- Then run command:
```
    gulp run-local' # will open index.html in a browser 
                    # and also will do Unit Tests everytime any file is changed
```
5. To run Unit Tests using Karma & Jasmine separately run one of the following commands:
```
    # 1. to run Unit Test only once:
    gulp test
        
    # 2. to run Unit Test every time any JS file is changed
    gulp autotest 
```
   
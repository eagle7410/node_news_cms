# node_news_cms

## For pdf
Need install wkhtmltopdf tool.
[Detail documentation install](https://wkhtmltopdf.org).  

## Drive mysql, pgsql
I am use [sequelizejs ORM](http://docs.sequelizejs.com).  

## Drive mongo
I am use [mongoose ODM](http://mongoosejs.com/).  

## There is a possibility to start with [PM2](https://github.com/Unitech/pm2)
NPM commands

``` bash
npm run pm-star
npm run pm-stop
npm run pm-reload
```
  
## Employee application
Use [Single Page Application](https://en.wikipedia.org/wiki/Single-page_application) engine [VUE.js](https://vuejs.org/).  
Use [Material Design](https://en.wikipedia.org/wiki/Material_Design).  
Use [JWT](https://en.wikipedia.org/wiki/JWT).  
Use [HTML5](https://en.wikipedia.org/wiki/HTML5)  
Use [Sass](https://en.wikipedia.org/wiki/Sass)  
Use [Webpack](https://en.wikipedia.org/wiki/Webpack)  
Use [NodeJS](https://nodejs.org/en/)  
Request is encrypted using a public token.  
App have english and russian interface.

#### View login form  
___
![View login form ](https://raw.githubusercontent.com/eagle7410/node_news_cms/master/emp-start-page.jpg)

#### View after authorization  
___
![View after authorization](https://raw.githubusercontent.com/eagle7410/node_news_cms/master/emp-app-after-auth.jpg)

## Client application
Use little [Bootstap](https://getbootstrap.com/).  
Use [JWT](https://en.wikipedia.org/wiki/JWT).  
Use [HTML5](https://en.wikipedia.org/wiki/HTML5)  
Use [Sass](https://en.wikipedia.org/wiki/Sass)  
Use [Webpack](https://en.wikipedia.org/wiki/Webpack)  
Use [NodeJS](https://nodejs.org/en/)  
Request is encrypted using a public token.  
App have english and russian interface.
Not use jquery.

#### View page  
___
![View login form ](https://raw.githubusercontent.com/eagle7410/node_news_cms/master/client-app.jpg)

## Project folders and files.
[Description of project folders and files](https://github.com/eagle7410/node_news_cms/blob/master/struct-descrition.md)

## CONSOLE CLI
* Apply migrations.
 ```
  node ./cli/apply-migrate.js
 ```  
 | Param | Descriptions |
  | --- | --- |
  | -t | Apply test migration |
    
* Generate controller.
 ```
 node ./cli/gene-controller.js -n=app
 ```  
 | Param | Descriptions |
 | --- | --- |
 | -n | Required. Name controller | 
 | -a | Create controller for employee application. Without this parameter create for clients. |
 | -nv | Create controller without view folder. Use for client controller. |
  
* Generate migrations.
 ```
  node ./cli/gene-migrate.js -n=test
 ```  
 | Param | Descriptions |
   | --- | --- |
   | -n | Required. Name migration | 
   
* Generate model.
 ```
  node ./cli/gene-model.js -n=test
 ```
  | Param | Descriptions |
  | --- | --- |
  | -n | Required. Name models | 
   
* Generate vue crud.
 ```
  node ./console_util/gene-vcrud.js -n=employees
 ```
 | Param | Descriptions |
 | --- | --- |
 | -n | Required. Name vue base components, store, etc.. |
* Refresh structure database. (Use only with mysql, pgsql)
 ```
  node ./console_util/refresh-db-sctruct.js
 ```
 | Param | Descriptions |
  | --- | --- |
  | -t | Use test connection |

## License

MIT License

Copyright (c) 2018 [Igor Stcherbina](https://github.com/eagle7410)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

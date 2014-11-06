# gibm-timetable
Displays timetables for the classes at the GIBM (Switzerland).  
This was a school project for module #133 at the [GIB Muttenz](http://www.gibm.ch) (Switzerland).

[![Dependency Status](https://gemnasium.com/drasive/gibm-timetable.svg)](https://gemnasium.com/drasive/gibm-timetable)

## Features
<insert>
- Modern, easy to use and responsive user interface

## Screenshots <replace placeholders>
### 1. Image 1
![Image 1](/docs/_source/image1.png "Image 1")

### 2. Image 2
![Image 2](/docs/_source/image2.png "Image 2")

## Contributing
To contribute, fork the repository and send me a pull request with your changes (*develop* branch).  
Please make sure your code passes all tests ("grunt test") and take care to maintain the existing coding style ("grunt lint").

## Building the code
The following instructions are targeted at someone with a basic understanding of npm and Grunt.  
Feel free to contact me at [@drasive](https://twitter.com/drasive) or [dimitri.vranken@hotmail.ch](mailto:dimitri.vranken@hotmail.ch) if you are having any issues or questions.

### Required Tools
- [nodejs](http://nodejs.org/)
- [Grunt](http://gruntjs.com/)

### Installing dependencies
Just run "npm install" in your project directory to install all dependencies.

### Building
TL;DR: Run *development.cmd*, make changes and reload your browser at localhost:8080.

Runnig *development.cmd* will start the following three terminal windows:  
One for *manual command input*, one that initially builds and then *automatically rebuilds the website on file changes* and one to run a *local webserver running on port 8080*.  

To get a preview of how the *production* build will look, run "grunt prod" in the manual input terminal to start a prod build and automatically run a secondary *local webserver on port 8081*.
When you are done looking at the result, *cancel the command (Ctrl^C)*.

## License
The files in this repository are released under the GNU GPL v3.0.  
Please see the [license file](LICENSE.md) for further information.

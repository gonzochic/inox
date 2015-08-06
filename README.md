# INOX

*This project is under development, we have no stable release at the moment :)*

INOX is a social media plattform in a twitter like style to allow creative and innovative people to exchange their knowledge and get connected. The main ideas are:

  - The portal is structured in feeds where users can contribute and talk about innovative topics. [in work]
  - User can follow users, get updates and chat [pending]
  - Users are able to search for certain topics [pending]


### Version
0.0.1

### Technology

INOX tries to use the current cutting edge technologies in both server and client side aspects.

* RESTful Backend Server with NodeJS
* Document-oriented database using MongoDB
* Reactive Frontend using ReactJS
* ES2015 (ES6) and JSX syntax which is transipiled with BabelJS and SystemJS
* JSPM is used as package manager and to bundle the ES2015 (ES6) Modules

### Installation

You need a current version of NodeJS to be able to use this project.

As we're using JSPM as package manager you should install jspm globally:
```sh
$ npm install jspm -g
```

Then you can install the JSPM dependencies:
```sh
$ jspm install
```

Following with installing the Node Dependencies:
```sh
$ npm install
```

Now you can start the Backend Server which is also serving the client content:
```sh
$ node server.js
```

### Configuration

We are using the dotenv module to set the environment. Simply create a `.env` file containing following variables:
* SECRET : Secret for the password encryption (default: enteryoursecrethere)
* DB_URL : Url to the MongoDB instance (default: mongodb://localhost:27017/inox)
* PORT : Port of the backend server (default: 8080)
* EMBEDLY_KEY: API Key for your Embedly Account (default: '')
* IN_PRODMODE: Pages will consume bundled React component. You have to create bundle to be able to use this mode (default: '0');

### Generate test-data

When you are developing the project it might be useful the create some dummy test-data. We supplied you with a test-data generator:
```sh
$ node setupDB.js
```

### Example

[Here](http://46.101.232.18:8080/) is an example of the current state of the project. *Be aware that I'm not using https at the moment, so please use some kind of dummy password*

### License
Gnu GPL V2

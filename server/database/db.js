const env = require('./env.js');
const { Prohairesis } = require('prohairesis');
var DATABASE_URL = process.env.environnement === "production" ? env.CLEARDB_DATABASE_URL : env.DATABASE_URL
const database = new Prohairesis(DATABASE_URL);


// USER TABLE
database.query(`CREATE TABLE IF NOT EXISTS USERS (
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(120) NOT NULL,
    type_user VARCHAR(50),
    username VARCHAR(200),
    password VARCHAR (500) NOT NULL,
    user_description VARCHAR (5000),
    user_image VARCHAR(5000),
    coins_quantity INT DEFAULT 40,
    numberOfFollowers INT
)`).then((res) => {
    console.log('user table created');

}).catch((e) => {
    console.log(e);
})

// EVENT TABLE
database.query(`CREATE TABLE IF NOT EXISTS EVENT (
    event_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    price VARCHAR(20) NOT NULL,
    description VARCHAR(2000) NOT NULL,
    image VARCHAR(6000) NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    location VARCHAR(6000) NOT NULL,
    available_places INT,
    user_id INT ,
    category VARCHAR(500) NOT NULL,
    status BOOLEAN DEFAULT false,
    FOREIGN KEY (user_id) REFERENCES USERS (user_id)
)`).then((res) => {
    console.log('event table created');
}).catch((e) => {
    console.log(e);
})

//ATTACHMENT TABLE

database.query(`CREATE TABLE IF NOT EXISTS ATTACHEMENT (
    attachement_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(200),
    data VARCHAR(7000)
        
)`).then((res) => {
    console.log('ATTACHMENT table created');
}).catch((e) => {
    console.log(e);
})

// MESSAGE TABLE
database.query(`CREATE TABLE IF NOT EXISTS MESSAGE (
    message_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    event_id INT NOT NULL,
    time DATETIME NOT NULL,
    text VARCHAR(10000) NOT NULL,
    attachement_id INT,
    FOREIGN KEY (sender_id) REFERENCES USERS (user_id),
    FOREIGN KEY (receiver_id) REFERENCES USERS (user_id),
    FOREIGN KEY (attachement_id) REFERENCES ATTACHEMENT (attachement_id) ,
    FOREIGN KEY (event_id) REFERENCES EVENT (event_id)    
)`).then((res) => {
    console.log('MESSAGE table created');
}).catch((e) => {
    console.log(e);
})

//FAVORITE TABLE
database.query(`CREATE TABLE IF NOT EXISTS FAVORITE (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES USERS (user_id),
    FOREIGN KEY (event_id) REFERENCES EVENT (event_id) 
)`).then((res) => {
    console.log('favaorite table created');
}).catch((e) => {
    console.log(e);
})

//REGISTER TABLE
database.query(`CREATE TABLE IF NOT EXISTS REGISTER (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES USERS (user_id),
    FOREIGN KEY (event_id) REFERENCES EVENT (event_id) 
)`).then((res) => {
    console.log('REGISTER table created');
}).catch((e) => {
    console.log(e);
})

//FOLLOWERS TABLE

database.query(`CREATE TABLE IF NOT EXISTS FOLLOWERS (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    followee_id INT NOT NULL,
    followed_id INT NOT NULL,
    FOREIGN KEY (followee_id) REFERENCES USERS (user_id),
    FOREIGN KEY (followed_id) REFERENCES EVENT (event_id)
     
)`).then((res) => {
    console.log('followers table created');
}).catch((e) => {
    console.log(e);
})

//CATEGORIES TABLE
database.query(`CREATE TABLE IF NOT EXISTS CATEGORIES (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR (200),
    category_image VARCHAR(5000)
)`).then((res) => {
    console.log('categories table created');
}).catch((e) => {
    console.log(e);
})


module.exports.database = database;
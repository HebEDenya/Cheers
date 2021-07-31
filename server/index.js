const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const { database } = require('./database/db.js');
const routes = require('./routers/routerM');
const routesAz = require('./routers/routerAz');
const routesB = require('./routers/routerB')
const cookieParser = require("cookie-parser");
const session = require('express-session');
const routesAmin = require('./routers/routerAmin.js');
require('dotenv').config()
const port = process.env.PORT || 3001;
const app = express()
app.use(morgan('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors({
    origin: ["http://localhost:3001", "http://localhost:3000"],
    methods: ["GET", "POST","UPDATE", "DELETE", "PATCH", "PUT", "OPTIONS"],
    credentials: true,
  }));
  app.use(session({
    key: "userId",
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 6000 * 6000 * 240,
    }
  }));
  app.use(cookieParser(process.env.SECRET));

app.use('/api', routes);
app.use('/api',routesAz);
app.use('/api',routesB);
app.use('/api', routesAmin);



app.listen(port, () => { console.log(`I look at you port ${port}`); })
const express = require('express');
const bodyParse = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const {database} = require('./database/db.js');
const routes = require('./routers/routerM');
const routesAz = require('./routers/routerAz');
const port = process.env.PORT || 3001;
const app = express()
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());


app.use('/api', routes);
app.use('/api',routesAz);



app.listen(port, () => { console.log(`I look at you port ${port}`); })
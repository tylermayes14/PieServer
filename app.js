require('dotenv').config();

const express = require('express');
const app = express();

const pies = require('./controllers/piecontroller');
const user = require('./controllers/usercontroller');

const sequelize = require('./db');
sequelize.sync();
app.use(express.json());
app.use(require('./middleware/headers'));

app.use('/auth', user);
app.use(require('./middleware/validate-session'));
app.use('/pies', pies);

app.listen(process.env.PORT, () => console.log(`app is listening on ${process.env.PORT}`));

// app.use(express.static(__dirname + '/public'));
// console.log(__dirname);

// app.get('/', (req, res) => res.render('index'));
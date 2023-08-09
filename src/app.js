require('dotenv').config();
const express = require('express');
const { getUsersWithPostCount } = require('./controllers/user.controller');
const { seed } = require('./helpers/seeder.helper'); // import the seed function
const { connect } = require('./helpers/db.helper'); // Import the connect function

const app = express();

connect().then(async () => {
    console.log('Connected to MongoDB');
    // await seed(); 
    // console.log('Data seeding completed');
})
.catch(err => console.error('Failed to connect to MongoDB:', err));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', getUsersWithPostCount);

module.exports = app;

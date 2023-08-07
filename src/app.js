require('dotenv').config()
const express = require('express');
const { getUsersWithPostCount } = require('./controllers/user.controller');
const { seed } = require('./helpers/seeder.helper'); // import the seed function
const port=process.env.PORT || 3000
const app = express();
const { connect } = require('./helpers/db.helper'); // Import the connect function

connect().then(async () => {
    console.log('Connected to MongoDB')
    await seed(); // call the seed function after connecting to MongoDB
    console.log('Data seeding completed');
}) 
.catch(err => console.error('Failed to connect to MongoDB:', err));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', getUsersWithPostCount);

app.listen(port, (err) => {
    if (err) {
        console.error('Error occurred while starting the server:', err);
        return;
    }
    console.log(`Server successfully started and listening at http://localhost:${port}`);
});

module.exports = app;
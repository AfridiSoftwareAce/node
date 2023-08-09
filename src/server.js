const app = require('./app.js'); // Import the app
const port = process.env.PORT || 3000;

app.listen(port, (err) => {
    if (err) {
        console.error('Error occurred while starting the server:', err);
        return;
    }
    console.log(`Server successfully started and listening at http://localhost:${port}`);
});

const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3000'
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res)=> {
    res.json({ message: 'Fabricadabra test'});
});

const PORT = process.env.PORT || 8080;

require('./routes/routes.js')(app);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

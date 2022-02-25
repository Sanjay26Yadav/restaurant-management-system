const express = require('express');
const app = express();
require('dotenv').config();
require('./database/db')();
const cookieParser = require('cookie-parser');




const PORT = process.env.PORT||5000;

//middleware 
app.use(cookieParser());
app.use(express.urlencoded({ extended: false })); 
app.use(express.json());




// routes
app.use('/register', require('./routes/registerRoutes'));
app.use('/login', require('./routes/loginRoutes'));
app.use('/table', require('./routes/tableRoutes'));
app.use('/menu', require('./routes/menuRoutes'));



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

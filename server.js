const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const connectDB = require('./config/db');
const newsRouter = require('./routes/news_routes')

const app = express();
app.use(cors())
app.use(bodyParser())

//connect Database
connectDB();

// Init Middleware
app.use(
  express.json({
    extended: false,
  })
);

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/users', require('./routes/users'));
app.use('/auth', require('./routes/auth'));
app.use('/news', newsRouter)

// Define Port Number
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

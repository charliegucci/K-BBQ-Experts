const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const newsRouter = require('./routes/news_routes');
const { getNews } = require('./scrape');

const app = express();
app.use(cors());

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
app.use('/scrape', require('./routes/scrape'));
app.use('/news', require('./routes/news'));
app.use('/articles', require('./routes/article_routes'));

// Scrapper

// Define Port Number
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

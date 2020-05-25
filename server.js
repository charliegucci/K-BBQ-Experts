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
app.use('/news', newsRouter);

// Scrapper
app.get('/scrape', (req, res) => {
  console.log('scraping...');
  getNews()
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => console.log(err));
});

// Define Port Number
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const express = require('express');
const routes = require('./routes');
// import the sequelize connection


const app = express();
const PORT = process.env.PORT || 3036;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database and listen
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
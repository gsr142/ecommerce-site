const express = require('express');
const routes = require('./routes');
// import sequelize connection
const sequelize = require('sequelize');
const { Category, Product, Tag, ProductTag } = require('./models');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database
async function syncBeforeStart () {
  let category = Category.sync().then(()=> console.log('Category synced'));
  let product = Product.sync().then(() => console.log('Product synced'));
  let tag = Tag.sync().then(() => console.log('Tag synced'));
  let productTag = ProductTag.sync().then(() => console.log('ProductTag synced'));

  await new Promise((resolve, reject) => setTimeout(resolve, 1000));
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`)
  });

}
syncBeforeStart()   

// Turn on the server


require('dotenv').config();
const PORT = process.env.PORT || 3000; 
const express = require("express"); 

const { swaggerDocs: SwaggerDocs } = require("./docs/swagger");

const app = express(); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dailySaleRoutes = require("./routes/dailySaleRoutes");
const offerRoutes = require("./routes/offerRoutes");
const orderRoutes = require("./routes/orderRoutes");
const parameterRouter = require("./routes/parameterRoutes");

app.use("/api/dailySales", dailySaleRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/parameters", parameterRouter);

SwaggerDocs(app, PORT);

app.use((req, res, next) => {
    res.status(404).send('Not Found');
});

const db = require('./db.js');

db(async client => {

    console.log("DB connected.");

    app.listen(PORT, () => { 
        console.log(`Integration API is listening on port ${PORT}`); 
    });

}).catch(e => {

  console.error(e);

  app.route('/').get((req, res) => {
      res.status(503).send("Database doesn't available");
  });

});


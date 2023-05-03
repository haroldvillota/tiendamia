require('dotenv').config();
const PORT = process.env.PORT || 3000; 
const express = require("express"); 

const app = express(); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = require("./routes");

app.use("/api", router);

app.listen(PORT, () => { 
    console.log(`Provider API is listening on port ${PORT}`); 
});
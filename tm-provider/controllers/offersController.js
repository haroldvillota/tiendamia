const Offers = require("../database/offers.json");

const getAllSkus = (req, res) => {

  try{

    let skus = [];
    Offers.forEach(element =>{
      skus.push(element.sku);
    })

    res.json( skus );

  }catch(error){
    
    res.status(500).send({ error:error.message });
  }
};

const getAllOffers = (req, res) => {

  try{

    res.json( Offers );

  }catch(error){
    
    res.status(500).send({ error:error.message });
  }
};

const getOffersBySku = (req, res) => {

  try{

    const sku = req.params.sku;

    const offer = Offers.find(element => {
      return element.sku === sku
    })

    if(offer){
      res.json(offer);  
    }else{
      res.status(500).send({ error: 'Sku not founded' });
    }
    

  }catch(error){

    res.status(500).send({ error:error.message });

  }

};



module.exports = {
  getAllSkus,
  getAllOffers,
  getOffersBySku
};
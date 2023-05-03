const ProviderService = require('../services/providerService');
const OffersService = require('../services/offersService');
const ParameterService = require('../services/parameterService');
const LogService = require('../services/logService');

const getBestOfferBySku = (req, res) => {

  try{

    const sku = req.params.sku;

    if(!sku){
      res.status(500).send({ error: 'Sku is required' });  
    }
  
    ParameterService.getAllParameters({ filter:{}, limit: 100})
    .then(parameters =>{
      
      
      ProviderService.fetchOffersBySku(sku)
      .then(offers =>{

        const bestOffer = OffersService.getBestOffer(offers, parameters);

        if(bestOffer){
          res.json({ status: 'OK', data:bestOffer  });
        }else{
          res.status(400).send({ error: `No offers for the sku ${sku}` });
        }

      })
      .catch(error =>{
        LogService.error(error, req);
        res.status(400).send({ error:error.message });
      })

    })
    .catch(error=>{

      LogService.error(error, req);
      res.status(400).send({ status: "FAILED", message: error?.message || error });
    })


  }catch(error){

    LogService.error(error, req);
    res.status(500).send({ error:error.message });

  }

};

const getAllSkus = (req, res) => {

  try{

    
    ProviderService.getAllSkus()
      .then(data =>{ 

          res.json({ status: 'OK', data  });

      })
      .catch(error =>{
        LogService.error(error, req);
        res.status(400).send({ error:error.message });
      })


  }catch(error){
    
    LogService.error(error, req);
    res.status(500).send({ error:error.message });

  }

};



module.exports = {
  getBestOfferBySku,
  getAllSkus
};
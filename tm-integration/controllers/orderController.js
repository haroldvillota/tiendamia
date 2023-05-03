const ProviderService = require('../services/providerService');
const OrderService = require('../services/orderService');
const LogService = require('../services/logService');

/*
*   Must access by GET method
*   Execute a query in the collection Order
*   filter is Object
*   limit is an Number
*/

exports.getAllOrders = function(req, res) {

  try{
    
    let options = {
      filter : {},
      limit : ( req.query.limit * 1 ) || 100
    }

    OrderService.getAllOrders(options)
    .then(data =>{
      res.json({ status: 'OK', data });
    })
    .catch(error =>{
      LogService.error(error, req);
      res.status(400).send({ status: "FAILED", message: error?.message || error });
    })

  }catch(error){

    LogService.error(error, req);
    res.status(500).send({ status: "FAILED", message: error?.message || error });
  }

};

/*
*  Search one Order by id
*/
exports.getOneOrder = function(req, res) {

  try{

    const id = req.params.id;

    if(!id){
      throw { status: 400, message: 'The id is required' };
    }

    OrderService.getOneOrder( id )
    .then(data =>{
      res.json({ status: 'OK', data  });
    })
    .catch(error=>{
      LogService.error(error, req);
      res.status(400).send({ status: "FAILED", message: error?.message || error });
    })

  }catch(error){

    LogService.error(error, req);
      res.status(500).send({ status: "FAILED", message: error?.message || error });
  }

};


/*
* Create one Order
*/

exports.createOneOrder = function(req, res) { 

  const lang = req.lang;
  
  const { body } = req;

  try{


    let payload = {};
          
    if(body.sku){
      payload.sku = body.sku;
    }else{
      throw { status: 400, message: 'The Sku is required' };
    }
        
    if(body.qty){
      payload.qty = body.qty;
    }else{
      throw { status: 400, message: 'The quantity is required' };
    }
        
    if(body.offer_id){
      payload.offer_id = body.offer_id;
    }else{
      throw { status: 400, message: 'The Offer ID is required' };
    }

    if(body.customer){
      payload.customer = body.customer;
    }else{
      throw { status: 400, message: 'The Customer is required' };
    }
    
    ProviderService.fetchOffersBySku(payload.sku)
      .then(offers =>{

        return offers.find(offer =>{
          return offer.id === body.offer_id;
        })

      })
      .then(offer => {
        if(offer){
          payload.price = offer.price;
          payload.shipping_price = offer.shipping_price;
          payload.delivery_date = offer.delivery_date;
          payload.can_be_refunded = offer.can_be_refunded;
          payload.status = offer.status;
          payload.guarantee = offer.guarantee;
          payload.seller = offer.seller.name;
        }else{
          throw { status: 400, message: 'The Offer is not founded' };
        }

        OrderService.createOneOrder(payload)
          .then(data =>{
            res.json({ status: 'OK', data  });
          })
          .catch(error=>{

            LogService.error(error, req);
            res.status(400).send({ status: "FAILED", message: error?.message || error });

          })

      })
      .catch(error =>{
        res.status(400).send({ status: "FAILED", error:error.message });
      })

    
  

  }catch(error){

    LogService.error(error, req);
    res.status(500).send({ status: "FAILED", message: error?.message || error });

  } 

};



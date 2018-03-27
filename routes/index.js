const express = require('express');
const router = express.Router();
const {getBlock} = require('../test/utils')
router.get('/', function (req, res, next) {
  res.send('<a href="/1">块高1</a>')
});
router.get('/:id', function (req, res, next) {
  const app = async function(){
    try{
      const data = await getBlock((req.params.id-0))
      // res.send(await getBlock((req.params.id-0)))
      res.render('index',{title:req.params.id,data:data})
    }catch(e){
      res.send('getBlock Error')
    }
  }
  app();
  // res.send(typeof (req.params.id-0))
});

module.exports = router;

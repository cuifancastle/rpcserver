const express = require('express');
const router = express.Router();
const {getBlock} = require('../test/utils2')
router.get('/', function (req, res, next) {
  res.send('<a href="/1">块高1</a>')
});
router.get('/:id', function (req, res, next) {
  const app = async function(){
    try{
      console.log()
      res.send(await getBlock((req.params.id-0)))
    }catch(e){
      res.send('getBlock Error',e)
    }
  }
  app();
  // res.send(typeof (req.params.id-0))
});

module.exports = router;

const request = require('request');

let options = {
  url: 'http://192.168.172.131:8232',
  method:"POST",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': "Basic bWl4bWluaW5nOm1peE1pbmluZzE="
  },
  body: JSON.stringify({
    "jsonrpc": "1.0",
    "id": "curltest",
    "method": "getblock",
    "params": ["00000004cdbc377fb7ac6945a5deba439c61fa9fe1bc429dd8cfc0dc5de64c46"]
  })
};

// function callback(error, res, body) {
//   console.log(error,res,body)
//   console.log(res);
//   if (!error && res.statusCode == 200) {
//     var info = JSON.parse(body);
//     // console.log(info.stargazers_count + " Stars");
//     // console.log(info.forks_count + " Forks");
//     console.log(info);
//   }else{
//
//   }
// }
//
// request(options, callback);

module.exports={
  getblock:function(blockHeight){
    options.body=JSON.stringify({
      "jsonrpc": "1.0",
      "id": "curltest",
      "method": "getblock",
      "params": [blockHeight+'']
    })
    return new Promise((resolve,reject)=>{
      request(options, (error, res, body) =>{
        if (!error && res.statusCode == 200) {
          try{
            resolve(JSON.parse(body))
          }catch(e){
            reject('getblock parse Error')
          }
        }else{
          reject('getblock request Error')
        }
      });
    });
  },
  getrawtransaction:function(txid){
    options.body=JSON.stringify({
      "jsonrpc": "1.0",
      "id": "curltest",
      "method": "getrawtransaction",
      "params": [txid]
    })
    return new Promise((resolve,reject)=>{
      request(options, (error, res, body) =>{
        if (!error && res.statusCode == 200) {
          try{
            resolve(JSON.parse(body))
          }catch(e){
            reject('getrawtransaction parse Error')
          }
        }else{
          reject('getrawtransaction request Error')
        }
      });
    });
  },
  decoderawtransaction:function(txstring){
    options.body=JSON.stringify({
      "jsonrpc": "1.0",
      "id": "curltest",
      "method": "decoderawtransaction",
      "params": [txstring]
    })
    return new Promise((resolve,reject)=>{
      request(options, (error, res, body) =>{
        if (!error && res.statusCode == 200) {
          try{
            resolve(JSON.parse(body))
          }catch(e){
            reject('parse Error')
          }
        }else{
          reject('getrawtransaction request Error')
        }
      });
    });
  },
  getBlock:async function(blockHeight){
    try{
      let {result:block} = await this.getblock(blockHeight);
      try{
        let txs =[];
        for(let i =0;i<block.tx.length;i++){
          let item = await this.getrawtransaction(block.tx[i])
          let txitem = await this.decoderawtransaction(item.result);
          if(txitem.error){
            console.log('txitem error!')
            return new Error('txitem error!');
          }
          txs.push(txitem.result);
        }
        block.txs = txs;
        try{
          return JSON.stringify(block);
        }catch(e){
          console.log('writeFileSync Error', e)
        }
      }catch(e){
        console.log('getrawtransaction Error',e);
      };
  
    }catch(e){
      console.log('getblock Error',e)
      return false;
    }
  }
}

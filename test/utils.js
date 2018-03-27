const request = require('request');

let options = {
  url: 'http://192.168.172.204:8232',
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

const getblock=function(blockHeight){
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
          reject('parse Error')
        }
      }else{
        reject('request Error')
      }
    });
  });
}
const getrawtransaction=function(txid){
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
          reject('parse Error')
        }
      }else{
        reject('request Error')
      }
    });
  });
}
const decoderawtransaction=function(txstring){
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
        reject('request Error')
      }
    });
  });
}
/**
 *
 * @param vin Array
 * @returns {Promise<any>}  inputs {Array}
 */
const getVin= async function(vin = []){
  console.log('vin',vin);
  for(let i=0;i<vin.length;i++){
    if(vin[i].txid){
      let {result:item} = await getrawtransaction(vin[i].txid)
      let {result:txitem} = await decoderawtransaction(item);
      // vin[i].address = txitem.vout[vin[i].vout - 0]
      vin[i] = txitem.vout[vin[i].vout - 0]
    }
  }
  return vin;
}


module.exports= {
  getBlock : async function (blockHeight) {
    try {
      let {result: block} = await getblock(blockHeight);
      try {
        let txs = [];
        for (let i = 0; i < block.tx.length; i++) {
          let {result:item} = await getrawtransaction(block.tx[i])
          let {result:txitem} = await decoderawtransaction(item);
          txitem.inputs = await getVin(txitem.vin);
          delete txitem.vin;
          txs.push(txitem);
        }
        block.txs = txs;
        delete block.solution
        try {
          return JSON.stringify(block);
        } catch (e) {
          console.log('writeFileSync Error', e)
        }
      } catch (e) {
        console.log('getrawtransaction Error', e);
      };
    } catch (e) {
      console.log('getblock Error', e)
      return false;
    }
  },
  /**
   * 格式化block数据 http://39.107.14.18:8000/tokenview/search-hash/blob/master/%E5%8C%BA%E5%9D%97json%E5%85%A8%E6%96%87%E6%9C%AC%E6%A0%BC%E5%BC%8F.json
   * @param block
   * @returns {{}}
   */
  formatBlock(block){
    const {
      hash,
      confirmations,
      size,
      height,
      version,
      merkleroot,
      tx,
      time,
      nonce,
      solution,
      bits,
      difficulty,
      chainwork,
      anchor,
      valuePools,
      previousblockhash,
      nextblockhash,
      _txs
    } = block;
    let txs = [];
    for(let txsitem of txs){
      const {
        txid,
        vout,
        vjoinsplit,
        inputs
      } = txsitem;
      let _inputs = [];
      for(let inputsitem of inputs){
        let address,value;
        if(inputsitem.coinbase){
          address = "coinbase";
          value = inputsitem.sequence;
        }else{
          address= inputsitem.address.scriptPubKey.addresses[0]
          value= inputsitem.address.value
        }
        _inputs.push({
          address,
          value
        })
      }
      txs.push({
        txid,
        _inputs,
        vout,
        vjoinsplit,
      })
      
    }
    let result = {
      "data" : {
        "network" : "ZEC",
        "block_no" : height,
        "confirmations" : confirmations,
        "miner" : "Unknown",  //?
        "miner_url" : null,   //?
        "version" : version,
        "time" : time,
        "sent_value" : "27.03114305", //?
        "fee" : "0.00081500", //?
        "mining_difficulty" : difficulty,
        "nonce" : 2493408470, //?
        "bits" : "1a042eae",  //?
        "size" : size,
        "blockhash" : hash,
        "merkleroot" : merkleroot,
        "previous_blockhash" : previousblockhash,
        "next_blockhash" : nextblockhash,
        "txs" : [
          {
            "txid" : "1cf7c6c508738a311c1e78dbce20ed94fea95ddf5e9d611b41adfc5c49446349",
            "fee" : "0.00000000",
            "inputs" : [
              {
                "address" : "coinbase",
                "value" : "25.00081500"
              }
            ],
            "outputs" : [
              {
                "address" : "LLMRAtr3qBje2ySEa3CnZ55LA4TQMWnRY3",
                "value" : "25.00081500"
              },
              {
                "address" : "nulldata",
                "value" : "0.00000000"
              }
            ]
          },
          {
            "txid" : "54338b622a1db198e5829da1a4fa3c041055ba025066219ab82e80a7a2dbd683",
            "fee" : "0.00081500",
            "inputs" : [
              {
                "address" : "LRw9fCUQJX96hKUHySdumhgdgrzYinKbea",
                "value" : "0.05208755"
              },
              {
                "address" : "LeCLMVRFD6ij9hQef6CUsW3i5VJuLLR5Hy",
                "value" : "0.01221989"
              },
              {
                "address" : "LayHsqUQkNFGbAsk8nEEongwY7La6DxozX",
                "value" : "0.01072748"
              },
              {
                "address" : "LYmHqrqqxWX9uCdjBmJ5nCzbrLMzCrhAQM",
                "value" : "0.27931773"
              },
              {
                "address" : "LhCfSic374dzL7grHxbZUUNLNFX2Ti5ehS",
                "value" : "1.67597540"
              }
            ],
            "outputs" : [
              {
                "address" : "LZGreppTkGVMAiFZfsyJBvEfPi7CA8cdxY",
                "value" : "0.01764905",
              },
              {
                "address" : "LSDrRwTTdwKedHZjz7ViuYhUTw4Zj9t8HY",
                "value" : "2.01186400"
              }
            ]
          }
        ]
      }
    }
    return result;
  }
}

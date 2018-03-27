const fs = require('fs');
const {getblock,getrawtransaction,decoderawtransaction} = require('./utils')

const getBlock = async function (blockHeight){
  try{
    let {result:block} = await getblock(blockHeight);
    try{
      let txs =[];
      for(let i =0;i<block.tx.length;i++){
        let item = await getrawtransaction(block.tx[i])
        let txitem = await decoderawtransaction(item.result);
        if(txitem.error){
          console.log('txitem error!')
          return;
        }
        txs.push(txitem.result);
      }
      block.txs = txs;
      try{
        fs.writeFileSync(`./data/${blockHeight}.json`,JSON.stringify(block));
        console.log(`write File success :  ./data/${blockHeight}.json`)
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
};
let app = async function(){
  for(let i=292550;i<292554;i++){
    await getBlock(i);
    console.log('getBlock',i)
  }
}
app();


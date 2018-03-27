const fs = require('fs');
const {getBlock} = require('./utils2')
let app = async function(){
  for(let i=2000;i<2001;i++){
    const block = await getBlock(i);
    fs.writeFileSync(`./data/${i}.json`,block);
    console.log('getBlock',i)
  }
}
app();

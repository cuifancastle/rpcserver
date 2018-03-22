// const http = require('http');
// var querystring = require('querystring');
// function post_rpc() {
//   let options = {
//     host: '192.168.172.204',
//     port:'8232',
//     path: '/',
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': "Basic bWl4bWluaW5nOm1peE1pbmluZzE="
//     },
//   }
//   let contents = querystring.stringify({
//     "jsonrpc": "1.0",
//     "id": "curltest",
//     "method": "getblock",
//     "params": ["00000004cdbc377fb7ac6945a5deba439c61fa9fe1bc429dd8cfc0dc5de64c46"]
//   })
//   console.log('promise')
//   let req = http.request(options, function (res) {
//     res.setEncoding('utf8');
//     res.on('data', function (data) {
//       console.log('data',data)
//       // resolve(data);
//     });
//     res.on('error', function (e) {
//       console.log('err',e)
//       // reject(e);
//     });
//     res.on('end', function (e) {
//       console.log('end',e)
//       // reject(e);
//     });
//   });
//   console.log('send')
//   req.write(contents);
//   // return new Promise((resolve, reject) => {
//   //
//   //
//   // })
// }
// // post_rpc().then((data)=>{
// //
// // },(e)=>{
// //
// // })
// post_rpc()
// var request = require('request');
//
// request.post(
//   'http://192.168.172.204:8232',
//   {
//     "jsonrpc": "1.0",
//     "id": "curltest",
//     "method": "getblock",
//     "params": ["00000004cdbc377fb7ac6945a5deba439c61fa9fe1bc429dd8cfc0dc5de64c46"]
//   },
//   function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       console.log(body)
//     }
//     console.log(body);
//   }
// );
var fs = require('fs')
var request = require('request');

var options = {
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

function callback(error, res, body) {
  console.log(error,res,body)
  console.log(res);
  if (!error && res.statusCode == 200) {
    var info = JSON.parse(body);
    // console.log(info.stargazers_count + " Stars");
    // console.log(info.forks_count + " Forks");
    console.log(info);
  }else{
  
  }
}

request(options, callback);

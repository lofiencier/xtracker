var express = require('express');
var router = express.Router();

// const {createReadStream,createWriteStream,} =require('fs');
// const {resolve} =require('path');
// const {EOL} =require('os');
// const {createInterface}=require('readline')




//查重，已存
//根据namespace存不同的 namespace.json
//根据eventkey的不同存入event中
//如此说来可以写个edit
//addArea，已添加的area标记为recommend

router.post('/', function(req, res, next) {
  const {title,eventName='',namespace=''}=req.body;
  console.log(req.body);
  let config=require(`./configs/${namespace}.json`);
  console.log(config);
  res.send(config)
});

module.exports = router;

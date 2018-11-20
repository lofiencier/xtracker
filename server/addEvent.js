var express = require('express');
var router = express.Router();
var config =require('./config.json');
var fs=require('fs');
var path=require('path');

//查重，已存
//根据namespace存不同的 namespace.json
//根据eventkey的不同存入event中
//如此说来可以写个edit
//addArea，已添加的area标记为recommend
router.post('/', function(req, res, next) {
  const {namespace,eventName,...keys}=req.body;
  const eventNameExited=Object.keys(config[namespace]).length>0;
  config[namespace]={[eventName]:{},...eventNameExited?config[namespace]:{}};
  config[namespace][eventName]={...keys};
  fs.writeFile('server/config.json',JSON.stringify(config),err=>{
    const status=err?'504':'200';
    const msg=err?err:'success';
    res.send({status,msg});
    if(err)throw err
  })
});

module.exports = router;

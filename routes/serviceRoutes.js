var express = require('express');
var router = express.Router();
var ServiceRegistry = require('../registry/serviceRegistry');
var serviceRegistry = new ServiceRegistry();

router.put('/register/:entity/:port', (req, res, next) => {
    const entityName = req.params.entity;
    const servicePort = req.params.port;
    var ip = req.connection.remoteAddress.includes('::') ? `[${req.connection.remoteAddress}]` : req.connection.remoteAddress;
    serviceRegistry.add(entityName, ip, servicePort);
    res.status(200).json({result: `${entityName} service is running at ${ip}:${servicePort}`});
});

router.get('/details/:entity', (req, res, next) => {
  var serviceDetails = serviceRegistry.get(req.params.entity);
  if (serviceDetails != null) {
    res.status(200).json(serviceDetails);
  } else {
    res.status(404).json({});
  }
});

module.exports = router;

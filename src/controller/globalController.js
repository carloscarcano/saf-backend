const globalService = require('../service/globalService');

var checkStatus = function(req, res)
{
    var result = {};

    result = globalService.checkStatus();
    res.json(result);
}

module.exports = {
    checkStatus
}

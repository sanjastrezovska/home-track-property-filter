var express = require("express");
var t =       require('tcomb-validation');
var validate = require("express-jsonschema").validate;
var validate = require("express-validation");
var bodyParser = require("body-parser");
var app = express();
var domain =  require("./domain/domain.js");

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));

app.post('/properties/completed/htv', function (req, res) {
    var input = req.body;
    var result = t.validate(input, domain.PropertyListPayloadInput);

    if (result.isValid()) {

        /*
         Prepare Output:

         From the list of property data in the request payload,
         return a property record array for items having workflow completed (workflow: completed) for the type 'htv'.

         The returned JSON should have a response key with an array of properties.
         Each element should have the following fields from the request:

         Attribute 1: concataddress – a concatenation of the address object fields into a single string
         Attribute 2: type
         Attribute 3: workflow

         */

        var output = '';
        var fullAddress = '';
        var resList = {
            "response": []
        }

        function addResultItem(workflow, type , concataddress, arr) {
            arr.push({
                "concataddress": concataddress,
                "type": type,
                "workflow": workflow
            });
        }


        input.payload.forEach(function (item) {
            if (item.workflow === 'completed')
            {
                if (item.type === 'htv')
                {
                    fullAddress = ((item.address.unitNumber||'') + ' ' + (item.address.buildingNumber||'') + ' ' + (item.address.street||'') + ' ' + (item.address.suburb||'') + ' ' + (item.address.state||'') + ' '+ (item.address.postcode||'')).trim();
                    addResultItem(item.workflow, item.type, fullAddress, resList.response);
                    output = resList;
                }
            }
            });
        res.status(200).json(output);
    } else {
        res.status(400).json({ error: "Could not decode request: JSON parsing failed", details:result.errors  });
    }
});

var server = app.listen(8080, function () {
    console.log("Listening on port %s...", server.address().port);
});
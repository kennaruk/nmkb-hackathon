var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('test.ejs');
});

module.exports = router;

//Add for FB

const fs = require('fs');
const Guid = require('guid');
const bodyParser = require("body-parser");
const Mustache  = require('mustache');
const Request  = require('request');
const Querystring  = require('querystring');
const app = express();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
  
var csrf_guid = Guid.raw();
const account_kit_api_version = 'v1.1';
const app_id = '195321147707298';
const app_secret = 'cf8f4fb038c0bb8703f19eb7c86ffdf2';
const me_endpoint_base_url = 'https://graph.accountkit.com/v1.1/me';
const token_exchange_base_url = 'https://graph.accountkit.com/v1.1/access_token'; 


function loadLogin() {
  return fs.readFileSync('dist/login.html').toString();
}

router.get('/dist/login.html', function(request, response){
  var view = {
    appId: app_id,
    csrf: csrf_guid,
    version: account_kit_api_version,
  };

  var html = Mustache.to_html(loadLogin(), view);
  response.send(html);
});


function loadLoginSuccess() {
  return fs.readFileSync('dist/login_success.html').toString();
}

router.post('/login_success', function(request, response){

  // CSRF check
  if (request.body.csrf === csrf_guid) {
    var app_access_token = ['AA', app_id, app_secret].join('|');
    var params = {
      grant_type: 'authorization_code',
      code: request.body.code,
      access_token: app_access_token
    };
  
    // exchange tokens
    var token_exchange_url = token_exchange_base_url + '?' + Querystring.stringify(params);
    Request.get({url: token_exchange_url, json: true}, function(err, resp, respBody) {
      var view = {
        user_access_token: respBody.access_token,
        expires_at: respBody.expires_at,
        user_id: respBody.id,	
      };

      // get account details at /me endpoint
      var me_endpoint_url = me_endpoint_base_url + '?access_token=' + respBody.access_token;
      Request.get({url: me_endpoint_url, json:true }, function(err, resp, respBody) {
        // send login_success.html
        if (respBody.phone) {
          view.phone_num = respBody.phone.number;
        } else if (respBody.email) {
          view.email_addr = respBody.email.address;
        }
        var html = Mustache.to_html(loadLoginSuccess(), view);
        response.send(html);
      });
    });
  } 
  else {
    // login failed
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end("Something went wrong. :( ");
  }
});

//End add for FB

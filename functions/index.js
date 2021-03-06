var express = require('express');
var app = express();
var cors = require('cors');
const functions = require("firebase-functions");
const admin = require('./admin.js')

// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());

app.get('/open', (req,res) => res.send('Open Route!'));

// verify token at the root route
app.get('/auth', function(req,res){
    // read token from header
    const idToken = req.headers.authorization
    console.log('header:', idToken);

    // verify token
    admin.auth().verifyIdToken(idToken)
        .then(function(decodedToken) {
            console.log('decodedToken:',decodedToken);
            res.send('Authentication Sucess!');
        }).catch(function(error) {
            console.log('error:', error);
            res.send('Authentication Fail!');
        });
})

// app.listen(3000, () => {
//     console.log('Running on port: 3000');
// })

exports.widgets = functions.https.onRequest(app);

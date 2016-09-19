var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var connectionString = process.env.DATABASE_URL || 'postgres:localhost:5432/goodies';
var port = process.env.PORT || 8027;

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// static public folder
app.use(express.static('public'));

// spin up server
app.listen(port, function () {
  console.log('spinning on', port);
});

/////////////////////////////// BASE URL //////////////////////////////////
app.get('/', urlencodedParser, function (req, res) {
  console.log('base URL hit');
  console.log(path.resolve('index.html'));
  res.sendFile(path.resolve('index.html'));
}); // end base url

// treats route url
app.route('/treats')

  .get(function (req, res) {
    console.log('in get treats route');
    pg.connect(connectionString, function (err, client, done) {
        if (err) res.status(500).send('Connection error');

        var resultsArray = [];

        var query = client.query('SELECT * FROM treats');
        query.on('row', function (row) {
          resultsArray.push(row);
        });

        query.on('end', function () {
          done();
          return res.send(resultsArray);
        });
      }); // end pg connect
  }) // end get route

  .post(function (req, res) {
    console.log('in post treats route', req.body);

    var data = req.body;

    pg.connect(connectionString, function (err, client, done) {

      // check for connection errors
      if (err) res.status(500).send('Connection error');

      // query database to add/post/insert a tast in the list table
      var query = client.query('INSERT INTO treats (name, description, pic) VALUES ($1, $2, $3)', [data.name, data.description, data.pic]);

      // push each row of DB TABLE list into resultsArray
      query.on('row', function (row) {
        resultsArray.push(row);
        console.log(resultsArray);
      });

      query.on('end', function () {
        done();
        return res.send('post success!');
      }); // end of on end function
    }); // end pg connect
  }); // end post route

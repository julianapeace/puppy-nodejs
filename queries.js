var promise = require('bluebird');
var jwt = require('jsonwebtoken');
var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var DATABASE_URL = "postgres://127.0.0.1:5432/puppies";
var db = pgp(DATABASE_URL);


function token(req, res, next) {
  var username = req.params.username
  var token = jwt.sign({ data: 'some_payload', googleAccount: googleAccount }, process.env.ENCRYPTION_KEY, {
    expiresIn: 86400 //expires in 24 hours
  });
  res.status(200).json(token);
  // res.status(200).send({ auth: true, token: token });
}


function parseToken(req, res, next) {
  var token = req.headers['authorization'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, process.env.ENCRYPTION_KEY, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    res.status(200).send(decoded);
  });
}

function getMyRides(req, res, next) {
  var token = req.headers['authorization'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, process.env.ENCRYPTION_KEY, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    var googleAccount = decoded.googleAccount
    db.any('SELECT * FROM volunteer WHERE GoogleAccount = "${googleAccount}" LIMIT 1')
    .then(data =>{
      console.log(JSON.stringify(data, null, 2));
      var id = data.id //volunteer ID
      db.any('SELECT VolunteerId FROM volunteer_drive JOIN volunteer ON VolunteerID = Id')
        .then(data =>{
          console.log(JSON.stringify(data, null, 2));
          res.send(data)
        })
        .catch(function (err) {
          return next(err);
        )
    })
    .catch(function (err) {
      return next(err);
    });

    /*
    host="casnapptest.dmwilson.info",
    user="developers",
    passwd="developers",
    db="casn-app",
    */
  });
}

function toDateTime(value) {
  var value = value.toString()
  var month = value.slice(0,2)
  var day = value.slice(2,4)
  var year = value.slice(4,8)
  var datetime = []
  Array.prototype.push.apply(datetime,[year, month, day])
  return(datetime.join('-'))
}

function getAllAppointmentsRange(req, res, next) {
  var token = req.headers['authorization'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, process.env.ENCRYPTION_KEY, function(err, decoded) {
    var startDate = toDateTime(req.params.startDate); //07082018
    var endDate = toDateTime(req.params.endDate);
    //TODO: Convert Dates to epochtime.
    //NOTE: Mysql Datetime is 'YYYY-MM-DD HH:MM:SS' in central time
      db.any('SELECT * FROM appointment WHERE (AppointmentDate BETWEEN ${startDate} AND ${endDate})')
      .then(data =>{
        console.log(JSON.stringify(data, null, 2));
        res.send(data)
      })
      .catch(function (err) {
        return next(err);
      });
  }
}


function getAllPuppies(req, res, next) {
  db.any('select * from pups')
    // .then(function (data) {
    //   res.status(200)
    //     .json({
    //       status: 'success',
    //       data: data,
    //       message: 'Retrieved ALL puppies'
    //     });
    // })
    .then(data =>{
      console.log(JSON.stringify(data, null, 2));
      res.send(data)
    })
    .catch(function (err) {
      return next(err);
    });
}


function getSinglePuppy(req, res, next) {
  var pupID = parseInt(req.params.id);
  db.one('select * from pups where id = $1', pupID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE puppy'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


function createPuppy(req, res, next) {
  /* TEST WITH CURL
  $ curl --data "name=Whisky&breed=annoying&age=3&sex=f" \
  http://127.0.0.1:3000/api/puppies
  */
  req.body.age = parseInt(req.body.age);
  db.none('insert into pups(name, breed, age, sex)' +
      'values(${name}, ${breed}, ${age}, ${sex})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one puppy'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


function updatePuppy(req, res, next) {
  /*
  curl -X PUT --data "name=Hunter&breed=annoying&age=33&sex=m" \
  http://127.0.0.1:3000/api/puppies/1
  */
  db.none('update pups set name=$1, breed=$2, age=$3, sex=$4 where id=$5',
    [req.body.name, req.body.breed, parseInt(req.body.age),
      req.body.sex, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated puppy'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


function removePuppy(req, res, next) {
  /*
  curl -X DELETE http://127.0.0.1:3000/api/puppies/1
  */
  var pupID = parseInt(req.params.id);
  db.result('delete from pups where id = $1', pupID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} puppy`
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  getAllPuppies: getAllPuppies,
  getSinglePuppy: getSinglePuppy,
  createPuppy: createPuppy,
  updatePuppy: updatePuppy,
  removePuppy: removePuppy,
  token: token,
  parseToken: parseToken,
  getMyRides: getMyRides,
  getAllAppointmentsRange: getAllAppointmentsRange
};

/*
============
  RESOURCES
=============
http://mherman.org/blog/2016/03/13/designing-a-restful-api-with-node-and-postgres/
*/

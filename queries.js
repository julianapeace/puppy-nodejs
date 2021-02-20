var promise = require('bluebird');
var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var DATABASE_URL = "postgres://127.0.0.1:5432/puppy_node";
var db = pgp(DATABASE_URL);

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
};

/*
============
  RESOURCES
=============
http://mherman.org/blog/2016/03/13/designing-a-restful-api-with-node-and-postgres/
*/

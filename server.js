var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var owners = [
    {
        id: 1,
        name: "Adam",
        pets: [
            {
                id: 1,
                name: "Vera",
                type: "Dog"
            },
            {
                id: 2,
                name: "Felix",
                type: "Cat"
            }
        ]
    },
    {
        id: 2,
        name: "Kamilah",
        pets: [
            {
                id: 1,
                name: "Doug",
                type: "Dog"
            }
        ]
    }
];


// GET /api/owners
app.get('/api/owners', function(req, res, next){
    res.json(owners);
})
// GET /api/owners/:id
app.get('/api/owners/:id', function(req, res, next){
    res.json(owners.find(function(owner){
        return owner.id == req.params.id
    }))
})

// POST /api/owners
var nextOwnerId = 3; 
app.post('/api/owners', function(req, res, next){
    var newOwner = req.body; // POST body requires a key "name
    if (!req.body || !req.body.name) {
        res.status(400).send('Provide an owner name in the POST body');
    }
    newOwner.id = nextOwnerId;
    nextOwnerId++;
    owners.push(newOwner);
    res.json(newOwner);
})
// PUT /api/owners/:id
app.put('/api/owners/:id', function(req, res, next) {
    var newOwnerData = req.body;
    var newOwnerDataKeys = Object.keys(newOwnerData);
    var ownerToUpdate = owners.find(function(owner){
        return owner.id == req.params.id;
    })

    newOwnerDataKeys.forEach(function(key){
        ownerToUpdate[key] = newOwnerData[key];
    })

    res.json(ownerToUpdate);

})

// DELETE /api/owners/:id
app.delete('/api/owners/:id', function(req, res, next) {
    var indexToRemove = owners.findIndex(function(owner){
        return owner.id == req.params.id;
    })

    owners.splice(indexToRemove, 1);

    res.json(owners);
})

// GET /api/owners/:id/pets

// GET /api/owners/:id/pets/:petId

// POST /api/owners/:id/pets

// PUT /api/owners/:id/pets/:petId

// DELETE /api/owners/:id/pets/:petId


app.listen(3000, function(){
    console.log('Pets API is now listening on port 3000...');
})
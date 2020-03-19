const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');

let app = express();

app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: true }));

const dburl = 'mongodb+srv://dev:dev@cluster0-ioncs.mongodb.net/ecommerce?retryWrites=true&w=majority';

mongoose.connect(
    dburl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err) => {
        if (err) {
            console.log('Cannot connec to db');
        }
        return;
    }
);

const Students = mongoose.model(
    'students',
    {
        ime: String,
        prezime: String,
        prosek: Number
    },
    'students'
);

app.get('/', (req, res) => {
    Students.find({}, (err, data) => {
        if (err) {
            console.log(err);
        }
        res.render('index', { 'students': data });
    });
});

app.post('/newstudent', (req, res) => {
    let u = new Students({
        ime: req.body.ime,
        prezime: req.body.prezime,
        prosek: req.body.prosek
    });
    u.save((err) => {
        if (err) {
            return console.log(err);
        }
    });
    res.redirect('/');
});

app.get('/updatestudent', (req, res) => {
    Students.updateOne(
        { _id: '5e739db9d2c5d52b2c24fb57' },
        {
            ime: "Janko",
            prezime: "Jankovski",
            prosek: 3
        },
        (err) => {
            if (err) {
                return console.log(err);
            }
            console.log('Student updated');
        }
    );
    res.redirect('/');
});

app.get('/deletestudent/:id', (req, res) => {
    Students.deleteOne(
        { _id: '5e739db9d2c5d52b2c24fb57' }, (err) => {
        if(err) {
            console.log(err);
        }
            res.redirect('/');
        console.log('Student deleted');
    });
});

app.listen(8080, (err) => {
    if (err) {
        console.log('Error starting server');
    }
    console.log("Server started on port 8080...")
});
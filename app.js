const express = require('express');
const app = express();
const path = require('path');
const request = require('request');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/results', (req, res)=> {

    let query = req.query.search;

    request('https://api.themoviedb.org/3/search/movie?api_key=2faf3631a6fa14914342240452cbdeda&query='+query, (error, response, body) => {
        if(error) {
            console.log(error);
        }

        let data = JSON.parse(body);
        res.render('movies', {data:data, searchQuery:query});

    });

});

app.get('/search', (req,res)=> {

    res.render('search');
});

app.get('/', (req,res)=> {
    request('https://api.themoviedb.org/3/movie/popular?api_key=2faf3631a6fa14914342240452cbdeda', (error, response, body) => {
        if(error) {
            console.log(error);
        }

        let data = JSON.parse(body);
        res.render('index', {data:data});
        console.log(data);

    });
    // res.render('index');
});

app.listen(3000, ()=> {
    console.log('Server started at port 3000');
})
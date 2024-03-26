const fs = require('fs');
const express = require('express');
const app = express();

app.use((req, res, next) => {
    if (req.url === '/') {
        updateViews('main');
        next();
    } else if (req.url === '/about') {
        updateViews('about');
        next();
    } else {
        next();
    }
});

app.get('/', (req, res) => {
    const views = readViews();
    res.send(`
    <h1>Main page</h1>
    <p>Views: ${views.main}</p>
    <a href="/about">Link for /about page</a>`);
});

app.get('/about', (req, res) => {
    const views = readViews();
    res.send(`
    <h1>About page</h1>
    <p>Views: ${views.about}</p>
    <a href="/">Link for main page</a>`);
});

const port = 3014;

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});


function readViews() {
    try {
        const data = JSON.parse(fs.readFileSync('./countLoads.json'));
        return data;
    } catch (error) {
        console.error(error);
    };
};

function updateViews(key) {
    try {
        const views = readViews();
        views[key] += 1;
        fs.writeFileSync('./countLoads.json', JSON.stringify(views));
    } catch (error) {
        console.error(error);
    };
};
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const { checkParams, checkBody } = require('./validation/validator');
const { idScheme, userScheme } = require('./validation/scheme');

const userDBpath = path.join(__dirname, 'users.json');

app.use(express.json());

app.get('/users', (req, res) => {
    const users = JSON.parse(fs.readFileSync(userDBpath));
    res.send({ users });
});

app.get('/users/:id', checkParams(idScheme), (req, res) => {
    const users = JSON.parse(fs.readFileSync(userDBpath));
    const user = users.find((user) => {
        return user.id === Number(req.params.id);
    });

    if (user) {
        res.send({ user });
    } else {
        res.status(404);
        res.send({ user: null });
    }
});

app.post('/users', checkBody(userScheme), (req, res) => {
    const users = JSON.parse(fs.readFileSync(userDBpath));
    const maxId = users.reduce((max, user) => Math.max(max, user.id), 0);
    const newId = maxId + 1;
    users.push({ id: newId, ...req.body });
    fs.writeFileSync(userDBpath, JSON.stringify(users));
    res.send({ id: newId });
});

app.put('/users/:id', checkParams(idScheme), checkBody(userScheme), (req, res) => {
    const users = JSON.parse(fs.readFileSync(userDBpath));
    const user = users.find((user) => {
        return user.id === Number(req.params.id);
    });
    if (user) {
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.age = req.body.age;
        user.city = req.body.city;
        fs.writeFileSync(userDBpath, JSON.stringify(users));
        res.send({ user });
    } else {
        res.status(404);
        res.send({ user: null });
    }
});

app.delete('/users/:id', checkParams(idScheme), (req, res) => {
    const users = JSON.parse(fs.readFileSync(userDBpath));
    const user = users.find((user) => {
        return user.id === Number(req.params.id);
    });
    if (user) {
        const userIndex = users.indexOf(user);
        users.splice(userIndex, 1);
        fs.writeFileSync(userDBpath, JSON.stringify(users));
        res.send({ user });
    } else {
        res.status(404);
        res.send({ user: null });
    }
});

const port = 3014;

app.listen(port, () => {
    console.log(`Server started on ${port} port`);
});
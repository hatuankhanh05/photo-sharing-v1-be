const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 8000;

app.use(cors());

const { models } = require('./modelData/models.js');

app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/user/list', (req, res) => {
    res.json(models.userListModel());
});

app.get('/user/:id', (req, res) => {
    const user = models.userModel(req.params.id);
    user ? res.json(user) : res.status(404).send("Not found");
});

app.get('/photosOfUser/:id', (req, res) => {
    const photos = models.photoOfUserModel(req.params.id);
    photos ? res.json(photos) : res.status(404).send("Not found");
});

app.listen(port, () => {
    console.log(`Backend chạy tại http://localhost:${port}`);
});
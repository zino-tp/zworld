// server.js
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

mongoose.connect('mongodb://localhost:27017/zworld', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const TweetSchema = new mongoose.Schema({
    title: String,
    body: String,
    media: Array,
    createdAt: { type: Date, default: Date.now },
});

const Tweet = mongoose.model('Tweet', TweetSchema);

app.use(express.json());
app.use(express.static('public'));

app.post('/api/tweet', async (req, res) => {
    const tweet = new Tweet(req.body);
    await tweet.save();
    io.emit('tweet', tweet);
    res.status(201).send(tweet);
});

app.get('/api/tweets', async (req, res) => {
    const tweets = await Tweet.find();
    res.send(tweets);
});

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// api/tweet.js
const mongoose = require('mongoose');
const { json } = require('micro');

mongoose.connect(process.env.MONGODB_URI, {
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

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const tweet = req.body;
        try {
            const newTweet = new Tweet(tweet);
            await newTweet.save();
            res.status(201).json(newTweet);
        } catch (error) {
            res.status(500).json({ error: 'Error posting tweet' });
        }
    } else if (req.method === 'GET') {
        try {
            const tweets = await Tweet.find();
            res.status(200).json(tweets);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching tweets' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};

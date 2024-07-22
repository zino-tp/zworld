// Importiere Datenbankverbindung, z.B. mit MongoDB
import { getDb } from '../../utils/db';

export default async function handler(req, res) {
    const db = await getDb();
    if (req.method === 'GET') {
        const tweets = await db.collection('tweets').find({}).toArray();
        res.status(200).json(tweets);
    } else if (req.method === 'POST') {
        const tweet = req.body;
        await db.collection('tweets').insertOne(tweet);
        res.status(201).json(tweet);
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}

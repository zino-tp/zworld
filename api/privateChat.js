import { getDb } from '../../utils/db';

export default async function handler(req, res) {
    const db = await getDb();
    if (req.method === 'GET') {
        // Alle privaten Nachrichten abrufen (nach Benutzer filtern)
        const { username } = req.query;
        const messages = await db.collection('privateChatMessages').find({ username }).toArray();
        res.status(200).json(messages);
    } else if (req.method === 'POST') {
        // Neue private Nachricht speichern
        const message = req.body;
        await db.collection('privateChatMessages').insertOne(message);
        res.status(201).json(message);
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}

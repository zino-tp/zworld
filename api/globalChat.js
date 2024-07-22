import { getDb } from '../../utils/db';

export default async function handler(req, res) {
    const db = await getDb();
    if (req.method === 'GET') {
        // Alle Nachrichten abrufen
        const messages = await db.collection('globalChatMessages').find({}).toArray();
        res.status(200).json(messages);
    } else if (req.method === 'POST') {
        // Neue Nachricht speichern
        const message = req.body;
        await db.collection('globalChatMessages').insertOne(message);
        res.status(201).json(message);
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}

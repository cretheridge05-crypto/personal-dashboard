const express = require('express');
const path = require('path');
const app = express();

const greeting = process.env.GREETING || 'Hello from your deployed app!';

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/message', (req, res) => {
    res.json({ message: greeting });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send({some: 'json'});
});

app.post('/tags/garage', (req, res) => {
    res.send('Garage Tag Received.');
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})
const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

let hasDogEaten = false

app.use(cors());

app.get('/', (req, res) => {
    res.send({'Peluffo\'s Smart Home': 'Welcome to the Smart Home API!'});
});

// when this endpoint is called, update backend state 
app.post('/api/dog-eat', (req, res) => {
    hasDogEaten = true;
})

app.get('/status/dog-eat', (req, res) => {
    if (hasDogEaten) {
        res.send({'dog-eat': 'true'});
        hasDogEaten = false
    }
    else {
        res.send({'dog-eat': 'false'})
    }
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})
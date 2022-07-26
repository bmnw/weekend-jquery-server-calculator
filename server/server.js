const express = require('express');

const app = express();

const port = process.env.PORT || 5000;

app.use(express.static('server/public'));

const equationHistory = [
    {
        inputOne: 12,
        mathOperator: '+',
        inputTwo: 12
    }
];

app.get('/equations', (req, res) => {
    res.send(equationHistory);
});

// app.post('/equation', (req, res) => {

// });

app.listen(port, () => {
    console.log('listening on port', port);
});
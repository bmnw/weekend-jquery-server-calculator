const express = require('express');

const app = express();

const port = process.env.PORT || 5000;

app.use(express.static('server/public'));

app.use(express.urlencoded());

const equations = [
    {
        inputOne: 12,
        mathOperator: '+',
        inputTwo: 12
    }
];

app.get('/equations', (req, res) => {
    res.send(equations);
});

app.post('/equations', (req, res) => {
    const equationToAdd = req.body;
    console.log(req.body);
    equationToAdd.result = equationToAdd.inputOne + equationToAdd.mathOperator + equationToAdd.inputTwo;
    console.log(typeof equationToAdd.result);
    equations.push(equationToAdd);
    res.sendStatus(200);
    // res.send(equation);
});

app.listen(port, () => {
    console.log('listening on port', port);
});
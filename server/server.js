const express = require('express');

const app = express();

const port = process.env.PORT || 5000;

app.use(express.static('server/public'));

app.use(express.urlencoded());

const equations = [];

app.get('/equations', (req, res) => {
    res.send(equations);
});

app.post('/equations', (req, res) => {
    const equationToAdd = req.body;
    console.log(req.body);
    console.log(calcResult(req.body));
    // equationToAdd.result = calcResult(req.body);
    // console.log('result:', equationToAdd.result);
    // console.log(typeof equationToAdd.mathOperator);
    // equations.push(equationToAdd);
    res.sendStatus(200);
    // res.send(equation);
});

function calcResult(dataObjectInput) {
    console.log('in calcResult');
    let result;
    return new Function('return ' + dataObjectInput.equation)();
}

// used for base mode
// function calcResult(objectInput) {
//     console.log('in calcResult');
//     let result;
//     if(objectInput.mathOperator === '+'){
//         result = Number(objectInput.inputOne) + Number(objectInput.inputTwo);
//     } else if(objectInput.mathOperator === '-'){
//         result = Number(objectInput.inputOne) - Number(objectInput.inputTwo);
//     } else if(objectInput.mathOperator === '*'){
//         result = Number(objectInput.inputOne) * Number(objectInput.inputTwo);
//     } else if(objectInput.mathOperator === '/'){
//         result = Number(objectInput.inputOne) / Number(objectInput.inputTwo);
//     }
//     return result;
// }

app.listen(port, () => {
    console.log('listening on port', port);
});
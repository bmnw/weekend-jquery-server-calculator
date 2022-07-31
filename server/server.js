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
    evaluateEquationString(req.body);
    equationToAdd.result = evaluateEquationString(req.body);
    console.log('equationToAdd.result:', equationToAdd.result);
    equations.push(equationToAdd);
    console.log(equations);
    res.sendStatus(200);
});

let numberOne = '';
let numberTwo = '';
let operator = '';

function evaluateEquationString(dataObjectInput) {
    console.log('in evaluateEquationString');
    numberOne = '';
    numberTwo = '';
    operator = '';
    let endIndex;
    let finalResult;
    for(let i=0; i<dataObjectInput.equation.length; i +=1){
        if(dataObjectInput.equation[i] !== '+' && dataObjectInput.equation[i] !== '-' && dataObjectInput.equation[i] !== '*' && dataObjectInput.equation[i] !== '/'){
            console.log(dataObjectInput.equation[i]);
            numberOne += dataObjectInput.equation[i];
        } else {
            console.log(dataObjectInput.equation[i]);
            operator = dataObjectInput.equation[i];
            endIndex = i;
            console.log('endIndex:', endIndex);
            break;
        }
    }
    for(let i=(endIndex + 1); i<dataObjectInput.equation.length; i +=1){
        console.log('in second for loop');
        console.log(dataObjectInput.equation[i]);
        numberTwo += dataObjectInput.equation[i];
    }
    console.log('numberOne:', numberOne);
    console.log('numberTwo:', numberTwo);
    console.log('operator:', operator);
    console.log('full equation:', numberOne, operator, numberTwo);
    finalResult = calcResult(numberOne, operator, numberTwo);
    console.log('finalResult in evaluateEquationString:', finalResult);
    return finalResult;
    // return new Function('return ' + dataObjectInput.equation)();
} // end calcResult

function calcResult(firstNum, mathOperator, secondNum) {
    console.log('in calcResult');
    let result;
    if(mathOperator === '+'){
        result = Number(firstNum) + Number(secondNum);
    } else if(mathOperator === '-'){
        result = Number(firstNum) - Number(secondNum);
    } else if(mathOperator === '*'){
        result = Number(firstNum) * Number(secondNum);
    } else if(mathOperator === '/'){
        result = Number(firstNum) / Number(secondNum);
    }
    console.log('result:', result);
    return result;
} // end calcResult

app.listen(port, () => {
    console.log('listening on port', port);
});
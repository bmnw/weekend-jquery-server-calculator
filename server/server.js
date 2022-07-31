const express = require('express');

const app = express();

const port = process.env.PORT || 5000;

app.use(express.static('server/public'));

app.use(express.urlencoded());

const equations = [];

app.get('/equations', (req, res) => {
    res.send(equations);
}); // end app.get /equations

app.post('/equations', (req, res) => {
    const equationToAdd = req.body;
    console.log(req.body);
    evaluateEquationString(req.body);
    equationToAdd.result = evaluateEquationString(req.body);
    console.log('equationToAdd.result:', equationToAdd.result);
    equations.push(equationToAdd);
    console.log(equations);
    res.sendStatus(200);
}); // end app.post /equations

app.delete('/equations', (req, res) => {
    emptyEquationsArray(equations);
    console.log('equations array:', equations);
    res.sendStatus(200);
}); // end app.delete /equations

let numberOne = '';
let numberTwo = '';
let operator = '';

/**
 * Evaluates the posted data object to determine the inputed numbers and math operator. Returns the final result, which is the calculation done within calcResult.
 */

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
    } // end first for loop
    for(let i=(endIndex + 1); i<dataObjectInput.equation.length; i +=1){
        console.log('in second for loop');
        console.log(dataObjectInput.equation[i]);
        numberTwo += dataObjectInput.equation[i];
    } // end second for loop
    console.log('numberOne:', numberOne);
    console.log('numberTwo:', numberTwo);
    console.log('operator:', operator);
    console.log('full equation:', numberOne, operator, numberTwo);
    finalResult = calcResult(numberOne, operator, numberTwo);
    console.log('finalResult in evaluateEquationString:', finalResult);
    return finalResult;
    // return new Function('return ' + dataObjectInput.equation)(); // found this option online but it seems to potentially have the same issues as eval()? at a minimum, using it didn't seem to be in the spirit of the assignment.
} // end calcResult

/**
 * Calculates the equation one of four ways, depending on the math operator used, and returns the result
 */

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

function emptyEquationsArray(arrayInput) {
    console.log('in emptyEquationsArray');
    for(let i=0; i=arrayInput.length; i+=1){
        arrayInput.pop();
    } // end for loop
    console.log('equations:', equations);
} // end emptyEquationsArray

app.listen(port, () => {
    console.log('listening on port', port);
});
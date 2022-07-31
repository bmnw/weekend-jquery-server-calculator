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

// let numberOne = '';
// let numberTwo = '';
// let operator = '';

function calcResult(dataObjectInput) {
    console.log('in calcResult');
    let numberOne = '';
    let numberTwo = '';
    let operator = '';
    let endIndex;
    let result;
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
    if(operator === '+'){
        result = Number(numberOne) + Number(numberTwo);
    } else if(operator === '-'){
        result = Number(numberOne) - Number(numberTwo);
    } else if(operator === '*'){
        result = Number(numberOne) * Number(numberTwo);
    } else if(operator === '/'){
        result = Number(numberOne) / Number(numberTwo);
    }
    return result;
    // return new Function('return ' + dataObjectInput.equation)();
} // end calcResult

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
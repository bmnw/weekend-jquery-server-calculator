console.log('js sourced');

$(readyNow);

function readyNow() {
    console.log('ready now');
    displayEquationHistory();
    // $('.operator').on('click', captureMathOperator);
    $('.calc-input').on('click', captureUserInput);
    $('#equation-submit').on('click', sendEquationToServer);
    $('#clear-inputs').on('click', clearInputs);
}

let newEquation = '';

function captureUserInput() {
    console.log('in captureUserInput');
    let newInput = $(this).data('mode');
    console.log('newInput:', newInput);
    newEquation += newInput;
    console.log('newEquation:', newEquation);
    $('#equation-entry').val(newEquation);
}

/**
 * Sends get request for equation history on page load and displays equations on the DOM
 */

function displayEquationHistory() {
    console.log('in displayEquationHistory');
    // create a get request for the equation history
    $.ajax({
        type: 'GET',
        url: '/equations'
    }).then(function (response) {
        console.log('response:', response);
        for(let equation of response){
            $('#equation-history').append(`
                <p>
                    ${equation.inputOne} ${equation.mathOperator} ${equation.inputTwo} = ${equation.result}
                </p>
            `);
        }
    });
}

/**
 * Clears values that the user entered into the input fields
 */

function clearInputs() {
    console.log('in clearInputs');
    // $('#input-one').val(''); // empty first input, set val to empty string
    // $('#input-two').val(''); // empty second input, set val to empty string
    // console.log('input 1', $('#input-one').val());
    // console.log('input 2', $('#input-two').val());
    newEquation = '';
    $('#equation-entry').val(newEquation);
    console.log(typeof $('#equation-entry').val());
}

function sendEquationToServer() {
    console.log('in sendEquationToServer');
    console.log('input one:', $('#input-one').val());
    console.log('math operator:', currentOperator);
    console.log('input two:', $('#input-two').val());
    $.ajax({
        type: 'POST',
        url: '/equations',
        data: {
            inputOne: $('#input-one').val(),
            mathOperator: currentOperator,
            inputTwo: $('#input-two').val()
        }
    }).then(function (response){
        getEquations();
        clearInputs();
    }).catch(function (error){
        console.log(error);
        alert('Something went wrong. Please try again.');
    });
}

function getEquations() {
    console.log('in getEquations');
    $.ajax({
        method: 'GET',
        url: '/equations'
    }).then(function(response) {
        console.log('response:', response);
        $('#result-display').empty();
        $('#equation-history').empty();
        $('#result-display').append(`
            ${response[response.length - 1].result}
        `);
        for(let equation of response){
            $('#equation-history').append(`
                <p>
                    ${equation.inputOne} ${equation.mathOperator} ${equation.inputTwo} = ${equation.result}
                </p>
            `);
        }
    }).catch(function(error) {
        console.log(error);
        alert('Something went wrong. Please try again.');
    });
}

/**
 * Creates new equation object
 */

// function newEquation(input1, operator, input2) {
//     console.log('in newEquation');
//     // create equation object with the input numbers and selected operator as properties
//     let newEquation = {
//         inputOne: input1,
//         mathOperator: operator,
//         inputTwo: input2
//     }
//     console.log('equation object:', newEquation);
//     return newEquation;
// }

let currentOperator;

/**
 * Assigns the global variable currentOperator to the data-mode of the clicked math operator button
 */

function captureMathOperator() {
    console.log('in captureMathOperator');
    currentOperator = $(this).data('mode');
    console.log('clicked operator:', currentOperator);
}
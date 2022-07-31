console.log('js sourced');

$(readyNow);

function readyNow() {
    console.log('ready now');
    displayEquationHistory();
    // used in base mode // $('.operator').on('click', captureMathOperator);
    $('.calc-input').on('click', captureUserInput);
    $('#equation-submit').on('click', sendEquationToServer);
    $('#clear-inputs').on('click', clearInputs);
    $('#clear-history').on('click', clearEquationHistory);
    $('body').on('click', '.equation-record', rerunEquation);
}

let newEquation = '';

function captureUserInput() {
    console.log('in captureUserInput');
    let newInput = $(this).data('mode');
    console.log('newInput:', newInput);
    newEquation += newInput;
    console.log('newEquation:', newEquation);
    $('#equation-entry').val(newEquation);
} // end captureUserInput

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
                    <p class="equation-record">
                        ${equation.equation}
                    </p>
            `);
            // commented out base mode code
            // $('#equation-history').append(`
            //     <p>
            //         ${equation.inputOne} ${equation.mathOperator} ${equation.inputTwo} = ${equation.result}
            //     </p>
            // `);
        }
    }).catch(function (error) {
        console.log(error);
        alert('Something went wrong. Please try again.');
    });
} // end displayEquationHistory

/**
 * Clears values that the user entered into the input fields
 */

function clearInputs() {
    console.log('in clearInputs');
    // commented out base mode code
    // $('#input-one').val(''); // empty first input, set val to empty string
    // $('#input-two').val(''); // empty second input, set val to empty string
    // console.log('input 1', $('#input-one').val());
    // console.log('input 2', $('#input-two').val());
    newEquation = '';
    $('#equation-entry').val(newEquation);
    console.log(typeof $('#equation-entry').val());
} // end clearInputs

let inputComplete = true;

/**
 * Checks for complete equation syntax: two numbers separated by a math operator. Does this using a series of if statements. Returns whether inputComplete is true or false
 */

function checkForCompleteInput(equationInput){
    console.log('in checkForCompleteInput');
    if(equationInput.indexOf('+') === -1 && equationInput.indexOf('-') === -1 && equationInput.indexOf('*') === -1 && equationInput.indexOf('/') === -1) {
        console.log('no math operator');
        alert('The equation needs a math operator (+, -, *, /). And possibly a second number.');
        inputComplete = false;
        return inputComplete;
    }
    if(equationInput[0] === '+' || equationInput[0] === '-' || equationInput[0] === '*' || equationInput[0] === '/') {
        console.log('begins with a math operator');
        alert('The equation cannot start with a math operator (+, -, *, /). Please add a first number.');
        inputComplete = false;
        return inputComplete;
    }
    if(equationInput[equationInput.length-1] === '+' || equationInput[equationInput.length-1] === '-' || equationInput[equationInput.length-1] === '*' || equationInput[equationInput.length-1] === '/') {
        console.log('ends with a math operator');
        alert('The equation cannot end with a math operator (+, -, *, /). Please add a second number.');
        inputComplete = false;
        return inputComplete;
    }
} // end checkForCompleteInput

// for stretch goals
function sendEquationToServer() {
    console.log('in sendEquationToServer');
    console.log('newEquation:', newEquation);
    inputComplete = true;
    checkForCompleteInput(newEquation);
    if(inputComplete === false){
        return;
    }
    $.ajax({
        type: 'POST',
        url: '/equations',
        data: {
            equation: newEquation
        }
    }).then(function (response) {
        console.log(response);
        getEquations();
        clearInputs();
    }).catch(function (error) {
        console.log(error);
        alert('Something went wrong. Please try again.');
    });
} // end sendEquationToServer

// for base mode
// function sendEquationToServer() {
//     console.log('in sendEquationToServer');
//     console.log('input one:', $('#input-one').val());
//     console.log('math operator:', currentOperator);
//     console.log('input two:', $('#input-two').val());
//     $.ajax({
//         type: 'POST',
//         url: '/equations',
//         data: {
//             inputOne: $('#input-one').val(),
//             mathOperator: currentOperator,
//             inputTwo: $('#input-two').val()
//         }
//     }).then(function (response){
//         getEquations();
//         clearInputs();
//     }).catch(function (error){
//         console.log(error);
//         alert('Something went wrong. Please try again.');
//     });
// }

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
                    <p class="equation-record">
                        ${equation.equation}
                    </p>
            `);
        }
    }).catch(function(error) {
        console.log(error);
        alert('Something went wrong. Please try again.');
    });
} // end getEquations

function clearEquationHistory() {
    console.log('in clearEquationHistory');
    $.ajax({
        type: 'DELETE',
        url: '/equations'
    }).then(function (response) {
        console.log(response);
        getEquationsAfterDelete();
    }).catch(function (error) {
        console.log(error);
        alert('Something went wrong. Please try again');
    });
} // end clearEquationHistory

function getEquationsAfterDelete() {
    console.log('in getEquationsAfterDelete');
    $.ajax({
        type: 'GET',
        url: '/equations'
    }).then(function (response) {
        console.log('should be empty array:', response);
        $('#result-display').empty();
        $('#equation-history').empty();
        $('#equation-history').append(`
            <p>
                ${response}
                Equation history has been cleared.
            </p>
        `);
    }).catch(function (error) {
        console.log(error);
        alert('Something went wrong. Please try again.');
    });
} // end getEquationsAfterDelete

/**
 * Captures selected equation record in equation history and reruns that equation, alert infos user which equation was rerun
 */

function rerunEquation(){
    console.log('in rerunEquation');
    let equationToRerun = $(this).html();
    console.log('equation to rerun:', equationToRerun);
    console.log(typeof equationToRerun);
    $.ajax({
        type: 'POST',
        url: '/equations',
        data: {
            equation: equationToRerun
        }
    }).then(function (response) {
        console.log(response);
        getEquations();
        setTimeout(function rerunAlert(){
            alert(`${equationToRerun} has been calculated.`)
        }, 400);
    }).catch (function (error) {
        console.log(error);
        alert('Something went wrong. Please try again.');
    });
} // end rerunEquation

// let currentOperator;

/**
 * // for base mode // Assigns the global variable currentOperator to the data-mode of the clicked math operator button
 */

// function captureMathOperator() {
//     console.log('in captureMathOperator');
//     currentOperator = $(this).data('mode');
//     console.log('clicked operator:', currentOperator);
// }
console.log('js sourced');

$(readyNow);

function readyNow() {
    console.log('ready now');
    $('.operator').on('click', captureMathOperator);
    $('#equals').on('click', postNewEquation);
    $('#clear-inputs').on('click', clearInputs);
}

/**
 * Clears values that the user entered into the input fields
 */

function clearInputs() {
    console.log('in clearInputs');
    $('#input-one').val(''); // empty first input, set val to empty string
    $('#input-two').val(''); // empty second input, set val to empty string
    console.log('input 1', $('#input-one').val());
    console.log('input 2', $('#input-two').val());
}

let inputOne;
let operator;
let inputTwo;

/**
 * Pushes new equation object to the server
 */

function postNewEquation() {
    console.log('in postNewEquation');
    inputOne = $('#input-one').val(); // get the first input number
    operator = currentOperator; // get the math operator
    inputTwo = $('#input-two').val(); // get the second input number
    console.log('input one, operator, input two:', inputOne, operator, inputTwo);
    newEquation(inputOne, operator, inputTwo);
    // postRequest();
    getEquations();
}

function getEquations() {
    console.log('in getEquations');
    $.ajax({
        method: 'GET',
        url: '/equations'
    }).then(function(response) {
        console.log('response:', response);
        for(let equation of response){
            $('#equation-history').append(`
                <p>
                    ${equation.inputOne} ${equation.mathOperator} ${equation.inputTwo}
                </p>
            `);
            console.log(typeof equation.operator);
        }
    }).catch(function(error) {
        console.log(error);
        alert('something went wrong, please try again.');
    });
}

// function postRequest() {
//     console.log('in postRequest');
//     // making a post request to the server
//     $.ajax({
//         method: 'POST', // type of request
//         url: '/equation', // route to be matched on the server
//         data: {
//             equationToAdd: 
//                 newEquation(inputOne, operator, inputTwo)
//             }
//     }).then(function(response){
//         console.log('successful response');
//         // refresh equation history
//         getEquations(); // need to declare this function
//     }).catch(function(response){
//         // alert user to a failed response
//         alert('something went wrong, please try again');
//     })
// }

/**
 * Creates new equation object
 */

function newEquation(input1, operator, input2) {
    console.log('in newEquation');
    // create equation object with the input numbers and selected operator as properties
    let newEquation = {
        inputOne: input1,
        mathOperator: operator,
        inputTwo: input2
    }
    console.log('equation object:', newEquation);
    return newEquation;
}

let currentOperator;

/**
 * Assigns the global variable currentOperator to the data-mode of the clicked math operator button
 */

function captureMathOperator() {
    console.log('in captureMathOperator');
    currentOperator = $(this).data('mode');
    console.log('clicked operator:', currentOperator);
}
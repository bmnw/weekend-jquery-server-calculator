console.log('js sourced');

$(readyNow);

function readyNow() {
    console.log('ready now');
    $('#clear-inputs').on('click', clearInputs);
    $('#equals').on('click', pushNewEquation);
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

/**
 * Pushes new equation object to the server
 */

function pushNewEquation() {
    console.log('in pushNewEquation');
    let inputOne = $('#input-one').val(); // get the first input number
    let operator = ; // unsure how to capture which math operator was last clicked
    let inputTwo = $('#input-two').val(); // get the second input number
    console.log('input one, two:', inputOne, inputTwo);
    newEquation(inputOne, operator, inputTwo);
}

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
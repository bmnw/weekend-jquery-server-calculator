console.log('js sourced');

$(readyNow);

function readyNow() {
    console.log('ready now');
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
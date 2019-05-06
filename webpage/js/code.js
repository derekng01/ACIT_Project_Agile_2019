function get_input() {
    var user_code = document.getElementById('input').value;
    return user_code
    // document.getElementById('output').srcdoc = user_code;
}



function display_output(user_code) {
    var cssstuff = document.getElementById('input2').value;
    var code = '<style>'+cssstuff+'</style>' + user_code;
    document.getElementById('output').srcdoc = code
}


function isPrime(number)
{
    if (number <= 1)
        return false;

    // The check for the number 2 and 3
    if (number <= 3)
        return true;

    if (number%2 == 0 || number%3 == 0)
        return false;

    for (var i=5; i*i<=number; i=i+6)
    {
        if (number%i == 0 || number%(i+2) == 0)
            return false;
    }

    return true;
}

module.exports = {
    display_output,
    get_input,
    isPrime
};
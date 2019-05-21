function chk_auto(){
    var auto_rend = document.getElementById("autorend").checked;
    //check status of auto render. on = true, off = false

    if(auto_rend === true){
        document.getElementById("manrend").disabled = true;
    }
    // disable the manual render button when auto render is on
    else{
        document.getElementById("manrend").disabled = false;
    }
    // enable the manual render button when auto render is off
    return auto_rend;
}


function get_input(user_in) {
    // this function only work properly when user input is true,
    // which is either a manual input, or when auto render is on.
    if (user_in === true) {
        var user_code = document.getElementById('input').value;
        return user_code
        // document.getElementById('output').srcdoc = user_code;
    }
}

function display_output(user_code,user_in) {
    // this function only work properly when user input is true,
    // which is either a manual input, or when auto render is on.
    if (user_in === true) {
        var cssstuff = document.getElementById('input2').value;
        var code = '<style>' + cssstuff + '</style>' + user_code;
        document.getElementById('output').srcdoc = code
    }
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
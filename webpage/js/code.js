function get_input() {
    var user_code = document.getElementById('input').value;
    return user_code
    // document.getElementById('output').srcdoc = user_code;
}
function display_output(user_code) {
    document.getElementById('output').srcdoc = user_code
}

module.exports = {
    display_output,
    get_input
};
exports.isJSON = function(value) {
    try {
        JSON.parse(value);
    } catch (e) {
        return false;
    }
    return true;
}

const generatePass = require('generate-password');

function generatePassword(length) {
    const password = generatePass.generate({
        length: length,
        numbers: true,
        symbols: false,
        uppercase: true,
        excludeSimilarCharacters: true
    });
    return password;
}

module.exports = { generatePassword };
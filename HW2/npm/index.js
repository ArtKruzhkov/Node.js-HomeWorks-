const fakerItem = require('faker');

function getRandomName() {
    return fakerItem.name.findName();
}

function getRandomAddress() {
    return fakerItem.address.streetAddress();
}

function getRandomDate() {
    return fakerItem.date.past();
}

function getRandomPhone() {
    return fakerItem.datatype.number();
}

module.exports = { getRandomName, getRandomAddress, getRandomDate, getRandomPhone };
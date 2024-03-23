const faker = require('faker');

function getRandomName() {
    return faker.name.firstName();
}

function getRandomAddress() {
    return faker.address.streetAddress();
}

function getRandomDate() {
    return faker.date.past();
}

function getRandomPhone() {
    return faker.phone.phoneNumber();
}

module.exports = { getRandomName, getRandomAddress, getRandomDate, getRandomPhone };
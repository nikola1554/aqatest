const {faker} = require('@faker-js/faker');

export const  newUser1 = {
    firstName:faker.person.firstName(),
    lastName:faker.person.lastName(),
    email: faker.internet.email(),
    password:faker.internet.password(),
    country:'Ukraine',
    city:faker.location.city(),
    phoneNumber:'+380777777777',
    street:faker.location.streetAddress(),
    zipCode:'67551',
}

export const cardData = {
    cardNumber:process.env.CARD_NUMBER,
    cardDate:process.env.CARD_DATE,
    cardCVV:faker.finance.creditCardCVV(),

}

export const apiDataPost = {
    title: 'Bring me a little bread',
    body: 'with butter',
    userId: 1,
}

export const apiDataPatch = {
    title: 'It is warm outside'
}
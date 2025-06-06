const app = require('../app');
const request = require('supertest');
const mongoose = require('mongoose');
const yup = require('yup');

const appRequest = request(app);

const bodySchema = yup.object({
    data: yup.object({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        email: yup.string().required().email(),
        passwordHash: yup.string().required(),
        birthday: yup.date()
    }),
    tokens: yup.object({
        accessToken: yup.string().required(),
        refreshToken: yup.string().required()
    })
})

function getUser(){
    return {
        firstName: 'John',
        lastName: 'Doe',
        email: `john.doe${Date.now()}@gmail.com`,
        password: 'qwerty123',
        birthday: '1960-12-15'
    }
}

const user = getUser();

describe('create new user', () => {
    test('user create successfully expect 201 created',async ()=>{
        const response = await appRequest.post('/api/users/sign-up').send(user);

        expect(response.statusCode).toBe(201);

        expect(bodySchema.isValidSync(response.body)).toBe(true);
    });

    test('create empty user expect 400 bad request',async ()=>{
        const response = await appRequest.post('/api/users/sign-up').send({});

        expect(response.statusCode).toBe(400);

        expect(bodySchema.isValidSync(response.body)).toBe(false);
    })
});

afterAll(async ()=>{
    await mongoose.connection.close();
})

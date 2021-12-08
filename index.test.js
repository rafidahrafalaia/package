const request = require('supertest');
const app = require("./app");

describe('Space test suite', () => {
    it('tests /package endpoints', async() => {
        const response = await request(app).get("/package");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.any(Array))
        // Testing a single element in the array

    });

    // Insert other tests below this line

    // Insert other tests above this line
});
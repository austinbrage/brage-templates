import request from 'supertest';
import express from 'express';
import UsersMysql from '../../server/routes/users/users.model.mysql.js';
import createUsersRouter from '../../server/routes/users/users.router.js';
import { createPoolConnection } from '../../server/global/utils/database.js';

describe('Users API Integration', () => {
    let usersPool;
    let app;
    let id;

    beforeAll(async () => {
        process.env.NODE_ENV = 'test';

        usersPool = createPoolConnection({ wait: true, cLimit: 1, qLimit: 0 });
        const usersModel = new UsersMysql({ usersPool });

        await usersPool.query('TRUNCATE TABLE users');

        app = express();
        app.use(express.json());
        app.use('/users', createUsersRouter({ usersModel }));
    });

    it('should create a new user', async () => {
        const userData = {
            name: 'Alice',
            email: 'alice@example.com',
        };

        const res = await request(app).post('/users/addNew').send(userData);

        expect(res.statusCode).toBe(201);
        expect(res.body.result.data[0].insertId).toBeDefined();

        id = res.body.result.data[0].insertId;
    });

    it('should read new user', async () => {
        const res = await request(app).get(`/users/getByID?id=${id}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.result.data[0].name).toBe('Alice');
        expect(res.body.result.data[0].email).toBe('alice@example.com');
    });

    it('should update new user', async () => {
        const userData = {
            id: id,
            name: 'Ana',
            email: 'ana@example.com',
        };

        let res = await request(app).put('/users/changeAll').send(userData);

        expect(res.statusCode).toBe(200);

        res = await request(app).get(`/users/getByID?id=${id}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.result.data[0].name).toBe('Ana');
        expect(res.body.result.data[0].email).toBe('ana@example.com');
    });

    it('should delete new user', async () => {
        const userData = {
            id: id,
        };

        let res = await request(app).delete('/users/remove').send(userData);

        expect(res.statusCode).toBe(200);

        res = await request(app).get(`/users/getByID?id=${id}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.result.data).toHaveLength(0);
    });

    afterAll(async () => {
        await usersPool.query('TRUNCATE TABLE users');
        await usersPool.end();
    });
});

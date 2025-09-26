import usersQueries from './users.queries.js';
import { ConnectionHandler } from '../../global/handlers/connection.js';

class UsersMysql {
    constructor({ usersPool }) {
        const connectionHandler = new ConnectionHandler('users');

        this.pool = usersPool;
        this.connectionHandler = connectionHandler.connect;
    }
    
    getAll = async () => {
        return this.connectionHandler(this.pool, async (connection) => {
            const [rows] = await connection.execute(
                usersQueries.getAll,
                []
            );

            return rows;
        });
    }
    
    getByID = async ({ id }) => {
        return this.connectionHandler(this.pool, async (connection) => {
            const [rows] = await connection.execute(
                usersQueries.getByID,
                [id]
            );

            return rows;
        });
    }
    
    addNew = async ({ name, email }) => {
        return this.connectionHandler(this.pool, async (connection) => {
            const [rows] = await connection.execute(
                usersQueries.addNew,
                [name, email]
            );

            return rows;
        });
    }
    
    changeAll = async ({ name, email, id }) => {
        return this.connectionHandler(this.pool, async (connection) => {
            const [rows] = await connection.execute(
                usersQueries.changeAll,
                [name, email, id]
            );

            return rows;
        });
    }
    
    remove = async ({ id }) => {
        return this.connectionHandler(this.pool, async (connection) => {
            const [rows] = await connection.execute(
                usersQueries.remove,
                [id]
            );

            return rows;
        });
    }
    
}

export default UsersMysql;
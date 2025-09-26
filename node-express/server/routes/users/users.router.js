import { Router } from 'express';
import SanitizeGetRequests from './users.middlewares.js';
import UsersController from './users.controllers.js';

const createUsersRouter = ({ usersModel }) => {
    const usersRouter = Router();

    const sanitize = new SanitizeGetRequests();
    const usersController = new UsersController({ usersModel });

    usersRouter.get('/getAll', usersController.getAll);
    usersRouter.get('/getByID', sanitize.getByID, usersController.getByID);
    usersRouter.post('/addNew', usersController.addNew);
    usersRouter.put('/changeAll', usersController.changeAll);
    usersRouter.delete('/remove', usersController.remove);
    
    return usersRouter;
}

export default createUsersRouter;
import { Router } from 'express';
import SanitizeRequests from './users.middlewares.js';
import UsersController from './users.controllers.js';

const createUsersRouter = ({ usersModel }) => {
    const usersRouter = Router();

    const sanitize = new SanitizeRequests();
    const usersController = new UsersController({ usersModel });

    usersRouter.get('/getAll', usersController.getAll);
    usersRouter.get('/getByID', sanitize.getByID, usersController.getByID);
    usersRouter.post('/addNew', sanitize.addNew, usersController.addNew);
    usersRouter.put('/changeAll', sanitize.changeAll, usersController.changeAll);
    usersRouter.delete('/remove', sanitize.remove, usersController.remove);

    return usersRouter;
};

export default createUsersRouter;

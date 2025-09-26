import { Router } from 'express';
import ValidateRequests from './users.middlewares.js';
import UsersController from './users.controllers.js';

const createUsersRouter = ({ usersModel }) => {
    const usersRouter = Router();

    const validate = new ValidateRequests();
    const usersController = new UsersController({ usersModel });

    usersRouter.get('/getAll', usersController.getAll);
    usersRouter.get('/getByID', validate.getByID, usersController.getByID);
    usersRouter.post('/addNew', validate.addNew, usersController.addNew);
    usersRouter.put('/changeAll', validate.changeAll, usersController.changeAll);
    usersRouter.delete('/remove', validate.remove, usersController.remove);

    return usersRouter;
};

export default createUsersRouter;

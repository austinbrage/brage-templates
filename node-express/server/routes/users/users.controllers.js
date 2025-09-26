import { asyncErrorHandler } from './../../global/handlers/asyncError.js';
import { createOkResponse } from './../../global/utils/responses.js';

class UsersController {
    constructor({ usersModel }) {
        this.usersModel = usersModel;
    }

    getAll = asyncErrorHandler(async (_req, res) => {
        const data = await this.usersModel.getAll();

        return res.status(200).json(
            createOkResponse({
                message: 'getAll in users executed successfully',
                data,
            })
        );
    });

    getByID = asyncErrorHandler(async (req, res) => {
        const data = await this.usersModel.getByID(req.sanitizedData);

        return res.status(200).json(
            createOkResponse({
                message: 'getByID in users executed successfully',
                data,
            })
        );
    });

    addNew = asyncErrorHandler(async (req, res) => {
        const data = await this.usersModel.addNew(req.sanitizedData);

        return res.status(201).json(
            createOkResponse({
                message: 'addNew in users executed successfully',
                data: [data],
            })
        );
    });

    changeAll = asyncErrorHandler(async (req, res) => {
        const data = await this.usersModel.changeAll(req.sanitizedData);

        return res.status(200).json(
            createOkResponse({
                message: 'changeAll in users executed successfully',
                data: [data],
            })
        );
    });

    remove = asyncErrorHandler(async (req, res) => {
        const data = await this.usersModel.remove(req.sanitizedData);

        return res.status(200).json(
            createOkResponse({
                message: 'remove in users executed successfully',
                data: [data],
            })
        );
    });
}

export default UsersController;

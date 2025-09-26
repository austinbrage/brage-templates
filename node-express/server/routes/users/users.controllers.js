import { UsersValidation } from './users.validations.js';
import { asyncErrorHandler } from './../../global/handlers/asyncError.js';
import { createOkResponse, createErrorResponse } from './../../global/utils/responses.js';

class UsersController {

    constructor({ usersModel }) {
        this.usersModel = usersModel;
        this.validateUsers = new UsersValidation();
    }

    validationErr(res, validationError) {
        return res.status(400).json(createErrorResponse({
            message: 'Validation data error',
            error: validationError.format()
        }));
    }
    
    getAll = asyncErrorHandler(async (_req, res) => {
        const data = await this.usersModel.getAll();

        return res.status(200).json(createOkResponse({
            message: 'getAll in users executed successfully',
            data
        }));
    })
    
    getByID = asyncErrorHandler(async (req, res) => {
        const validation = this.validateUsers.getByID(req.sanitizedData);

        if (!validation.success) return this.validationErr(res, validation.error);
        
        const data = await this.usersModel.getByID(validation.data);

        return res.status(200).json(createOkResponse({
            message: 'getByID in users executed successfully',
            data
        }));
    })
    
    addNew = asyncErrorHandler(async (req, res) => {
        const validation = this.validateUsers.addNew(req.body);

        if (!validation.success) return this.validationErr(res, validation.error);
        
        const data = await this.usersModel.addNew(validation.data);

        return res.status(201).json(createOkResponse({
            message: 'addNew in users executed successfully',
            data: [data]
        }));
    })
    
    changeAll = asyncErrorHandler(async (req, res) => {
        const validation = this.validateUsers.changeAll(req.body);

        if (!validation.success) return this.validationErr(res, validation.error);
        
        const data = await this.usersModel.changeAll(validation.data);

        return res.status(200).json(createOkResponse({
            message: 'changeAll in users executed successfully',
            data: [data]
        }));
    })
    
    remove = asyncErrorHandler(async (req, res) => {
        const validation = this.validateUsers.remove(req.body);

        if (!validation.success) return this.validationErr(res, validation.error);
        
        const data = await this.usersModel.remove(validation.data);

        return res.status(200).json(createOkResponse({
            message: 'remove in users executed successfully',
            data: [data]
        }));
    })
    
}

export default UsersController;
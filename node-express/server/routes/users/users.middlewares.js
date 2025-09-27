import { createErrorResponse } from './../../global/utils/responses.js';
import { UsersStringValidation, UsersValidation } from './users.validations.js';

class ValidateRequests {

    constructor() {
        this.validateUsers = new UsersValidation();
        this.validateStringUsers = new UsersStringValidation();
    }

    validationErr(res, validationError) {
        return res.status(400).json(createErrorResponse({
            message: 'Validation data error',
            error: validationError.format()
        }));
    }
    
    getByID = (req, res, next) => { 
        // 1. Validate input as string
        let validation = this.validateStringUsers.getByID(req.query);
        if (!validation.success) return this.validationErr(res, validation.error);

        // 2. Sanitize with the correct types
        const sanitizedData = {};
        
        // ➡️ id goes from string to number
        sanitizedData.id = parseInt(validation.data.id, 10);
        
        // 3. Validate the correct types
        validation = this.validateUsers.getByID(sanitizedData);
        if (!validation.success) return this.validationErr(res, validation.error);

        req.validatedData = validation.data;
                    
        next();
    }
    
    addNew = (req, res, next) => {
        const validation = this.validateUsers.addNew(req.body);
        if (!validation.success) return this.validationErr(res, validation.error);

        req.validatedData = validation.data;
                    
        next();
    }
    
    changeAll = (req, res, next) => {
        const validation = this.validateUsers.changeAll(req.body);
        if (!validation.success) return this.validationErr(res, validation.error);

        req.validatedData = validation.data;
                    
        next();
    }
    
    remove = (req, res, next) => {
        const validation = this.validateUsers.remove(req.body);
        if (!validation.success) return this.validationErr(res, validation.error);

        req.validatedData = validation.data;
                    
        next();
    }
    
}

export default ValidateRequests;
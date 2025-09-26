import { createErrorResponse } from './../../global/utils/responses.js';
import { UsersStringValidation, UsersValidation } from './users.validations.js';

class SanitizeRequests {
    constructor() {
        this.validateUsers = new UsersValidation();
        this.validateStringUsers = new UsersStringValidation();
    }

    validationErr(res, validationError) {
        return res.status(400).json(
            createErrorResponse({
                message: 'Validation data error',
                error: validationError.format(),
            })
        );
    }

    getByID = (req, res, next) => {
        // 1. Validate input as string
        let validation = this.validateStringUsers.getByID(req.query);
        if (!validation.success) return this.validationErr(res, validation.error);

        // 2. Convert to the correct types
        const convertedData = {};

        // ➡️ id goes from string to number
        convertedData.id = parseInt(validation.data.id, 10);

        // 3. Validate the correct types
        validation = this.validateUsers.getByID(convertedData);
        if (!validation.success) return this.validationErr(res, validation.error);

        req.sanitizedData = validation.data;

        next();
    };

    addNew = (req, res, next) => {
        const validation = this.validateUsers.addNew(req.body);
        if (!validation.success) return this.validationErr(res, validation.error);

        req.sanitizedData = validation.data;

        next();
    };

    changeAll = (req, res, next) => {
        const validation = this.validateUsers.changeAll(req.body);
        if (!validation.success) return this.validationErr(res, validation.error);

        req.sanitizedData = validation.data;

        next();
    };

    remove = (req, res, next) => {
        const validation = this.validateUsers.remove(req.body);
        if (!validation.success) return this.validationErr(res, validation.error);

        req.sanitizedData = validation.data;

        next();
    };
}

export default SanitizeRequests;

import { createErrorResponse } from './../../global/utils/responses.js';
import { UsersStringValidation } from './users.validations.js';

class SanitizeGetRequests {

    constructor() {
        this.validateStringUsers = new UsersStringValidation();
    }

    validationErr(res, validationError) {
        return res.status(400).json(createErrorResponse({
            message: 'Validation data error',
            error: validationError.format()
        }));
    }
    
    getByID = (req, res, next) => {
        const validation = this.validateStringUsers.getByID(req.query);
        if (!validation.success) return this.validationErr(res, validation.error);

        // Initialize req.sanitizedData
        req.sanitizedData = {};
        
        //id goes from string to number
        req.sanitizedData.id = parseInt(validation.data.id, 10);
        
        next();
    }
    
}

export default SanitizeGetRequests;
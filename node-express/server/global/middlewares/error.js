import logger from '../helpers/logger.js';

const globalErrorMiddleware = (error, _req, res, _next) => {
    const isProd = process.env.NODE_ENV === 'production';

    const status = error.status || 'error';
    const statusCode = error.statusCode || 500;
    const message = statusCode === 500 && isProd ? 'Internal Server Error' : error.message;

    if (isProd) {
        logger.error({ status, statusCode, message });
    } else {
        logger.error({ err: error, status, statusCode });
    }

    const response = {
        success: false,
        error: {
            status: status,
            message: message,
            validationError: null,
        },
    };

    return res.status(statusCode).json(response);
};

export default globalErrorMiddleware;

import pino from 'pino';

const isProd = process.env.NODE_ENV === 'prod';

const loggerOptions = {
    level: isProd ? 'info' : 'debug',
};

if (!isProd) {
    loggerOptions.transport = {
        target: 'pino-pretty',
        options: { colorize: true, translateTime: 'SYS:standard' },
    };
}

const logger = pino(loggerOptions);

export default logger;

import 'dotenv/config';

export const configs = {
    app: {
        port: parseInt(process.env.APP_PORT as string),
    },
    db: {
        url: process.env.DB_URL as string,
    },
};
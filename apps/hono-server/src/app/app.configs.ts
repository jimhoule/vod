import 'dotenv/config';

export const appConfigs = {
    http: {
        port: parseInt(process.env.HTTP_PORT as string),
    },
    db: {
        url: process.env.DB_URL as string,
    },
};

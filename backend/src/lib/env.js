import dotenv from 'dotenv';

dotenv.config({quiet: true});

export const ENV ={
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    MONGO_URI: process.env.MONGO_URI
}
const {
    MONGO_DATABASE,
    MONGO_HOST,
    MONGO_PORT,
} = process.env;

const mongoURI = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`;

export default mongoURI;

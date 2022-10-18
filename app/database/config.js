import mongoose from "mongoose";

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNSTRING, {
            dbName: process.env.DB_NAME,
        });
    } catch (error) {
        console.error(error);

        throw new Error("Database error when trying to connect to it");
    }
};

export { dbConnection };

import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';

dotenv.config();

export const connect = () => {
    mongoose
        .connect(process.env.MONGO_URI as string)
        .then(() => {
            console.log("Connexion à la base de données effectuée avec succès");
        })
        .catch((error: ErrorCallback) => {
            console.log("Connexion à la base de données échouée. fermeture du processus ...");
            console.error(error);
            process.exit(1);
        });
};
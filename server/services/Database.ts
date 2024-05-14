
import mongoose from 'mongoose';
import { MONGO_URI } from '../config';

/** --------------------- Database Connection ------------------------------ **/

export default async () => {
    try {

        interface CustomConnectOptions extends mongoose.ConnectOptions {
            useNewUrlParser: boolean;
        }

        const connectOptions: CustomConnectOptions = {
            useNewUrlParser: true,
        };

        mongoose.connect(MONGO_URI, connectOptions)
            .then(() => {
                console.log('Connected to MongoDB');
            })
            .catch((error) => {
                console.error('Error connecting to MongoDB:', error);
            });

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}





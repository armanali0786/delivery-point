
import express from 'express';
import { 
    ChatMessageService
} from '../controllers';


const router = express.Router();
import { Authenticate } from '../middlewares';


router.use(Authenticate);

/** --------------------- Create Vendor ------------------------------ **/

router.post('/sent-messages',ChatMessageService);


export {router as ChatRoute}; 
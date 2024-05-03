import express from 'express';
import { CreateVendor, GetVendorById, GetVendors,
    GetTransactions,GetTransactionById 
} from '../controllers';


const router = express.Router();

/** --------------------- Create Vendor ------------------------------ **/

router.post('/Vendor', CreateVendor);

/** --------------------- All Vendors ------------------------------ **/

router.get('/Vendors', GetVendors);

/** --------------------- All Vendor By Id ------------------------------ **/

router.get('/Vendor/:id', GetVendorById);

router.get('/transactions', GetTransactions)
router.get('/transaction/:id', GetTransactionById)



export {router as AdminRoute} ; 
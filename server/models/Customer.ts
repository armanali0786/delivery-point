import mongoose, { Schema, Document, Model } from 'mongoose';
import { OrderDoc } from './Order';
// import { OrderDoc } from './Order';


interface CustomerDoc extends Document {
    email: string;
    password: string;
    salt: string;
    fullName: string;
    // lastName: string;
    address: string;
    phone: string;
    verified: boolean;
    otp: number;
    otp_expiry: Date;
    lat: number;
    lng: number;
    orders: [OrderDoc]
    cart: [any],
    favourite: mongoose.Types.ObjectId[];
}


const CustomerSchema = new Schema({
    email: {type: String, required: true},
    password:  {type: String, required: true},
    salt:  {type: String, required: true},
    fullName:  {type: String,required: true},
    // lastName: {type: String,required: true},
    address: {type: String},
    phone: {type: String, required: true},
    verified: {type: Boolean},
    otp: {type: Number},
    otp_expiry: {type: Date},
    lat: {type: Number},
    lng: {type: Number},
    cart: [
        {
            food: { type: Schema.Types.ObjectId, ref: 'food', require: true},
            unit: { type: Number, require: true}
        }
    ],
    orders: [{
        type: Schema.Types.ObjectId,
        ref: 'order'
    }],
    favourite: [{ type: Schema.Types.ObjectId, ref: 'food' }]

},{
    toJSON: {
        transform(doc, ret){
            delete ret.password;
            delete ret.salt;
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
        }
    },
    timestamps: true
});


const Customer = mongoose.model<CustomerDoc>('customer', CustomerSchema);

export { Customer }
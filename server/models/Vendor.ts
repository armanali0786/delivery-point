import mongoose, { Model, Schema,Document } from "mongoose";

export interface VendorDoc extends Document {
    name: string;
    ownerName: string;
    foodType: [string];
    pincode: string;
    address: string;
    phone:  string;
    email:  string;
    password:  string;
    salt: string;
    serviceAvailable: boolean;
    coverImages: [string];
    rating: number;
    foods:any;
}

/** --------------------- Vender Schema----------------------------- **/

const VendorSchema: Schema = new Schema({
    name: {type:String, required:true},
    ownerName: {type:String, required:true},
    foodType: {type: [String]},
    pincode: {type:String, required:true},
    address: {type:String},
    phone:  {type:String, required:true},
    email:  {type:String, required:true},
    password:  {type:String, required:true},
    salt: {type:String, required:true},
    serviceAvailable: {type:Boolean},
    coverImages: {type:[String]},
    rating: {type:Number},
    foods:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "food"
    }],
},{
    toJSON:{
        transform(doc, ret){
            delete ret.password;
            delete ret.salt;
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
            return ret;
        }
    },
    timestamps: true,
});

const Vendor = mongoose.model<VendorDoc>('vendor',VendorSchema);

export {Vendor};
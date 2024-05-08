import { IsEmail, Length } from "class-validator";

export class CreateCustomerInput {

    fullName: string;

    // lastName: string;

    address: string;
    
    @IsEmail()
    email: string;
    
    @Length(7,12)
    phone: string;
    
    @Length(6,12)
    password: string;

}

export class UserLoginInput {
    @IsEmail()
    email: string;
    
    @Length(6,12)
    password: string;
}


export class EditCustomerProfileInput {
   
    @Length(3,16)
    fullName: string;

    // @Length(3,16)
    // lastName: string;
    
    @Length(6,16)
    address: string;
}
 

export interface CustomerPayload {
    _id: string;
    email: string;
    verified: boolean;
    fullName: string;
    phone: string;
}


export class CartItem {
    _id: string;
    unit: number;
}
 


export class OrderInputs {
    txnId: string;
    amount: string;
    items: [CartItem];
    CustomerAddress: string;
}



export class CreateDeliveryUserInput {
    @IsEmail()
    email: string;

    @Length(7,12)
    phone: string;

    @Length(6,12)
    password: string;

    @Length(3,12)
    fullName: string;

    // @Length(3,12)
    // lastName: string;

    @Length(6,24)
    address: string;

    @Length(4,12)
    pincode: string;
}

export class Product {
    name: string;
    images: string;
    price: number;
    quantity: number;
}
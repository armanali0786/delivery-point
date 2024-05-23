import express, { Application } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import { AdminRoute,VendorRoute, ShoppingRoute , CustomerRoute, ChatRoute } from '../routes';

/** --------------------- App Server ------------------------------ **/

export default async(app: Application) =>{

    app.use(cors());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/images', express.static(path.join(__dirname, '../images')));
    app.use('/images', express.static('../images'));

    app.use((req, res, next) => {res.setHeader('Access-Control-Allow-Origin', '*');next();}); 

    app.use('/admin',AdminRoute);
    app.use('/vendor',VendorRoute);
    app.use('/customer',CustomerRoute);
    app.use('/chats', ChatRoute);
    app.use(ShoppingRoute);

}



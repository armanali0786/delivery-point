import express from 'express';

import App from './services/ExpressApp';

import DbConnection from './services/Database';
import { PORT } from './config';

/** --------------------- Start Server ------------------------------ **/

const StartServer = async () =>{
    const app = express();
    await DbConnection();
    await App(app);


    const dialogflow = require('@google-cloud/dialogflow');
    const uuid = require('uuid');
    
    /**
     * Send a query to the dialogflow agent, and return the query result.
     * @param {string} projectId The project to be used
     */
    async function runSample(projectId = 'deliverypoint-bot-k9dr') {
      // A unique identifier for the given session
      const sessionId = uuid.v4();
    
      // Create a new session
      const sessionClient = new dialogflow.SessionsClient({
        keyFilename :"/home/backend/All-React-Projects/FoodOrderApp/server/deliverypoint-bot-k9dr-673b608529a3.json"
      });
      const sessionPath = sessionClient.projectAgentSessionPath(
        projectId,
        sessionId
      );
    
      // The text query request.
      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            // The query to send to the dialogflow agent
            text: 'How do I place an order using the app?',
            // The language used by the client (en-US)
            languageCode: 'en-US',
          },
        },
      };
    
      // Send request and log result
      const responses = await sessionClient.detectIntent(request);
      console.log('Detected intent');
      const result = responses[0].queryResult;
      console.log(`  Query: ${result.queryText}`);
      console.log(`  Response: ${result.fulfillmentText}`);
      if (result.intent) {
        console.log(`  Intent: ${result.intent.displayName}`);
      } else {
        console.log('  No intent matched.');
      }
    }
    runSample()




    app.listen(PORT , () => {
        console.log(`app listening on port no ${PORT}`);
    });
}

StartServer();
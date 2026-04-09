import { Kafka } from "kafkajs";
import dotenv from 'dotenv'
import axios from 'axios'
dotenv.config();


const Email_url = process.env.Email_backend_URL;

export const kafka = new Kafka({
  clientId: "ecommerce-app",
  brokers: ["localhost:9092"]
});

export const producer = kafka.producer();

await producer.connect();

export const Email_Consumer = kafka.consumer({ groupId: "email-service-group" });

await Email_Consumer.connect();

await Email_Consumer.subscribe({topic : "email-service-topic" , fromBeginning: true})


await Email_Consumer.run({
     
    eachMessage : async({topic , message})=>{

      try{

        const data = JSON.parse(message.value.toString());


          await  axios.post(`${Email_url}/auth/ForgotPasswordService` ,{
        data
      })

      }
      catch(er){
          
        console.log("Error while sending the message " , er);
      }
             
    
    },
})
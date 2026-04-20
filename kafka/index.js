import { Kafka } from "kafkajs";
import dotenv from 'dotenv'
import axios from 'axios'
dotenv.config();

const Email_url = process.env.Email_backend_URL;

console.log("Email Backend URL in Kafka Consumer " , Email_url)
export const kafka = new Kafka({
  clientId: "ecommerce-app",
  brokers: ["localhost:9092"],
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
        console.log("Sending to URL:", Email_url);
       const response =  await axios.post(`${Email_url}`, data, {
          withCredentials: true
        })

        if(response.status === 200){
          console.log("Email sent successfully for the data " , data);
        }

      }
      catch(er){
        console.log("Error while sending the message " , er);
      }
            
    },
})
import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  clientId: "ecommerce-app",
  brokers: ["localhost:9092"]
});

export const producer = kafka.producer();



export const Email_Consumer = kafka.consumer({ groupId: "email-service-group" });

await Email_Consumer.connect();

await Email_Consumer.subscribe({topic : "email-service-topic" , fromBeginning: true})


await Email_Consumer.run({
     
    eachMessage : async({topic , message})=>{
       
    },
})
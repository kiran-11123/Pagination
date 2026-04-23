// add-cart consumer

import { kafka } from "../..";

export const Add_Cart_Consumer = kafka.consumer({groupId : "Add-Cart-Consumer"})
await Add_Cart_Consumer.connect();





// remove-Cart-Consumer

export const Remove_Cart_Consumer = kafka.consumer({groupId : 'remove_Cart_Consumer'})
await Remove_Cart_Consumer.connect();







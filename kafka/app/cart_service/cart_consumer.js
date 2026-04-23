import { Cart_Consumer } from "../..";






await Cart_Consumer.subscribe({topic : 'Cart-topic' , fromBeginning : true})
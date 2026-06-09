import {
collection,
addDoc,
onSnapshot,
deleteDoc,
doc
} from "firebase/firestore";

import { db } from "./config";


const bookingRef = collection(db,"bookings");


// realtime listener
export function listenBookings(callback){

return onSnapshot(
bookingRef,
(snapshot)=>{

const data = snapshot.docs.map(item=>({

id:item.id,
...item.data()

}));

callback(data);

}

);

}



export async function addBooking(data){

return addDoc(
bookingRef,
data
);

}



export async function removeBooking(id){

return deleteDoc(
doc(db,"bookings",id)
);

}
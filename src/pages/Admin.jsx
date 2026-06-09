import { useState, useEffect } from "react";

import { login } from "../firebase/auth";

import {
addBooking,
removeBooking,
listenBookings
} from "../firebase/bookings";


export default function Admin(){


const ADMIN_EMAIL =
"markhorace22.mhb@gmail.com";


const [user,setUser] = useState(null);


const [name,setName]=useState("");
const [date,setDate]=useState("");
const [time,setTime]=useState("");


const [bookings,setBookings]=useState([]);



const times=[

"3:00 PM - 4:00 PM",
"4:00 PM - 5:00 PM",
"5:00 PM - 6:00 PM",
"6:00 PM - 7:00 PM",
"7:00 PM - 8:00 PM",
"8:00 PM - 9:00 PM",
"9:00 PM - 10:00 PM",
"10:00 PM - 11:00 PM"

];



useEffect(()=>{


const unsubscribe =
listenBookings(setBookings);


return ()=>unsubscribe();


},[]);





async function signIn(){


try{


const result =
await login();



if(result.email === ADMIN_EMAIL){


setUser(result);


}else{


alert("Access denied");


}



}catch(error){


alert(error.message);


}


}




async function saveBooking(){



if(!name || !date || !time){

alert("Complete all fields");

return;

}



const exists =
bookings.find(

(b)=>

b.date===date &&
b.time===time

);



if(exists){

alert(
"This schedule is already booked"
);

return;

}



await addBooking({

name,
date,
time,
booked:true

});



alert("Booking Saved");



setName("");
setDate("");
setTime("");

}





async function cancelBooking(id,name){


const ok =
window.confirm(

`Cancel booking of ${name}?`

);


if(!ok)return;



await removeBooking(id);



alert(
"Booking cancelled"
);


}





if(!user){


return (

<div className="adminPage">


<div className="adminBox">


<h2>
🏓 PikolBoy Admin
</h2>


<p>
Owner login only
</p>


<button onClick={signIn}>

Login with Gmail

</button>


</div>


</div>

);


}





return (

<div className="adminPage">


<div className="adminBox">



<h2>
🏓 PikolBoy Admin
</h2>


<p>
Logged in:
<br/>

{user.email}

</p>



<hr/>


<h3>
Add Booking
</h3>



<input

placeholder="Customer name"

value={name}

onChange={
e=>setName(e.target.value)
}

/>



<input

type="date"

value={date}

onChange={
e=>setDate(e.target.value)
}

/>



<select

value={time}

onChange={
e=>setTime(e.target.value)
}

>


<option value="">
Select time
</option>


{

times.map(t=>(

<option key={t}>

{t}

</option>

))

}


</select>



<button onClick={saveBooking}>

Save Booking

</button>





<hr/>

<h3>
Booking Schedule
</h3>


<div className="bookingSchedule">


{

bookings.length===0 &&

<p>No bookings yet</p>

}



{

Object.entries(

bookings.reduce((acc,b)=>{


if(!acc[b.date]){

acc[b.date]=[];

}


acc[b.date].push(b);


return acc;


},{})

).map(([day,list])=>(



<div className="dayBookingCard" key={day}>


<h4>

📅 {day}

</h4>



{

list.map(b=>(


<div 
className="timeBooking"
key={b.id}
>


<div>

<strong>
{b.time}
</strong>


<br/>


<span>
🏓 {b.name}
</span>


</div>



<button

className="cancelBtn"

onClick={()=>
cancelBooking(
b.id,
b.name
)

}

>

Cancel

</button>


</div>


))

}



</div>



))

}



</div>

</div>


</div>


);


}
import {useState,useEffect} from "react";


import {
login
} from "../firebase/auth";


import {
addBooking,
listenBookings,
removeBooking
} from "../firebase/bookings";



export default function Admin(){


const [user,setUser]=useState(null);

const [bookings,setBookings]=useState([]);


const [name,setName]=useState("");

const [date,setDate]=useState("");

const [time,setTime]=useState("");



const ADMIN_EMAIL="markhorace22.mhb@gmail.com";



async function signIn(){

const u =
await login();


if(u.email===ADMIN_EMAIL){

setUser(u);

loadBookings();

}else{

alert("Not admin");

}

}



async function loadBookings(){

const data =
await getBookings();

setBookings(data);

}



async function save(){


await addBooking({

name,

date,

time,

booked:true

});


alert("Saved");


loadBookings();


}



async function remove(id){

await removeBooking(id);

loadBookings();

}




if(!user){

return (

<div className="adminBox">

<h1>
PikolBoy Admin
</h1>


<button onClick={signIn}>
Login Gmail
</button>


</div>

)

}




return (

<div className="adminBox">


<h1>
Admin Dashboard
</h1>


<input

placeholder="Customer Name"

onChange={
e=>setName(e.target.value)
}

/>


<br/>


<input

type="date"

onChange={
e=>setDate(e.target.value)
}

/>



<br/>



<select
onChange={
e=>setTime(e.target.value)
}
>


<option>
Select Time
</option>

<option>3 PM</option>
<option>4 PM</option>
<option>5 PM</option>
<option>6 PM</option>
<option>7 PM</option>
<option>8 PM</option>
<option>9 PM</option>
<option>10 PM</option>


</select>


<br/>


<button onClick={save}>
Add Booking
</button>




<h2>
Current Bookings
</h2>


{

bookings.map(b=>(

<div className="bookingItem">


<b>
{b.name}
</b>


<br/>

{b.date}

<br/>

{b.time}



<br/>


<button
onClick={()=>remove(b.id)}
>

Delete

</button>


</div>


))

}



</div>

)

}
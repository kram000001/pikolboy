import {useEffect,useState} from "react";
import {listenBookings} from "../firebase/bookings";

function hideName(name){
 if(!name) return "";
 return name.trim().split(" ").map(x=>x[0]+"***").join(" ");
}

export default function CalendarGrid(){
 const [bookings,setBookings]=useState([]);
 const [selectedDate,setSelectedDate]=useState(new Date().toISOString().split("T")[0]);

 useEffect(()=>{
  return listenBookings(data=>setBookings(data));
 },[]);

 const hours=["3:00 PM - 4:00 PM","4:00 PM - 5:00 PM","5:00 PM - 6:00 PM","6:00 PM - 7:00 PM","7:00 PM - 8:00 PM","8:00 PM - 9:00 PM","9:00 PM - 10:00 PM","10:00 PM - 11:00 PM"];

 const dateLabel=new Date(selectedDate).toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"});

 return <div className="schedule">
  <div className="scheduleHeader">
   <h2>Court Schedule</h2>
   <p>{dateLabel}</p>
<input
 className="datePicker"
 type="date"
 value={selectedDate}
 onChange={e=>setSelectedDate(e.target.value)}
 onClick={(e)=>{
   e.currentTarget.showPicker?.()
 }}
/>  </div>

  <div className="slotsList">
  {hours.map(hour=>{
   const booked=bookings.find(b=>b.date===selectedDate && b.time===hour);
   return <div key={hour} className={booked?"slot booked":"slot available"}>
    <div className="time">{hour}</div>
    <div className="status">{booked?"Reserved • "+hideName(booked.name):"Open for booking"}</div>
   </div>
  })}
  </div>
 </div>
}

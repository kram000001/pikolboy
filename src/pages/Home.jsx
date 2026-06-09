import { Link } from "react-router-dom";
import { useState } from "react";

import CalendarGrid from "../components/CalendarGrid";

import logo from "../assets/logo.png";
import court from "../assets/court.jpg";


export default function Home(){

const [dark,setDark]=useState(true);

return (

<div
className={dark?"home dark":"home"}

style={{
backgroundImage:`linear-gradient(
rgba(2,6,23,.12),
rgba(2,6,23,.28)
),
url(${court})`
}}

>


<div className="overlay">



<header className="top glassHeader">


<img
src={logo}
className="logo"
/>


<div>




</div>


</header>




<section className="glassCard">


<h2>
🏓 Court Information
</h2>


<div className="infoGrid">


<div>

<h3>
⏰ Open Daily
</h3>

<p>
3:00 PM - 11:00 PM
</p>

</div>



<div>

<h3>
☀️ Day Use
</h3>

<p>
₱150 / hour
</p>

</div>



<div>

<h3>
🌙 Night Use
</h3>

<p>
₱200 / hour
</p>

</div>



</div>




<a
href="https://www.facebook.com/profile.php?id=61590252849407"
target="_blank"
>


<button className="fbButton">

📩 Message Facebook Page For Booking

</button>


</a>


</section>





<section className="calendarBox">


<CalendarGrid />


</section>





<Link
to="/admin"
className="adminLink"
>

Admin Login

</Link>
<footer className="footer">


</footer>


</div>


</div>


)

}
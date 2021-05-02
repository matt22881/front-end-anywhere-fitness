import React from 'react';

export default function Contact() {
    return (
        <div className="contactContainer">
            <h1>Contact Information</h1>
      Phone Number:<a href="tel:1234567890"> 123-456-7890</a>
            <address>Address: 1234 Work Out Ave. Gainsville, CA 92345</address>
      Email:
            <a href="mailto:somethingaboutfitness@gmail.com">
                somethingaboutfitness@gmail.com
      </a>
            <p>
                <img src="https://www.defined.com/wp-content/uploads/2021/02/Turf-Area-Maria-Phone-scaled.jpg " alt="" />
            </p>
        </div>
    );
}

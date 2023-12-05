import React, { useState } from 'react';
import './AmountHoursWorked.css';


const today = new Date(2023,9,20);

export function FormatDate(date){
    return new Intl.DateTimeFormat(
        'en-US',
        { weekday: 'long'}
    ).format(date);
}

export default function HoursWorked() {
  const [hours, setHours] = useState(0);

  const handleIncrementHours = () => {
    setHours(hours + 1);
  };

  const handleDecrementHours = () => {
    setHours(hours - 1);
  };

  return (
    <div>
      Today - {FormatDate(today)}, have you worked is {hours}
        <br></br>
      <button onClick={handleIncrementHours} className='button1-increment'>Increment</button>
      <button onClick={handleDecrementHours} className='button2-decrement'>Decrement</button>
    </div>  
  );
}
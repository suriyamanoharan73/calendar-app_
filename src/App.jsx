import { useState } from 'react';
import './App.css'; // Make sure you have the CSS file imported correctly
import left_arrow from "./assets/arrow-left-circle-fill.svg"; // Check the path to your SVG images
import right_arrow from "./assets/arrow-right-circle-fill.svg";

const daysOfWeek=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const months=["January","February","March","April","May","June","July","August","September","October","November","December"];

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date()); // Make sure the initial date state is set correctly

  const daysInMonth = () => {
    const daysArray = [];
    const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const lastDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);

    for (let i = 0; i < firstDay.getDay(); i++) {
      daysArray.push(null); // Push null values for days before the first day of the month
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      daysArray.push(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i));
    }
    return daysArray;
  };

  const isSameDay = (date1, date2) => {
    return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
  };

  const handleChangeMonth = (event) => {
    const newMonth = parseInt(event.target.value, 10);
    setSelectedDate(new Date(selectedDate.getFullYear(), newMonth, 1));
  };

  const handleChangeYear = (event) => {
    const newYear = parseInt(event.target.value, 10);
    setSelectedDate(new Date(newYear, selectedDate.getMonth(), 1));
  };

  return (
    <div className='calendar'>
      <div className='header'>
        <button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))}>
          <img src={left_arrow} alt="Left Arrow" />
        </button>
        <select value={selectedDate.getMonth()} onChange={handleChangeMonth}>
          {months.map((month, index) => (
            <option value={index} key={index}>{month}</option>
          ))}
        </select>
        <select value={selectedDate.getFullYear()} onChange={handleChangeYear}>
          {Array.from({ length: 10 }, (_, i) => selectedDate.getFullYear() - 5 + i).map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}>
          <img src={right_arrow} alt="Right Arrow" />
        </button>
      </div>
      <div className="daysOfWeek">
        {daysOfWeek.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className='days'>
        {daysInMonth().map((day, index) => (
          <div key={index} className={day ? (isSameDay(day, new Date()) ? "day current" : "day") : "empty"}>
            {day ? day.getDate() : ""}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

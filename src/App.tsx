import './App.css';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Week from './components/Week/Week';
import { available, booked } from './data/getAvailableTimes.json';
import { useEffect, useState } from 'react';
import { getTimesIn30Mins, getWholeWeek } from './util/tools';

interface WeekInfo {
  date: string;
  availTimes: string[];
  bookedTimes: string[];
}

const App = () => {
  const [week, setWeek] = useState<WeekInfo[]>();

  useEffect(() => {
    const week = getWholeWeek(booked);
    const weekInfo = week.map((date) => (
      {
        date: date.replaceAll('-', '/'),
        availTimes: getTimesIn30Mins(date, available),
        bookedTimes: getTimesIn30Mins(date, booked),
      }
    ))
    setWeek(weekInfo)
  }, [])

  return (
    <div className="app">
      <div className="calendar">
        <h3>授課時間</h3>
        <div className="calendar__header">
          <div className="calendar__week-select">
            <button className="calendar__button"><IoIosArrowBack /></button>
            <button className="calendar__button"><IoIosArrowForward /></button>
            <div className="calendar__week-current">
              {week && `${week[0].date} - ${week[week.length - 1].date}`}
            </div>
          </div>
          <div className="calendar__note">
            *時間以台北（GMT+8:00）顯示
          </div>
        </div>
        <div className="calendar__body">
          {week && <Week info={week} />}
        </div>
      </div>
    </div>
  );
}

export default App;

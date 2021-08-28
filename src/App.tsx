import './App.css';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Week from './components/Week/Week';
import { available, booked } from './data/getAvailableTimes.json';
import { useEffect, useState } from 'react';
import moment from 'moment';

interface WeekInfo {
  date: string;
  availTimes: string[];
  bookedTimes: string[];
}

const getWholeWeek = (available: { start: string, end: string }[]) => {
  const week = new Array(7).fill(null);
  const targetDate = new Date(available[0].start.split('T')[0]); //get date object from an available date
  const firstDate = new Date(moment(targetDate).subtract(targetDate.getDay(), 'days').calendar()); //calculate first date of the week
  return week.map((day, index) => moment(firstDate).add(index, 'days').format('YYYY-MM-DD')) //get all dates of the week
}

const getTimesIn30Mins = (dateArg: string, timeFramesArray: { start: string, end: string }[]) => {
  const times: string[] = []
  timeFramesArray.forEach(({ start, end }) => {
    const date = start.split('T')[0];
    if (date === dateArg) {
      let startTime = moment(start);
      const endTime = moment(end);
      while (startTime.format('HH-mm') !== endTime.format('HH-mm')) {
        times.push(startTime.format('HH-mm'));
        startTime = startTime.add(30, 'minutes');
      }
    }
  })
  return times;
}

const App = () => {
  const [week, setWeek] = useState<WeekInfo[]>();

  useEffect(() => {
    const week = getWholeWeek(available);
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

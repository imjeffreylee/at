import { reorderTimeFrames, transformDay } from '../../util/tools';
import './Day.css'

interface Props {
  day: number;
  date: string;
  availTimes: string[];
  bookedTimes: string[];
}

const Day = ({ day, date, availTimes, bookedTimes }: Props) => {
  const newTimeFrames = reorderTimeFrames(availTimes, bookedTimes);
  const formattedAvailTimes = availTimes.map(time => time.replace('-', ':'))

  return (
    <div className="calendar__body__day">
      <div className={
        availTimes.length > 0
          ? "calendar__body__day__top-bar avail-day"
          : "calendar__body__day__top-bar"
      }
      ></div>
      <div className="calendar__body__day__date">
        <div>{transformDay(day)}</div>
        <div>{date.split('/')[2]}</div>
      </div>
      <div className="calendar__body__day__time-frame">
        {newTimeFrames.map((timeFrame) => (
          <div
            key={timeFrame}
            className={
              formattedAvailTimes.includes(timeFrame)
                ? "calendar__body__day__time avaiable"
                : "calendar__body__day__time"
            }
          >
            {timeFrame}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Day

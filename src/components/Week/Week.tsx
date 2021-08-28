import Day from '../Day/Day';
import './Week.css';

interface Props {
  info: {
    date: string;
    availTimes: string[];
    bookedTimes: string[];
  }[]
}

const Week = ({ info }: Props) => {
  return (
    <div className="calendar__body__week">
      {
        info && info.map(({ date, availTimes, bookedTimes }, index) => (
          <Day
            key={date}
            day={index}
            date={date}
            availTimes={availTimes}
            bookedTimes={bookedTimes}
          />
        ))
      }
    </div>
  )
}

export default Week

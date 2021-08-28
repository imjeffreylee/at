import './Day.css'

interface Props {
  day: number;
  date: string;
  availTimes: string[];
  bookedTimes: string[];
}

const transformDay = (day: number) => {
  switch (day) {
    case 0:
      return '日';
    case 1:
      return '一';
    case 2:
      return '二';
    case 3:
      return '三';
    case 4:
      return '四';
    case 5:
      return '五';
    case 6:
      return '六';
    default:
      return '';
  }
}


const reorderTimeFrames = (avail: string[], booked: string[]) => {
  const newAvail = avail.map((time: string) => parseInt(time.replace('-', '')));
  const newBooked = booked.map((time: string) => parseInt(time.replace('-', '')));
  const result = newAvail.concat(newBooked).sort((a, b) => a - b).map((time) => time.toString().split(''))
  result.forEach(time => time.splice(2, 0, ':'))
  return result.map((time) => time.join(''));
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
        {newTimeFrames.map((timeFrame, i) => (
          <div
            key={i}
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

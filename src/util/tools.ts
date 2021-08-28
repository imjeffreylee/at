import moment from 'moment';

export const getWholeWeek = (available: { start: string, end: string }[]) => {
  const week = new Array(7).fill(null);
  const targetDate = new Date(available[0].start.split('T')[0]); //get date object from an available date
  const firstDate = new Date(moment(targetDate).subtract(targetDate.getDay(), 'days').calendar()); //calculate first date of the week
  return week.map((day, index) => moment(firstDate).add(index, 'days').format('YYYY-MM-DD')) //get all dates of the week
}

export const getTimesIn30Mins = (dateArg: string, timeFramesArray: { start: string, end: string }[]) => {
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

export const transformDay = (day: number) => {
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

export const reorderTimeFrames = (avail: string[], booked: string[]) => {
  const newAvail = avail.map((time: string) => parseInt(time.replace('-', '')));
  const newBooked = booked.map((time: string) => parseInt(time.replace('-', '')));
  const result = newAvail.concat(newBooked).sort((a, b) => a - b).map((time) => time.toString().split(''))
  result.forEach(time => time.splice(2, 0, ':'))
  return result.map((time) => time.join(''));
}
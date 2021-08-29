import moment from 'moment';

export const getWholeWeek = (booked: { start: string, end: string }[]) => {
  const week = new Array(7).fill(null);
  const targetDate = new Date(booked[0].start.split('T')[0]); //get date object from an booked date
  const firstDate = new Date(moment(targetDate).subtract(targetDate.getDay(), 'days').calendar()); //calculate first date of the week
  return week.map((day, index) => moment(firstDate).add(index, 'days').format('YYYY-MM-DD')) //get all dates of the week
}

export const getTimesIn30Mins = (dateArg: string, timeFramesArray: { start: string, end: string }[]) => {
  const times: string[] = []
  timeFramesArray.forEach(({ start, end }) => {
    const date = start.split('T')[0]; //get the date
    if (date === dateArg) {
      let startTime = moment(start);
      const endTime = moment(end);
      while (startTime.format('HH-mm') !== endTime.format('HH-mm')) {
        times.push(startTime.format('HH-mm'));
        startTime = startTime.add(30, 'minutes');
      } //add 30 mins to start time till it hits end time
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
  return avail.concat(booked).sort().map((time) => time.replace('-', ':'))
} //combine and sort available and booked times
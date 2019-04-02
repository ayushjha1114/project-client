import moment from 'moment';

export function getDateFormatted(date) {
  return moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a');
}

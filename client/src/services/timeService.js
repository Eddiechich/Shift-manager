export const getDate = timeStamp => {
  let InitialDate = new Date(timeStamp);
  let date = InitialDate.getDate();
  let month = InitialDate.getMonth() + 1;
  let year = InitialDate.getYear() + 1900;
  let hr = InitialDate.getHours();
  let min = InitialDate.getMinutes();
  let sec = InitialDate.getSeconds();

  if (date < 10) date = "0" + date;
  if (month < 10) month = "0" + month;

  if (hr < 10) hr = "0" + hr;
  if (min < 10) min = "0" + min;
  if (sec < 10) sec = "0" + sec;

  const postTime = `${date}/${month}/${year} | ${hr}:${min} `;
  return postTime;
};

export const addHours= (time, hours)=> {
  const [hour, minute] = time.split(":");
  const date = new Date();
  date.setHours(date.getHours() + hours);
  return `${date.getHours()}:${minute}`;
}
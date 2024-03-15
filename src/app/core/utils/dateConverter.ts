 export const dateConverter=(dateString: string, timeString :string)=>{

    console.log("date",dateString);
    console.log("time",timeString);

    
    // Split the date and time string to get day, month, year, hours, and minutes
    var [year, month, day] = dateString.split('-');
    var [hours, minutes] = timeString.split(':');
    const newYear = parseInt(year);
    const newDay = parseInt(day);
    const newHour = parseInt(hours);
    const newMinutes = parseInt(minutes);
    // Months are 0-based in JavaScript, so subtract 1 from the month
    var monthIndex = parseInt(month) - 1;
    
  
    var dateObject = new Date(newYear, monthIndex, newDay, newHour, newMinutes);
    
    return dateObject;

 }
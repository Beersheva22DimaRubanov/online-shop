

export function getISODateStr(date){
    return date.toISOString().substring(0, 10);
}

export function getEndDate (startDateStr, days){
    const date = new Date(startDateStr);
    const endDate = new Date (date.setDate(date.getDate() + +days));
    return getISODateStr(endDate);
}

export function daysBetweenDates(startDate, endDate){
   return (Date.parse(startDate) - Date.parse(endDate))/60/60/24/1000;
}
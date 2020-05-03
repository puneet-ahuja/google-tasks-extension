// TODO : P5 : Can update this logic or search for own logic.
/**
 * Function to convert ISO Date string to JS Date Object
 * @param {ISO Date string} s 
 */
export const parseISOString = s => {
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

/**
 * Function to convert JS Date Object to DD-MM-YYYY format
 * @param {JS Date Object} date 
 */
export const formatDate = date => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [ day, month, year ].join('-');
}
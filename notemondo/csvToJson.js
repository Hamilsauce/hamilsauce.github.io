//const fs = require('fs');
/*
export const songData =
  `ID,songTitle,Plays,likes,Duration,Published,Comments
1,Battle Star,12,4,02:45,4 days ago,3
3,The Gypsy,12,5,08:00,6 years ago,0
4,A Moaner's Chain Gang,51,2,02:18,18 days ago,2`;

*/
export const csvToJson = (input, delimiter) => {

  const csvToObjs = source => {
    let records = [];
    let colNames;
    let csv = source.split('\n');
    let delim = '';
    
    if (delimiter === 'tab') {
     delim = '  ';
    }
    else {
      delim = ',';
    }
    colNames = csv.shift().trim().split(delim);
    csv.forEach(row => {
      let newRecord = {};
 

      records.push(setData(colNames, row.split(delim), newRecord));
    });
       console.log('records: ')
       console.log(records)
    return records;
  }

  const setData = (names, data, newRec) => {
    let i = 0;

    data.forEach(d => {
      newRec[names[i]] = d;
      i++;
    });
    return newRec;
  }

  return csvToObjs(input, delimiter)
}



{ csvToJson }


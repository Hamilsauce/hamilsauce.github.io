
// * Need to add details, documentation !! - 12.21.19

export const csvToJson = (input, delimiter = 'comma') => {

  const csvToObjs = source => {
    let records = [];
    let colNames;
    let csv = source.split('\n');
    let delim = '';

    if (delimiter === 'tab') {
      delim = '  ';
    } else if (delimiter === 'space') {
      delim = ' ';
    } else if (delimiter === 'comma') {
      delim = ',';
    }
    colNames = csv.shift().trim().split(delim);
    csv.forEach(row => {
      let newRecord = {};
      records.push(setData(colNames, row.split(delim), newRecord));
    });
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

{
  csvToJson
}
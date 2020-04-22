 const fileFactory = (filename, ext, fileContent) => {
  const fileTypeKey = {
   txt: 'text/plain;charset=utf-8',
   CSV: 'text/csv;charset=utf-8',
   js: 'text/javascript',
   json: '	application/json',
   html: 'text/html;charset=utf-8',
   getFileType(ext) {
    let fileType = Object.entries(this)
     .find(([prop, val]) => {
      if (prop === ext.substr(1).trim().toLowerCase()) {
       return val
      }
     })
    return fileType;
   }
  }

  let blobName = `${filename}${ext}`
  let file = new Blob([fileContent], { type: fileTypeKey.getFileType(ext) });

  return {
   file: file,
   filename: blobName
  }
 }
 document.querySelector('#btn-save').addEventListener('click', e => {
  e.preventDefault();
  const urlInput = document.querySelector('#urlAddress');
  const fileUrl = document.querySelector('#urlAddress').value;

  if (fileUrl.trim().length !== 0) {
   try {
    saveFromUrl(fileUrl);
   } catch (e) {
    let errorMsg = e.name + ': ' + e.message;
    alert(errorMsg);
    return
   }
  } else {
   try {
    saveFile();
   } catch (e) {
    let errorMsg = e.name + ': ' + e.message;
    alert(errorMsg);
    return
   }
  }
 })

 const saveFile = () => {
  const fileNameInput = document.querySelector('#input-fileName');
  const fileContentInput = document.querySelector('#textarea');
  const fileTypeInput = document.querySelector('#fileTypeInput');

  let fileContent = fileContentInput.value;
  let filename = fileNameInput.value;
  let fileType = fileTypeInput.value;

  const newFile = fileFactory(filename, fileType, fileContent);
  saveAs(newFile.file, newFile.filename)
 }

 const saveFromUrl = (url) => {
  const fileParts = getFileParts(url);

  if (fileParts.fileExtension == '.txt') {
   fetch(url)
    .then(res => res.text())
    .then(data => {
     const fileContent = data;
     console.log(fileContent);
    })
    .catch(err => {
     console.log(err);
     fileParts.fileContent = fileContent;

     const newFile = fileFactory(fileParts.filename, fileParts.fileExtension, fileParts.fileContent)
     saveAs(newFile.file, newFile.filename)
    });
  } else if (fileParts.fileExtension == '.json') {
   fetch(url)
    .then(res => res.json())
    .then(data => {
     const fileContent = data;
     console.log(fileContent);
    })
    .catch(err => {
     console.log(err);
     fileParts.fileContent = fileContent;

     const newFile = fileFactory(fileParts.filename, fileParts.fileExtension, fileParts.fileContent)
     saveAs(newFile.file, newFile.filename)
    });
  }

 }


 fileParts.fileContent = fileContent;

 const newFile = fileFactory(fileParts.filename, fileParts.fileExtension, fileParts.fileContent)
 saveAs(newFile.file, newFile.filename)







 // const fileContent = JSON.stringify(data);
 // const fileContent = JSON.stringify(data, null, 2);
 // const fileParts = getFileParts(url);
 // fileParts.fileContent = fileContent;







 const getFileParts = url => {
  let [fileName, ext] = url.substr(url.lastIndexOf("/") + 1).split('.');
  let fileExt = '.'.concat(ext);
  return {
   filename: fileName,
   fileExtension: fileExt
  }
 }
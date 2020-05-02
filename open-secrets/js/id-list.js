const polModel = [
  {
    Id: 1,
    CID: "N00036633",
    LastName: "Abraham",
    FirstName: "Ralph",
    Party: "R",
    Office: "LA05",
    FECCandID: "H4LA05221"
  }
 ]
 const endpoint = '../data/pols-ids.json'
// const fetchPolsList = async
 
fetchSecrets = async (url) => {
   const res = await fetch(url);
 
   if (res.status == 200) { //This checks the response for success, and if so, jumps straight to getting json from promise
     let resultData = await res.json()
    // data = 
    return resultData;
     
   } else {
     throw new Error(res.status);
   }
 }
 
console.log(fetchSecrets(url))
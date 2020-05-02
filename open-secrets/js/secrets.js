//  sample queryString: `https://www.opensecrets.org/api/?method=candIndustry&cid=N00007360&cycle=2020&apikey=__apikey__`
let data = undefined;

const query = {
  baseUrl: 'https://www.opensecrets.org/api/',
  method: 'candIndustry',
  cid: 'N00007360',
  cycle: '2020',
  apikey: 'f7f0d2ef3a3a39bf0816523af406df39',
  output: 'json',
  constructString() {
    const qstring = `${this.baseUrl}?method=${this.method}&cid=${this.cid}&cycle=${this.cycle}&apikey=${this.apikey}&output=${this.output}`;
    return qstring;
  }
}

async function fetchSecrets(url) {
 const res = await fetch(url);
 
 if (res.status == 200) {  //This checks the response for success, and if so, jumps straight to getting json from promise
   let resultData = await res.json()
   data = resultData;
 } else {
   throw new Error(res.status);
 }
}

fetchSecrets(query.constructString()).catch(alert)
console.log('data');
console.log(data);
// console.log(fetchSecrets(query.constructString()).catch(alert))

const getResultData = (var1, var2) => {
  var1 = var2;
}

setTimeout(() => {
  console.log('data');
  console.log(Object.values(data.response)[0]);
}, 1000)
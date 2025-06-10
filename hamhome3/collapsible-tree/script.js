// import fsService from '/firebase/FirestoreService.js'
const ROOTID = '8y17ynkbytusbghytq'
const FOLDERID = '4gyouqykssyd2uuego'
// const root = await fsService.folders.doc(FOLDERID).get()
// const rootData = root.data()
// console.log('rootData', rootData)
// const fsService = new FirestoreService()
const data = await (await fetch('./data/homedb-tree.json')).json();
const data2 = await (await fetch('./data/homedb-tree-clean.json')).json()
const singleFolder = await (await fetch('./data/single-folder.json')).json();
const singleFolder2 = await (await fetch('./data/folder-no-empty-children.json')).json();

let tree = data;
let tree2 = data2;
let node = singleFolder;
let chil = node.children
console.log('node', node)

const vaultPath = ['8y17ynkbytusbghytq','6q21ek5q7pojsgyxqcy']

const fstree = document.querySelector('collapsible-tree');
console.log('fstree', {fstree})
// fstree.fsService = fsService
// fstree.data = data
// const foldy = singleFolder2
const foldy = tree.children['jyo7pgdhxyk2tqycs1q']//.children['yrq8y5xncznjyg7kms3']
// const foldy2 = tree2.children['jyo7pgdhxyk2tqycs1q']//.children['yrq8y5xncznjyg7kms3']
// console.log('foldy', foldy)
fstree.data =foldy//[ROOTID]
    // console.log('fstree', {fstree})

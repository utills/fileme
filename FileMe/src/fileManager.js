var RNFS = require('react-native-fs');


module.exports.removeUserLocation = ()=>{

}

module.exports.createFile = (fileName,path,callback)=>{
  const directory = (path && path != "") ? path : "file://"+ RNFS.DocumentDirectoryPath
  var filePath = directory + "/" +fileName;
  RNFS.writeFile(filePath, 'Lorem ipsum dolor sit amet', 'utf8')
  .then((success) => {
    console.log('FILE WRITTEN!');
    callback(true);
  })
  .catch((err) => {
    console.log('createFile ERROR ',err);
    callback(false,err);
  });
}


module.exports.readDirectory=(path,callback)=>{
    // get a list of files and directories in the main bundle
RNFS.readDir((path && path != "") ? path : RNFS.DocumentDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
.then((result) => {
  console.log('GOT RESULT', result);
  if(result && result.length>0){
    callback(result);
  }else{
    callback([]);
  }
})
.then((statResult) => {
  // if (statResult && statResult[0].isFile()) {
  //   callback(RNFS.readFile(statResult[1], 'utf8'));
  // }else{
  //   callback([]);
  // }
})
.then((contents) => {
  console.log(contents);
  //callback([]);
})
.catch((err) => {
  console.log(err.message, err.code);
  //callback([]);
});
}
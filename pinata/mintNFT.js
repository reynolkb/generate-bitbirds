import { pinFileToIPFS, pinJSONToIPFS } from "./pinata.js";
var fs = require('fs');

var imageFolder = '../bird_images'
var imgArr = []

fs.readdir(imageFolder, function (err, files) {
  files.forEach(function (file) {
    imgArr.push(file)
  })
  console.log(imgArr)
})

require('dotenv').config();
const key = process.env.REACT_APP_PINATA_KEY;
const secret = process.env.REACT_APP_PINATA_SECRET;
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const { create } = require('combined-stream');
const { time } = require('console');

var imageFolder = '../one_image/'
var imageIPFSUrl = []

// string with path to image
// var imagePath = '../one_image/0.png'

async function pinFileToIPFS(image) {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  let data = new FormData();
  data.append('file', fs.createReadStream(image));
  return axios.post(url,
    data,
    {
      headers: {
        'Content-Type': `multipart/form-data; boundary= ${data._boundary}`,
        'pinata_api_key': key,
        'pinata_secret_api_key': secret
      }
    }
    ).then(function (response) {
      return ("https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash)
    }).catch(function (error) {
      return (error)
    });
};

async function createTxtFile() {
  try {
    var files = await fs.promises.readdir(imageFolder)
    for (var file of files) {
      fullFilePath = '../one_image/' + file
      var url = await pinFileToIPFS(fullFilePath)
      console.log(url)
      await timeout(5000)
      console.log('5 seconds has passed')

      var metadata = new Object();
      metadata = {
        pinataMetadata: {
          name: `Metadata-${file}`,
        },
        pinataContent: {
          name: file,
          image: url
        }
      }
      // metadata.name = file;
      // metadata.image = url;

      var pinataResponse = await pinJSONToIPFS(metadata);
      var tokenURI = pinataResponse.pinataUrl;
      imageIPFSUrl.push(tokenURI)
    }
    await fs.promises.writeFile('IPFSarray.txt', JSON.stringify(imageIPFSUrl))
    console.log('Saved!')
  }
  catch (err) {
    console.log(err)
  }
}

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function pinJSONToIPFS(JSONBody) {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  return axios
  .post(url, JSONBody, {
    headers: {
      pinata_api_key: key,
      pinata_secret_api_key: secret,
    }
  })
  .then(function (response) {
    return {
      success: true,
      pinataUrl: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
    };
  })
  .catch(function (error) {
    console.log(error)
    return {
      success: false,
      message: error.message,
    }
    
  });
};

createTxtFile()
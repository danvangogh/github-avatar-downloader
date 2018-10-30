var request = require('request');
var token = require('./secrets.js');
var fs = require('fs');
// var url = process.argv[2];
// var filePath = process.argv[3];

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + token.GITHUB_TOKEN
    }
  };
  if (!process.argv[2] || !process.argv[3]) {
    console.log("gimme more info!!!");
    return
  }

  request(options, cb);
}

getRepoContributors("jquery", "jquery", function(error, response) {
  var contributors = JSON.parse(response.body);

  contributors.forEach(function (contributor) {
    console.log(contributor.avatar_url);
    downloadImageByURL(process.argv[2], process.argv[3]);
  })
});




function downloadImageByURL(url, filePath) {

request.get(url)               // Note 1
       .on('error', function (err) {                                   // Note 2
         throw err;
       })
       .on('response', function (response) {                           // Note 3
         console.log('Response Status Code: ', response.statusCode);
       })
       .pipe(fs.createWriteStream(filePath));               // Note 4
};

// downloadImageByURL('https://avatars2.githubusercontent.com/u/2741?v=3&s=466', 'avatars/kvirani.jpg');
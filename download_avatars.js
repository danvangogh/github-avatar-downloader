var request = require('request');
var token = require('./secrets.js');
var fs = require('fs');

function getRepoContributors(repoOwner, repoName, handleResponse) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + token.GITHUB_TOKEN
    }
  };

  request(options, handleResponse);
}

getRepoContributors("jquery", "jquery", function(error, response) {
  var contributors = JSON.parse(response.body);

  contributors.forEach(function (contributor) {
    console.log(contributor.avatar_url);
  })
});

function downloadImageByURL(url, filePath) {

request.get(url)               // Note 1
       .on('error', function (error) {                                   // Note 2
         throw err;
       })
       .on('response', function (response) {                           // Note 3
         console.log('Response Status Code: ', response.statusCode);
       })
       .pipe(fs.createWriteStream(filePath));               // Note 4
};

downloadImageByURL('https://avatars2.githubusercontent.com/u/2741?v=3&s=466', 'avatars/kvirani.jpg');
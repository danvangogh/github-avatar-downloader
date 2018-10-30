var request = require('request');
var token = require('./secrets.js');

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

/**
 * Author: Shibin George
 *         B.Tech CSE(4/4), Class of 2015
 *         National Institute of Technology, Warangal
 **/

function getData(callback, errorCallback) {
  var searchUrl = 'http://codeforces.com/api/contest.list?gym=false';
  var x = new XMLHttpRequest();
  x.open('GET', searchUrl);
  // The CodeForces API responds with JSON, so let Chrome parse it.
  x.responseType = 'json'
  x.onload = function() {
    // Parse and process the response from Google Image Search.
    //console.log(response);
    var response = x.response;
    renderStatus(response.result.length);
    if (!response || !response.result ||
        response.result.length === 0) {
      errorCallback('No response from Codeforces API !');
      return;
    }
    var results = response.result;
    var upcomingContests = "Upcoming Codeforces regular contests:\n";
    for(i=0;i<results.length;i++){
      if(results[i].phase==="BEFORE"){
        upcomingContests += (i+1) + ")\t"+ "Contest id:\t" + results[i].id;
        upcomingContests += "\n\t" + "Contest name:\t" + results[i].name;
        var start = results[i].relativeTimeSeconds * (-1);
        //start += 9000;  //to Indian Standard Time
        var days = 0;

        var hours = Math.floor(start/3600);
        days = Math.floor(hours/24);

        var minutes = Math.floor((start - (hours*3600))/60);
        if(days==0){
          upcomingContests += "\n\t" + "Starts in:\t\t" + hours + " hours, " + minutes + " minutes.";
          upcomingContests += "\n\n";
        } else {
          hours -= days*24; 
          upcomingContests += "\n\t" + "Starts in:\t\t" + days + " days, " + hours + " hours, " + minutes + " minutes.";
          upcomingContests += "\n\n";
        }
        
      } else {
        break;
      }
    }
    renderStatus(upcomingContests);
  };
  x.onerror = function() {
    errorCallback('Network error.');
  };
  x.send();
}

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

document.addEventListener('DOMContentLoaded', function() {
  
    renderStatus('Crunching the data for you...');

    getData({

      //renderStatus('Search term: ' + url + '\n' +
      //    'Google image search result: ' + imageUrl);
      

    }, function(errorMessage) {
      renderStatus('Cannot display results: ' + errorMessage);
    });
  });

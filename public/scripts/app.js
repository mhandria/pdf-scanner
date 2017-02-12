

//event listner to execute a function when
//window has loaded
window.onload = function () {
  var obj, events;
  //execute resfresh method when window has loaded
  refresh();
};

//refresh method will do an asynchronous http get request
function refresh(){

  //call httpGetAsync method
  httpGetAsync("http://localhost:3000/array", function(responseText){

    //parse the incoming
    obj = JSON.parse(responseText);
    console.log(obj);
    events = find();

    for(let i = 0; i < events.length; i++){
      if(events[i])
       document.getElementById("info-table").innerHTML =  document.getElementById("info-table").innerHTML+ "<tr> <td>"+ events[i] + "</td> <td>" + events[++i] +"</td> </tr >";
    }
  })
}

//http Get asynchronously method.
function httpGetAsync(theUrl, callback){

  //set a new XML Http request variable
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
      callback(xhr.responseText);
    }
  }
  xhr.open("GET", theUrl, true);
  xhr.send(null);
}

function find() {
  var events = new Array();
  for(var i = 0; i < obj.length; i++) {
    // We have found a date
    if(isDate(obj[i])) {
      // Save it in the correct format
      var monthDay = obj[i].split("/");
      for(var j = 0; j < 2; j++)
        if(monthDay[j].length == 1) monthDay[j] = 0 + "" + monthDay[j];
      var date = monthDay[0] + "/" + monthDay[1] + "/" + new Date().getFullYear();
      events[events.length] = date;

      // Write everything after the date
      var text = "";
      i++;
      while(!isDate(obj[i+1]) && !isDate(obj[i]) && i < obj.length) {
        if(obj[i] === "----------------Page") i+=3;
        text = text + obj[i] + " ";
        i++;
      }

      if(!text) events[events.length] = "-";
      else events[events.length] = text;
    }
  }
  return events;
}

function isDate(str) {
  return containsRegex(str, /^\d{1}\/\d{1}/) || containsRegex(str, /^\d{1}\/\d{2}/) || containsRegex(str, /^\d{2}\/\d{1}/) || containsRegex(str, /^\d{2}\/\d{2}/);
}

function containsRegex(str, regex) {
  if(str && str.search(regex) > -1) return true;
  return false;
}


window.onload = function () {
  console.log("hello");
  refresh();
};

function refresh(){
  httpGetAsync("http://localhost:3000/array", function(responseText){
    var obj = JSON.parse(responseText);
    console.log(obj);
    console.log(obj.length);

    for(let i = 0; i < obj.length; i++){
       document.getElementById("text-content").innerHTML =  document.getElementById("text-content").innerHTML + "<br>" + obj[i];
    }
  })
}

function httpGetAsync(theUrl, callback){
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function(){
    console.log(xmlHttp.readyState);
    console.log(xmlHttp.status);
    if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
      callback(xmlHttp.responseText);
    }
  }
  xmlHttp.open("GET", theUrl, true);
  xmlHttp.send(null);
}

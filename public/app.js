

//event listner to execute a function when
//window has loaded
window.onload = function () {
  //execute resfresh method when window has loaded
  refresh();
};

//refresh method will do an asynchronous http get request
function refresh(){

  //call httpGetAsync method
  httpGetAsync("http://localhost:3000/array", function(responseText){
    var obj = JSON.parse(responseText);
    console.log(obj);
    console.log(obj.length);

    for(let i = 0; i < obj.length; i++){
       document.getElementById("text-content").innerHTML =  document.getElementById("text-content").innerHTML + "<br>" + obj[i];
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

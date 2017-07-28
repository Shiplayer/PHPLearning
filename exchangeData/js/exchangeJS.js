var responseT = "";

function callback(text){
    responseT = text;
    var response = document.getElementsByClassName("response")[0];
    if(text !== null) {
        var line = "";
        var result = JSON.parse(text);
        if(result === null) {
            response.innerHTML = "successful";
            return;
        }
        console.log("length: " + result.length);
        result.forEach(function(n){
            line += n.lastname + " " + n.firstname + ", " + n.age + " лет.<br/>"
        });
        response.innerHTML = line;

    }

}

function callbackUnauthorized(text){
    console.log(text);
}

function submitButton(){
    console.log("submit");
    var user = document.getElementById("user");
    var password = document.getElementById("password");
    var textField = document.getElementById("textField");
    var url = "dbexchange.php?query=" + encodeURI(textField.value) + "&user=" + encodeURI(user.value) + "&password=" + encodeURI(password.value);
    var xmlHTTP = new XMLHttpRequest();
    xmlHTTP.onreadystatechange = function() {
        console.log(xmlHTTP.status);
        if (xmlHTTP.readyState === 4 && xmlHTTP.status === 200) {
            callback(xmlHTTP.responseText)
        }
        if(xmlHTTP.readyState === 4 && xmlHTTP.status === 401) {
            callbackUnauthorized(xmlHTTP.responseText);
        }
    };
    xmlHTTP.open("GET", url, true);
    xmlHTTP.send(null);
}

window.onload = function(url, callback){

};
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

function submitButton(){
    console.log("submit");
    var user = document.getElementById("user");
    var password = document.getElementById("password");
    var textField = document.getElementById("textField");
    var url = "dbexchange.php?query=" + encodeURI(textField.value) + "&user=" + encodeURI(user.value) + "&password=" + encodeURI(password.value);
    var xmlHTTP = new XMLHttpRequest();
    xmlHTTP.onreadystatechange = function() {
        if (xmlHTTP.readyState === 4 && xmlHTTP.status === 200) {
            callback(xmlHTTP.responseText)
        }
    };
    xmlHTTP.open("GET", url, true);
    xmlHTTP.send(null);
}

window.onload = function(url, callback){

};
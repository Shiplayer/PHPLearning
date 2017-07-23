function callback(text){
    var response = document.getElementsByClassName("response")[0];
    if(text !== null) {
        var result = JSON.parse(text);
        if(result === null) {
            response.innerHTML = "successful";
            return;
        }
        console.log("length: " + result.length);
        var line  = "";
        for(var a in result)
            line += result[a] + ';'
        response.innerHTML = line;

    }

}

function submitButton(){
    console.log("submit");
    var textField = document.getElementById("textField");
    var url = "dbexchange.php?query=" + encodeURI(textField.value);
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
function emailValid(){
    let mail = document.getElementsById("mail");
    const pattern = "/^[^\s@]+@[^\s@]+\.[^\s@]+$ ";
    return pattern.test(mail) ;
}

function nameRequired(){
    let name = document.getElementsById("Name");
    if (name == "") {
        alert("Name must be filled out");
        return false;
    } 
}

function phnoValid(){
    let ph = document.getElementsById("phno");
    if (length(ph) == 10) {
        return true;
    }
    else{
        alert("The Phone Number Should be 10 Digits");
    } 
}
function dateValid(){
    let dt = new Date(document.getElementsById("date"));
    let today = new Date();
    if (dt > today) {
        return true;
    }
    else{
        alert("The Date Should be After today");
    } 
}
function bookNow(){
    var Form = document.getElementById("Form");
    Form.display.style = "block";
}
export function validator(credentials){

    const email = credentials.userEmail;
    const password = credentials.userPassword;
    const PIN = credentials.userPIN;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const pinRegex = /^\d{5}-[a-zA-Z]{2,}-\d{3}$/

    function isPositiveIntegerRegex(str) {
        return /^\d+$/.test(str.trim());
    }

    if(email==""||password==""||PIN==""){
        return "Enter all the details";
        
    }
    else if(!emailRegex.test(email)){
        return "Enter the valid email !";
       
    }
    else if(password.length!=6){
        return "Password must be six digits";
        
    }
    else if(!pinRegex.test(PIN)){
        return "Enter the valid PIN";
    }
    else if(!isPositiveIntegerRegex(password)){
        return "Password must be 6 digits";
    }
    else {
        return "";
    }

}
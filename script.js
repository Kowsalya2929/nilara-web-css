
        //signUp

        function signUp(event){
    
            event.preventDefault()

            let v1 = document.getElementById("name").value;
            let v2 = document.getElementById("email").value;
            let v3 = document.getElementById("number").value;
            let v4 = document.getElementById("password").value;
            let v5 = document.getElementById("cpassword").value;

            let e1 = document.getElementById("usernameError");
            let e2 = document.getElementById("emailError");
            let e3 = document.getElementById("numError");
            let e4 = document.getElementById("passError");
            let e5 = document.getElementById("cpassError");

            
            let hasError = false;
        
            if(v1 === ""){
                e1.innerText = "Fill name";
                hasError = true;   
            }else{
                e1.innerText = "";
            }

            if(v2 === ""){
                e2.innerText = "Fill email";
                hasError = true;
            }else if(!/^[A-Za-z0-9]{2,}[@][A-Za-z]{2,}[.][A-Za-z]{2,}$/.test(v2.trim())){
                e2.innerText = "Email give properly";
                hasError = true;
            }else{
                e2.innerText = "";
            }

            if(v3 === ""){
                e3.innerText = "Fill number";
                hasError = true;
            }else if(!/^[0-9]{10,15}$/.test(v3.trim())){
                e3.innerText = "At least 8 number";
                hasError = true;
            }else{
                e3.innerText = "";
            }

            if(v4 === ""){
                e4.innerText = "Fill password";
                hasError = true;
            }else if(!/^[A-Za-z0-9!@#$%^&~*]{8,}$/.test(v4.trim())){
                e4.innerText = "Please provide strong password use special charcter(~!@#$%^&*) with (0-9)(A-Z)(a-z)";
                hasError = true;
            }else{
                e4.innerText = "";
            }

            if(v5 === ""){
                e5.innerText = "Fill Correct password";
                hasError = true;
            }else if(v5 !== v4){
                e5.innerText = "Password doesn't match";
                hasError = true;
            }else{
                e5.innerText = "";
            }

            if(hasError){
                alert("Fill All Details");
            }else{
                let userData = {
                    name : v1,email : v2, number : v3, password: v4, cpassword: v5
                }

                localStorage.setItem("User",JSON.stringify(userData) )

                console.log(JSON.parse(localStorage.getItem("User")))

                alert("Your application success");
                window.location.href = "index.html";
            }
        }

        //SignIn

        function signIn(event){
            
            event.preventDefault()

            let v1 = document.getElementById("email").value;
            let v2 = document.getElementById("pass").value;

            let e1 = document.getElementById("email_error");
            let e2 = document.getElementById("pass_error");
            let e3 = document.getElementById("error");

            let storeData = JSON.parse(localStorage.getItem("User"))

            let hasError = false;

            if(v1 === ""){
                e1.innerText = "Fill email";
                hasError = true;
            }else if(v1 !== storeData.email){
                e1.innerText = "Email doesn't match";
                hasError = true;
            }else{
                e1.innerText = "";
            }            

            if(v1 === ""){
                e2.innerText = "Fill password";
                hasError = true;
            }else if(v2 !== storeData.password){
                e2.innerText = "Password doesn't match";
                hasError = true;
            }else{
                e2.innerText = "";
            }
            

            if(hasError){
                alert("Fill all details")
            }else{
                alert("Sign In successful")
                window.location.href = "index.html";
            }
        }

        //send otp to email for forget password


        function sendEmail(event){

            event.preventDefault();

            let storeData = JSON.parse(localStorage.getItem("User"))

            let v1 = document.getElementById("email").value;
            let e1 = document.getElementById("err")

            const otp = Math.floor(100000 + Math.random() * 900000);
            const now = new Date();
            const expiry = new Date(now.getTime() + 5 * 60000).toLocaleTimeString()

            hasError = false;

            if(v1 == ""){
                e1.innerText = "Fill email";
                hasError = true;
            }else if(v1 != storeData.email){
                e1.innerText = "Email doesn't exits please login";
                hasError = true;
            }else{
                e1.innerText = "";
            }

            const template_params = {
                passcode: otp,
                time: expiry,
                email: v1,
            }

            emailjs.send("service_tjmnu5p","template_1nd086p",template_params)
            .then((res) => {
                console.log(res)
                alert("OTP Sended Successfully to " + v1)
                localStorage.setItem("Otp",otp)
                localStorage.setItem("email",v1)
                window.location.href = "forgetverifyEmail.html";
                
            }).catch((err) => {
                alert("Failed to send email" + JSON.stringify(err))
            });

            if(hasError){
                console.log("error in email submision")
                return;
            }
                
        }

        //change password
        
        function verifyEmail(event){

            let v1 = document.getElementById("np").value;
            let v2 = document.getElementById("ncp").value;
            let in1 = document.getElementById("in1").value;
            let in2 = document.getElementById("in2").value;
            let in3 = document.getElementById("in3").value;
            let in4 = document.getElementById("in4").value;
            let in5 = document.getElementById("in5").value;
            let in6 = document.getElementById("in6").value;

            let e1 = document.getElementById("otp_error");
            let e2 = document.getElementById("pass_error");
            let e3 = document.getElementById("cpass_error");

            event.preventDefault();

            hasError = false;

            if(in1 == "" || in2 == "" || in3 == "" || in4 == "" || in5 == "" || in6 == ""){
                e1.innerText = "Fill OTP";
                hasError = true;
            }else{
                e1.innerText = "";
            }

            if(v1 == ""){
                e2.innerText = "Fill New Password"
                hasError = true;
            }else if(!/^[A-Za-z0-9~!@#$%^&*]{8,}$/.test(v1)){
                e2.innerText = "Give Strong password like (A-Za-z0-9~!@#$%^&*)"
                hasError = true;
            }else {
                e2.innerText = "";
            }

            if(v2 == ""){
                e3.innerText = "Fill New Correct Password";
                hasError = true;
            }else if(v2 !== v1){
                e3.innerText = "Password doesn't match";
                hasError = true;
            }else{
                e3.innerText = "";
            }


            if(hasError){
                alert("Fill All Details");
            }else{
                let storeData = JSON.parse(localStorage.getItem("User"))
                storeData.password = v1;
                storeData.cpassword = v2;
                localStorage.setItem("User",JSON.stringify(storeData))
                alert("Your password changed successfully");
                window.location.href = "index.html";
            }            
        }

        //contact us

        function QuesAns(event){

            event.preventDefault();

            let v1 = document.getElementById("cname").value;
            let v2 = document.getElementById("cemail").value;
            let v3 = document.getElementById("ctitle").value;
            let v4 = document.getElementById("cmsg").value;

            const template_params = {
                title: v3,
                name: v1,
                message: v4,
                email: v2,
            }

            emailjs.send("service_tjmnu5p","template_qb31lpc",template_params)
            .then((res)=>{
                console.log(res)
                alert("Your Message sended successfully! "  + v1)
                v1.innerText = "";
                v2.innerText = "";
                v3.innerText = "";
                v4.innerText = "";
            }).catch((err) => {
                alert("Failed to send email" + JSON.stringify(err))
            });
        }

        
let submitButton  = document.querySelector(".formbtn");
submitButton.addEventListener("click", function(e){
    e.preventDefault();
    let name = document.querySelector("#name").value;
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
    let confirmPassword = document.querySelector("#confirm-password").value;
    clear();
    // if any of the input field is empty then show error message for 2 second
    if(name == "" || email == "" || password == "" || confirmPassword == ""){
        errorMessage("inputField");
        return;
    }


    // if password does not matches to the confirm password
    if(password !== confirmPassword){
        errorMessage("password");
        return;
    }

    // creating object and storing key value pair in it
    let accessToken = generateToken();
    let obj = {};
    obj.name = name;
    obj.email = email;
    obj.Token = accessToken;
    obj.password = password;


    //  setting user object in local storage
    localStorage.setItem("user", JSON.stringify(obj));


    // callin checkAndRedirectToLoginPage function
    checkAndRedirectToLoginPage();
});


// function to clear the input of form
function clear(){
    document.querySelector("#name").value = "";
    document.querySelector("#email").value = "";
    document.querySelector("#password").value = "";
    document.querySelector("#confirm-password").value = "";
}

// function to show error message
function errorMessage(input){
    let ans = input == "inputField" ?  `<p>Error: All fields are mandatory!</p>` : `<p>Password does not matches to Confirm Password</p>`
    let errorDiv = document.querySelector(".error-message");
    errorDiv.innerHTML =ans;
    setTimeout(function(){
        errorDiv.innerHTML = "";
    }, 2000)
    return;
}

// function for generating token
function generateToken(){
    let str = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let token = "";
    for(let i = 0; i < 16; i++){
        token += str[Math.floor(Math.random()*str.length)];
    }
    return token;
}



    // Function to handle logout
    function handleLogout() {
        // Clear local storage and redirect to signup page
        localStorage.clear();
        let signUpDiv = document.querySelector(".signup");
        signUpDiv.innerHTML = "";
        signUpDiv.innerHTML = `
        <div class="div-1">
            <div class="welcome-message">
                <p>welcome back! 👋</p>
            </div>
            <div class="heading">
                <h3>Sign up to your account</h3>
            </div>
            <form>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Your Name</label>
                    <input type="text" class="form-control" id="name" aria-describedby="emailHelp">
                  </div>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">Your Email</label>
                  <input type="email" class="form-control" id="email" aria-describedby="emailHelp">
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">Password</label>
                  <input type="password" class="form-control" id="password">
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Confirm Password</label>
                    <input type="password" class="form-control" id="confirm-password">
                </div>
                <button type="submit" class="btn btn-primary formbtn">Continue</button>
            </form>
            <div class="error-message">
                
            </div>
        </div>
        <div class="div-2">
            <p>Don’t have an account? <span>Sign up</span></p>
        </div>`;
        displayMessage("logoutButton");
    }

    // Display success message and redirect to profile page
    function displayMessage(clickedBtn){
        let ans = clickedBtn === "logoutButton" ? "" : `<p>signup successful</p>`
        let signUpDiv = document.querySelector(".signup-message");
        signUpDiv.innerHTML = ans;
    };

    // function for checking whether user is in the localStorage and if he is then redirecting to login page
    function checkAndRedirectToLoginPage(){
        let user = JSON.parse(localStorage.getItem("user"));
        if(user && user.Token){
            // Display user details on the profile page
            displayMessage("signUp");
            let signUpDiv = document.querySelector(".signup");
            signUpDiv.innerHTML = "";
            signUpDiv.innerHTML = `
            <div class="logIn">
                <div class="heading">
                    <h3>Profile</h3>
                </div>
                <div class="img">
                    <img src="./Vector-1.png" alt="vector-image">
                    <img src="./Vector-2.png" alt="vector-image">
                </div>
                <div class="para">
                    <p>FullName : ${user.name}</p>
                    <p>Email : ${user.email}</p>
                    <p>token : ${user.Token}</p>
                    <p>Password : ${user.password}</p>
                </div>
                <div class="button">
                    <button class="btn btn-primary logoutButton">LOGOUT</button>
                </div>
            </div>`;
            // Add event listener to logout button
            const logoutButton = document.querySelector('.logoutButton');
            logoutButton.addEventListener('click', handleLogout);
        }
    };
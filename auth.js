


// *************** Login Form er jonno *************
const handleLogin=(event)=>{
    event.preventDefault()
    const username = document.getElementById("loginUsername").value
    const password = document.getElementById("loginPassword").value
    
    console.log(username)
    console.log(password)

    fetch("https://testing-8az5.onrender.com/patient/login/",{
        method : 'POST',
        headers : {"content-type":"application/json"},
        body : JSON.stringify({username,password})
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        if(data.error){
            document.getElementById("error").style.display = "block"
            document.getElementById("error").innerText = "Invalid your username or password"
        }
        else{
            document.getElementById("error").style.display = "none"
            if(data.token && data.user_id){
                localStorage.setItem("token",data.token);
                localStorage.setItem("user_id",data.user_id)
                window.location.href = "index.html"
            }
        }
    })
    
}


// ***************** Registration Form er jonno *************
document.getElementById("registrationForm").addEventListener('submit',function(event){
    event.preventDefault()
    const username = document.getElementById("username").value
    const firstName = document.getElementById("firstName").value
    const lastName = document.getElementById("lastName").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const confirmPassword = document.getElementById("confirmPassword").value

    const info={
        username : username,
        first_name : firstName,
        last_name : lastName,
        email : email,
        password : password,
        confirm_password : confirmPassword
    }
    // console.log(info)

    if(password===confirmPassword){
        document.getElementById("error").style.display = "none"

        if(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)){

            fetch("https://testing-8az5.onrender.com/patient/register/",{
                method : "POST",
                headers : {"content-type":"application/json"},
                body : JSON.stringify(info)
            })
            .then(res=>res.json())
            .then(data=>{

                console.log(data)
                if(data.error){
                    document.getElementById("error").style.display="block"
                    document.getElementById("error").innerText = data.error
                }
                else if(data.username){
                    document.getElementById("error").style.display="block"
                    document.getElementById("error").innerText = data.username
                }
                else{
                    alert("account create successfull")
                }
            })

            
        }
        else{
            document.getElementById("passError").style.display="block"
            document.getElementById("passError").innerText="Minimum eight characters, at least one letter, one number and one special character must "
        }

        

    }
    else{
        document.getElementById("error").style.display = "block"
        document.getElementById("error").innerText="password and confirm_password don't match"
        // alert("password and confirm_password don't match")
    }

    
})




const btnLogin = document.getElementById("BTN_LOGIN")
const etxEmail = document.getElementById("ETX_EMAIL")
const etxPassword = document.getElementById("ETX_PASSWORD")

btnLogin.addEventListener("click", (e) => {

    console.log(etxEmail.value);
    console.log(etxPassword.value);

    fetch('http://localhost:3000/user/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect:"follow",
        body: JSON.stringify({
            email: etxEmail.value,
            password: etxPassword.value
          })
    }).then(rawResponse =>{
        if (!rawResponse.ok) {
            alert("Invalid credentials")
        }
        else{
            return rawResponse.json()
        }
    }).then(jsonResponse => {
        localStorage.setItem('token',jsonResponse.token);
        alert('We have got the token, move to dashboard')
        window.location.href = '/dashboard'
    })
})
const loginForm = document.getElementById('login-form');
const getDataLocal = getData(key);

loginForm.addEventListener('submit', (event) => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    let checkLogin = false;
    getDataLocal.user.forEach((user, index) => {
        if(user.Email === email && user.Password === password) {
            checkLogin = true;
            getDataLocal.currentUser = index;
            saveData(key, getDataLocal);
            window.location.href = '../html/profile.html';
        }
    });
    if(!checkLogin) {
        alert(`Data not found!
You can see a list of emails and passwords in the console!`
        );
        email = '';
        password = '';
    }
    event.preventDefault()
});

alert('You can see a list of emails and passwords in the console!');

getDataLocal.user.forEach((user, index) => {
    console.log(`User number: ${index + 1}`)
    console.log('User email: ' + user.Email);
    console.log('Use password: ' + user.Password);
    console.log('-------------------------------------------------------------------------------------------')
});
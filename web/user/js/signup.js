const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', (event) => {
    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const getDataLocal = getData(key);
    let checkUsername = true;
    getDataLocal.user.forEach((user) => {
        if(user.Username === username) {
            checkUsername = false;
        }
    });
    if(checkUsername) {
        user = {
            Profile_Picture: '../assets/profile_no_data.jpg',
            Background_Picture: '../assets/background_no_data.jpg',
            Name: name,
            Username: username,
            Email: email,
            Password: password,
            Currently: '',
            Address: '',
            Description: ``,
            Skills: ``,
            Education: ``,
            Interest: [],
            URL: 'https://adyamp107.github.io/CareerSync/web/user/html/switch.html?data=' + username,
            Language: 'English'
        };
        getDataLocal.user.push(user);
        getDataLocal.currentUser = getDataLocal.user.length - 1;
        saveData(key, getDataLocal);
        window.location.href = '../html/profile.html';
    } else {
        alert(`Username already exists!
Please change your username!`
        );
    }
    event.preventDefault()
});


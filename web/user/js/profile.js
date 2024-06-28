const navbar = document.querySelector('.navbar');
const hamburgerButton = document.querySelector('.hamburger-button');
const hamburgerMenu = document.querySelector('.hamburger-menu');
const packageButton = document.querySelectorAll('.package-button');
const button2 = Array.from(document.querySelectorAll('.button-2')).reverse();

function checkNavbar() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    if(scrollTop >= 0) {
        navbar.style.backgroundColor = 'var(--color-4)';
    } else {
        navbar.style.backgroundColor = 'transparent';
    }
}

checkNavbar();
window.addEventListener('scroll', () => {
    checkNavbar();
});

// ================================================================================================================

hamburgerButton.addEventListener('click', (event) => {    
    hamburgerMenu.innerHTML = `
        <a href="./login.html">Log In</a>
        <a href="./signup.html">Sign Up</a>
    `;
    button2.forEach((element) => {
        const computedStyle = window.getComputedStyle(element);
        if(computedStyle.display === "none") {
            hamburgerMenu.innerHTML = `<a href="./${element.classList[0].replace('-button', '')}.html">${element.classList[0][0].toUpperCase() + element.classList[0].slice(1).replace('-button', '')}</a>` + hamburgerMenu.innerHTML;
        } else {
            hamburgerMenu.innerHTML = `
                <a href="./login.html">Log In</a>
                <a href="./signup.html">Sign Up</a>
            `;
        }
    });
    hamburgerMenu.style.top = '0px';
    event.stopPropagation()
    window.addEventListener('click', (event) => {
        hamburgerMenu.style.top = '-400px';
    });
});

window.addEventListener('resize', () => {
    hamburgerMenu.style.top = '-300px';
});

// ================================================================================================================
const getDataLocal = getData(key);

const backgroundImage = document.getElementById('background-image');
const profileImage = document.getElementById('profile-image');
const nameProfile = document.getElementById('name');
const emailProfile = document.getElementById('email');
const usernameProfile = document.getElementById('username');
const currentlyProfile = document.getElementById('currently');
const addressProfile = document.getElementById('address');
const languageProfile = document.getElementById('profile-language');
const urlProfile = document.getElementById('profile-url');
const relatedPeopleList = document.getElementById('related-people-list');

backgroundImage.src = getDataLocal.user[getDataLocal.currentUser].Background_Picture;
profileImage.src = getDataLocal.user[getDataLocal.currentUser].Profile_Picture;

if(getDataLocal.user[getDataLocal.currentUser].Name.trim() === '') {
    nameProfile.innerHTML = `No data`;
} else {
    nameProfile.innerHTML = getDataLocal.user[getDataLocal.currentUser].Name;
}

if(getDataLocal.user[getDataLocal.currentUser].Email.trim() === '') {
    emailProfile.innerHTML = '&nbsp;&nbsp;-&nbsp;&nbsp;No data';
} else {
    emailProfile.innerHTML = '&nbsp;&nbsp;-&nbsp;&nbsp;' + getDataLocal.user[getDataLocal.currentUser].Email;
}

if(getDataLocal.user[getDataLocal.currentUser].Username.trim() === '') {
    usernameProfile.innerHTML = 'No data';
} else {
    usernameProfile.innerHTML = getDataLocal.user[getDataLocal.currentUser].Username;
}

if(getDataLocal.user[getDataLocal.currentUser].Currently.trim() === '') {
    currentlyProfile.innerHTML = 'No data';
} else {
    currentlyProfile.innerHTML = 'Currently ' + getDataLocal.user[getDataLocal.currentUser].Currently;
}

if(getDataLocal.user[getDataLocal.currentUser].Address.trim() === '') {
    addressProfile.innerHTML = 'No data';
} else {
    addressProfile.innerHTML = getDataLocal.user[getDataLocal.currentUser].Address;
}

// ================================================================================================================

const descriptionText = document.getElementById('description-text');
descriptionText.innerHTML = textToHtml(getDataLocal.user[getDataLocal.currentUser].Description);

// ================================================================================================================

const skillsContainer = document.getElementById('skills-container');
skillsContainer.innerHTML = textToHtml(getDataLocal.user[getDataLocal.currentUser].Skills);

// ================================================================================================================

const educationContainer = document.getElementById('education-container');
educationContainer.innerHTML = textToHtml(getDataLocal.user[getDataLocal.currentUser].Education);

// ================================================================================================================

const interestCompany = document.getElementById('interest-company');
interestCompany.innerHTML = ``;
if(getDataLocal.user[getDataLocal.currentUser].Interest.length === 0) {
    interestCompany.innerHTML += `
        <div>
            <p>No data</p>
        </div>
    `;
}

for(index in getDataLocal.user[getDataLocal.currentUser].Interest) {
    const getIndex = getDataLocal.company.findIndex(item => item.Name === getDataLocal.user[getDataLocal.currentUser].Interest[index]);
    interestCompany.innerHTML += `
        <div>
            <div>
                <img src="${getDataLocal.company[getIndex].Logo}" alt="">
            </div>
            <p>${getDataLocal.company[getIndex].Name}</p>
        </div>
    `;
}

const userCompany = document.getElementById('user-company');
userCompany.innerHTML = ``;
for(index in getDataLocal.company) {
    checked = false;
    getDataLocal.user[getDataLocal.currentUser].Interest.forEach((getUserCompany) => {
        if(getUserCompany === getDataLocal.company[index].Name) {
            checked = true;
        }
    });
    if(checked) {
        userCompany.innerHTML += `
        <div>
            <input type="checkbox" name="" id="" value="${getDataLocal.company[index].Name}" class="company-list-checkbox" checked>
            <p>${getDataLocal.company[index].Name}</p>
        </div>
        `;
    } else {
        userCompany.innerHTML += `
        <div>
            <input type="checkbox" name="" id="" value="${getDataLocal.company[index].Name}" class="company-list-checkbox">
            <p>${getDataLocal.company[index].Name}</p>
        </div>
        `;
    }
}

// ================================================================================================================

languageProfile.innerHTML = getDataLocal.user[getDataLocal.currentUser].Language;
urlProfile.innerHTML = getDataLocal.user[getDataLocal.currentUser].URL;

// ================================================================================================================

const getUserIndex = [];

function containsAllKeywords(string, keyword) {
    let words = string.split(' ');
    let keywords = keyword.split(' ');  
    return keywords.every(kw => words.some(word => word.includes(kw)));
}

getDataLocal.user.forEach((getUser, index) => {
    if(getDataLocal.user[getDataLocal.currentUser].Currently.trim() !== '') {
        if(containsAllKeywords(getDataLocal.user[getDataLocal.currentUser].Currently.trim().toLowerCase(), getUser.Currently.trim().toLowerCase()) || containsAllKeywords(getUser.Currently.trim().toLowerCase(), getDataLocal.user[getDataLocal.currentUser].Currently.trim().toLowerCase())) {
            if(index !== getDataLocal.currentUser) {
                getUserIndex.push(index)
            }
        }
    }
});

if(getUserIndex.length === 0) {
    relatedPeopleList.innerHTML = `
        <p>No data</p>
    `;
} else {
    relatedPeopleList.innerHTML = ``;
    getUserIndex.forEach((index) => {
        relatedPeopleList.innerHTML += `
            <div class="person-account">
                <div class="person-picture">
                    <img src="${getDataLocal.user[index].Profile_Picture}" alt="">
                </div>
                <div>
                    <h3>${getDataLocal.user[index].Name}</h3>
                    <p>${getDataLocal.user[index].Email}</p>
                    <div class="button-1 visit-profile ${getDataLocal.user[index].Username}">Visit</div>
                </div>
            </div>
        `;
    });
    const visitProfile = document.querySelectorAll('.visit-profile');
    visitProfile.forEach((button) => {
        button.addEventListener('click', () => {
            getDataLocal.user.forEach((user, index) => {
                if(button.classList[2] === user.Username) {
                    getDataLocal.currentUser = index;
                    saveData(key, getDataLocal);
                    location.reload(true);
                }
            });
        });
    });
}

// ================================================================================================================

const background = document.querySelector('.background');

const editButtons = document.querySelectorAll('.edit-button');
const forms = document.querySelectorAll('.edit-form');
const  closeForm = document.querySelectorAll('.close-form');

function closeAllForms() {
    background.classList.remove('selected-form');
    background.classList.remove('unselected-form');
    background.classList.add('unselected-form');
    forms.forEach((form) => {
        form.classList.remove('selected-form');
        form.classList.remove('unselected-form');
        form.classList.add('unselected-form');
    });
}

const userName = document.getElementById('user-name');
const userUsername = document.getElementById('user-username');
const userEmail = document.getElementById('user-email');
const userCurrently = document.getElementById('user-currently');
const userAddress = document.getElementById('user-address');
const userDescription = document.getElementById('user-description');
const userSkills = document.getElementById('user-skills');
const userEducation = document.getElementById('user-education');
const userLanguage = document.getElementById('user-language');

editButtons.forEach((button) => {
    button.addEventListener('click', () => {
        forms.forEach((form) => {
            if(button.classList[1].split('-')[1] === form.classList[1].split('-')[0]) {
                background.classList.remove('unselected-form');
                background.classList.add('selected-form');
                form.classList.remove('unselected-form');            
                form.classList.add('selected-form');

                // -------------------------------------------------------------------------

                userName.value = getDataLocal.user[getDataLocal.currentUser].Name;
                userUsername.value = getDataLocal.user[getDataLocal.currentUser].Username;
                userEmail.value = getDataLocal.user[getDataLocal.currentUser].Email;
                userCurrently.value = getDataLocal.user[getDataLocal.currentUser].Currently;
                userAddress.value = getDataLocal.user[getDataLocal.currentUser].Address;

                // -------------------------------------------------------------------------

                userDescription.value = getDataLocal.user[getDataLocal.currentUser].Description;

                // -------------------------------------------------------------------------
                
                userSkills.value = getDataLocal.user[getDataLocal.currentUser].Skills;
                
                // -------------------------------------------------------------------------
                
                userEducation.value = getDataLocal.user[getDataLocal.currentUser].Education;

                // -------------------------------------------------------------------------

                userLanguage.value = getDataLocal.user[getDataLocal.currentUser].Language;                

            }
        });
    });
});

closeForm.forEach((button) => {
    button.addEventListener('click', () => {
        closeAllForms();
    });
});

// ================================================================================================================

function textToHtml(text) {
    if(text.trim() === '') {
        return 'No data';
    }
    const lines = text.split('\n');
    let outputHtml = '';
    let tagHtml = false;
    lines.forEach((line) => {
        line = line.trim();
        if(line.startsWith('>>')) {
            if(tagHtml) {
                outputHtml += `
                    </div>
                `;
                tagHtml = false;
            }
            outputHtml += `
                <h3>${line.substring(2)}</h3>
            `;
        } else if(line.startsWith('#')) {
            if(tagHtml) {
                outputHtml += `
                    </div>
                `;
                tagHtml = false;
            }
            outputHtml += `
                <ul><li>${line.substring(1)}</li></ul>
            `;
        } else if(line.startsWith('$')) {
            // --------------------------------------
            if(!tagHtml) {
                outputHtml += `
                    <div class="skills-button-group">
                `;
                tagHtml = true;
            }
            outputHtml += `
                <div class="button-3">${line.substring(1)}</div>
            `;
        } else if(line === '') {
            if(tagHtml) {
                outputHtml += `
                    </div>
                `;
                tagHtml = false;
            }
            outputHtml += `
                <br>
            `;
        } else {
            if(tagHtml) {
                outputHtml += `
                    </div>
                `;
                tagHtml = false;
            }
            outputHtml += `
                ${line}<br>
            `;
        }
    });
    if(tagHtml) {
        outputHtml += `
            </div>
        `;
        tagHtml = false;
    }
    return outputHtml;
}

// ================================================================================================================

const backgroundImagePath = document.getElementById('background-image-path');
const profileImagePath = document.getElementById('profile-image-path');

const saveEdit = document.querySelectorAll('.save-edit');
saveEdit.forEach((button) => {
    button.addEventListener('click', (event) => {
        switch(button.classList[2].split('-')[0]) {
            case 'profile':
                const backgroundFile = backgroundImagePath.files[0];
                if(backgroundFile) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        getDataLocal.user[getDataLocal.currentUser].Background_Picture = event.target.result;
                        saveData(key, getDataLocal);
                    };
                    reader.readAsDataURL(backgroundFile);
                }
                const profileFile = profileImagePath.files[0];
                if(profileFile) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        getDataLocal.user[getDataLocal.currentUser].Profile_Picture = event.target.result;
                        saveData(key, getDataLocal);
                    };
                    reader.readAsDataURL(profileFile);
                }

                // getDataLocal.user[getDataLocal.currentUser].Background_Picture = backgroundImagePath.files[backgroundImagePath.files.length - 1].name;
                // getDataLocal.user[getDataLocal.currentUser].Profile_Picture = profileImagePath.files[profileImagePath.files.length - 1].name;
                getDataLocal.user[getDataLocal.currentUser].Name = userName.value;
                getDataLocal.user[getDataLocal.currentUser].Username = userUsername.value;
                getDataLocal.user[getDataLocal.currentUser].Email = userEmail.value;
                getDataLocal.user[getDataLocal.currentUser].Currently = userCurrently.value;
                getDataLocal.user[getDataLocal.currentUser].Address = userAddress.value;
                break;
            case 'description':
                getDataLocal.user[getDataLocal.currentUser].Description = userDescription.value;
                break;
            case 'skills':
                getDataLocal.user[getDataLocal.currentUser].Skills = userSkills.value;
                break;
            case 'education':
                getDataLocal.user[getDataLocal.currentUser].Education = userEducation.value;
                break;
            case 'interest':
                companyListCheckbox = document.querySelectorAll('.company-list-checkbox');
                const getCompanyList = [];
                companyListCheckbox.forEach((checkbox) => {
                    if(checkbox.checked) {
                        getCompanyList.push(checkbox.value);
                    }
                });
                getDataLocal.user[getDataLocal.currentUser].Interest = getCompanyList;
                break;
            case 'language':
                getDataLocal.user[getDataLocal.currentUser].Language = userLanguage.value;
                break;
        }
        saveData(key, getDataLocal);
        // event.preventDefault()
    });
});

// ================================================================================================================

const searchTitle = document.getElementById('search-title');
const searchButton = document.querySelector('.search-button');

searchButton.addEventListener('click', () => {
    getDataLocal.user.forEach((user, index) => {
        let getUserData = user.Name + ' ' + user.Username + ' ' + user.Email;
        if(getUserData.trim().toLocaleLowerCase().includes(searchTitle.value.trim().toLowerCase())) {
            getDataLocal.currentUser = index;
            getDataLocal.userSearch = searchTitle.value;
            saveData(key, getDataLocal);
            location.reload(true);
        }
    });
});

searchTitle.value = getDataLocal.userSearch;

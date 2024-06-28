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

const contentLeft = document.querySelector('.content-left');
contentLeft.innerHTML = ``;

if(getDataLocal.jobSearch.trim() === '') {
    let getInnerHtml = ``;
    getDataLocal.job.forEach((job) => {
        let getLogo = '../assets/profile_no_data.jpg';
        getDataLocal.company.forEach((company) => {
            if(company.Name === job.Company) {
                getLogo = company.Logo;
            }
        });
        getInnerHtml += `
            <div class="job-list-button">
                <div class="company-logo">
                    <img src="${getLogo}" alt="">
                </div>
                <h3>${job.Name}</h3>
                <p>By ${job.Company}</p>
                <div class="jobs-information">
                    <div class="button-4">${job.Contract}</div>
        `;
        job.Tag.forEach((tag) => {
            getInnerHtml += `
                <div class="button-3">${tag}</div>
            `;
        });
        getInnerHtml += `
                </div>
                <p>${job.Time_Left} days left to apply</p>
            </div>
        `;        
    });
    contentLeft.innerHTML = getInnerHtml;
} else {
    let getInnerHtml = ``;
    let checkJob = 0;
    getDataLocal.job.forEach((job) => {
        dataJob = job.Name + ' ' + job.Company + ' ' + job.Contract + ' ' + job.Tag.join(' ') + ' ' + job.Time_Left + ' ';
        getDataLocal.company.forEach((company) => {
            if(company.Name === job.Company) {
                dataJob += company.Address + ' ';
            }
        });
        if(dataJob.toLowerCase().includes(getDataLocal.jobSearch.trim().toLowerCase())) {
            checkJob += 1;
            let getLogo = '../assets/profile_no_data.jpg';
            getDataLocal.company.forEach((company) => {
                if(company.Name === job.Company) {
                    getLogo = company.Logo;
                }
            });
            getInnerHtml += `
                <div class="job-list-button">
                    <div class="company-logo">
                        <img src="${getLogo}" alt="">
                    </div>
                    <h3>${job.Name}</h3>
                    <p>By ${job.Company}</p>
                    <div class="jobs-information">
                        <div class="button-4">${job.Contract}</div>
            `;
            job.Tag.forEach((tag) => {
                getInnerHtml += `
                    <div class="button-3">${tag}</div>
                `;
            });
            getInnerHtml += `
                    </div>
                    <p>${job.Time_Left} days left to apply</p>
                </div>
            `;        
        }
    });
    if(checkJob === 0) {
        getInnerHtml += `
            <div class="job-list-button">
                <div class="company-logo">
                    <img src="../assets/profile_no_data.jpg" alt="">
                </div>
                <h3>No data</h3>
                <p>No data</p>
                <p>No data</p>
            </div>
        `;    
    }
    contentLeft.innerHTML = getInnerHtml;
}

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
        if(line.startsWith('>>>')) {
            if(tagHtml) {
                outputHtml += `
                    </div>
                `;
                tagHtml = false;
            }
            outputHtml += `
                <h2>${line.substring(3)}</h2>
            `;
        } else if(line.startsWith('>>')) {
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

const jobDescriptionText = document.querySelector('.job-description-text');

jobDescriptionText.innerHTML = `${textToHtml(getDataLocal.job[getDataLocal.currentJob].Description)}`;

const jobBackgroundImage = document.getElementById('job-background-image');

getDataLocal.company.forEach((company) => {
    if(company.Name === getDataLocal.job[getDataLocal.currentJob].Company) {
        jobBackgroundImage.src = company.Background;
    }
});

// ================================================================================================================

const jobListButton = document.querySelectorAll('.job-list-button');
jobListButton.forEach((button) => {
    button.addEventListener('click', () => {
        getDataLocal.job.forEach((job, index) => {
            if(job.Company === button.querySelector('p').innerHTML.substring(3).trim()) {
                if(job.Name === button.querySelector('h3').innerHTML.trim()) {
                    getDataLocal.currentJob = index;
                    saveData(key, getDataLocal);
                    location.reload(true);
                }
            }
        });
    });
});

// ================================================================================================================

const visitCompanyButton = document.querySelector('.visit-company-button');
const applyButton = document.querySelector('.apply-button');

visitCompanyButton.addEventListener('click', () => {
    getDataLocal.company.forEach((company, index) => {
        if(company.Name === getDataLocal.job[getDataLocal.currentJob].Company) {
            getDataLocal.currentCompany = index;
            saveData(key, getDataLocal);
            window.location.href = './company.html';
        }
    });
    window.location.href = './company.html';
});

applyButton.addEventListener('click', () => {
    let currentDate = new Date();
    let monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    let month = monthNames[currentDate.getMonth()];
    let day = currentDate.getDate();
    let year = currentDate.getFullYear();
    let formattedDate = `${month} ${day}, ${year}`;
    let newNotification = {
        Job: getDataLocal.job[getDataLocal.currentJob].Name,
        Company: getDataLocal.job[getDataLocal.currentJob].Company,
        User: getDataLocal.user[getDataLocal.currentUser].Username,
        Date: formattedDate,
        Status: 'Await'
    }
    let checkNotification = true;
    getDataLocal.notification.forEach((notification) => {
        if(shallowEqual(notification, newNotification)) {
            checkNotification = false;
        }
    });
    if(checkNotification) {
        getDataLocal.notification.push(newNotification);
        saveData(key, getDataLocal);
        alert("Successful job application!")
        location.reload(true);
    } else {
        alert("You've applied for this job!")
    }
});

// ================================================================================================================

const searchTitle = document.getElementById('search-title');
const searchButton = document.querySelector('.search-button');

searchButton.addEventListener('click', () => {
    getDataLocal.jobSearch = searchTitle.value.trim();
    saveData(key, getDataLocal);
    location.reload(true);
});

function shallowEqual(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (let key of keys1) {
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }

    return true;
}

// ================================================================================================================

searchTitle.value = getDataLocal.jobSearch;
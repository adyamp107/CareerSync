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

if(getDataLocal.companySearch.trim() === '') {
    getDataLocal.company.forEach((company) => {
        contentLeft.innerHTML += `
            <div class="company-list-button">
                <div class="company-logo">
                    <img src="${company.Logo}" alt="">
                </div>
                <p>${company.Name}</p>
            </div>
        `;
    });
} else {
    let checkCompany = 0;
    getDataLocal.company.forEach((company) => {
        if(company.Name.toLowerCase().includes(getDataLocal.companySearch.toLowerCase())) {
            checkCompany += 1;
            contentLeft.innerHTML += `
                <div class="company-list-button">
                    <div class="company-logo">
                        <img src="${company.Logo}" alt="">
                    </div>
                    <p>${company.Name}</p>
                </div>
            `;
        }
    });
    if(checkCompany === 0) {
        contentLeft.innerHTML += `
            <div class="company-list-button">
                <div class="company-logo">
                    <img src="../assets/question.jpg" alt="">
                </div>
                <p>No data</p>
            </div>
        `;
    }
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

const companyBackgroundImage = document.getElementById('company-background-image');
const companyDescriptionText = document.getElementById('company-description-text');

companyBackgroundImage.src = getDataLocal.company[getDataLocal.currentCompany].Background;
companyDescriptionText.innerHTML = `${textToHtml(getDataLocal.company[getDataLocal.currentCompany].Description)}`;

// ================================================================================================================

const companyListButton = document.querySelectorAll('.company-list-button');
companyListButton.forEach((button) => {
    button.addEventListener('click', () => {
        getDataLocal.company.forEach((company, index) => {
            if(company.Name === button.querySelector('p').innerHTML) {
                getDataLocal.currentCompany = index;
                saveData(key, getDataLocal);
                location.reload(true);
            }
        });
    });
});

// ================================================================================================================

const searchTitle = document.getElementById('search-title');
const searchButton = document.querySelector('.search-button');

searchButton.addEventListener('click', () => {
    getDataLocal.companySearch = searchTitle.value.trim();
    saveData(key, getDataLocal);
    location.reload(true);
});

searchTitle.value = getDataLocal.companySearch;

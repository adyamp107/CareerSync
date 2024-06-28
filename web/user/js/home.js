const navbar = document.querySelector('.navbar');
const hamburgerButton = document.querySelector('.hamburger-button');
const hamburgerMenu = document.querySelector('.hamburger-menu');
const packageButton = document.querySelectorAll('.package-button');
const button2 = Array.from(document.querySelectorAll('.button-2')).reverse();

function checkNavbar() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    if(scrollTop >= 80) {
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
    hamburgerMenu.style.top = '-400px';
});

// ================================================================================================================

const faqButton = document.querySelectorAll('.faq-button');

faqButton.forEach((button) => {
    button.addEventListener('click', () => {
        if(button.classList[1] == 'faq-button-1') {
            const faqAnswer = document.querySelector('.faq-answer-1');
            const faqImageButton = document.querySelector('.faq-button-image-1');
            if(faqAnswer.classList.contains('faq-selected')) {
                faqAnswer.classList.remove('faq-selected');
                faqImageButton.src = '../assets/plus.png';
            } else {
                faqAnswer.classList.add('faq-selected');
                faqImageButton.src = '../assets/minus.png';
            }
        }
        if(button.classList[1] == 'faq-button-2') {
            const faqAnswer = document.querySelector('.faq-answer-2');
            const faqImageButton = document.querySelector('.faq-button-image-2');
            if(faqAnswer.classList.contains('faq-selected')) {
                faqAnswer.classList.remove('faq-selected');
                faqImageButton.src = '../assets/plus.png';
            } else {
                faqAnswer.classList.add('faq-selected');
                faqImageButton.src = '../assets/minus.png';
            }
        }
        if(button.classList[1] == 'faq-button-3') {
            const faqAnswer = document.querySelector('.faq-answer-3');
            const faqImageButton = document.querySelector('.faq-button-image-3');
            if(faqAnswer.classList.contains('faq-selected')) {
                faqAnswer.classList.remove('faq-selected');
                faqImageButton.src = '../assets/plus.png';
            } else {
                faqAnswer.classList.add('faq-selected');
                faqImageButton.src = '../assets/minus.png';
            }
        }
    });
});

// ================================================================================================================

const getDataLocal = getData(key);

const searchTitle = document.getElementById('search-title');
const searchButton = document.querySelector('.search-button');

searchButton.addEventListener('click', () => {
    getDataLocal.jobSearch = searchTitle.value.trim();
    saveData(key, getDataLocal);
    window.location.href = './job.html';
});

// ================================================================================================================

const jobBottom = document.querySelector('.jobs-bottom');
jobBottom.innerHTML = ``;
if(getDataLocal.job.length > 0) {
    let getInnerHtml = ``;
    getDataLocal.job.forEach((job) => {
        let getLogo = '../assets/profile_no_data.jpg';
        getDataLocal.company.forEach((company) => {
            if(company.Name === job.Company) {
                getLogo = company.Logo;
            }
        });
        getInnerHtml += `
            <div class="jobs-button">
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
    jobBottom.innerHTML = getInnerHtml;

} else {
    jobBottom.innerHTML = `
        <div class="jobs-button">
            <div class="company-logo">
                <img src="../assets/profile_no_data.jpg" alt="">
            </div>
            <h3>No data</h3>
            <p>No data</p>
            <div class="jobs-information">
            </div>
            <p>No data</p>
        </div>
    `;
    jobBottom.style.justifyContent = "center";
}

const jobsButton = document.querySelectorAll('.jobs-button');
jobsButton.forEach((button) => {
    button.addEventListener('click', () => {
        getDataLocal.job.forEach((job, index) => {
            if(job.Company === button.querySelector('p').innerHTML.substring(3).trim()) {
                if(job.Name === button.querySelector('h3').innerHTML.trim()) {
                    getDataLocal.currentJob = index;
                    saveData(key, getDataLocal);
                    window.location.href = './job.html';
                }
            }
        });
    });
});

searchTitle.value = getDataLocal.jobSearch;
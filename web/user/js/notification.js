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

const notificationList = document.querySelector('.notification-list');
const sortType = document.getElementById('sort-type');
const sortAscDesc = document.getElementById('sort-asc-desc');

function selectOptionChange() {
    const getNotification = [];
    getDataLocal.notification.forEach((notification) => {
        if(getDataLocal.user[getDataLocal.currentUser].Username === notification.User) {
            if(getDataLocal.notificationSearch.trim() === '') {
                getNotification.push(notification);
            } else {
                let getNotificationData = notification.Job + ' ' + notification.Company + ' ' + notification.Date + ' ' + notification.Status;
                if(getNotificationData.trim().toLocaleLowerCase().includes(getDataLocal.notificationSearch.trim().toLowerCase())) {
                    getNotification.push(notification);
                }
            }
        }
    });

    if(getNotification.length === 0) {
        notificationList.innerHTML = `
            <div class="notification-row">
                <div>No data</div>
                <div>No data</div>
                <div>No data</div>
                <div>No data</div>
                <div class="notification-control">
                    No data
                </div>
            </div>
        `;
        return;
    }

    switch(sortType.value) {
        case 'Job':
            if(sortAscDesc.value === 'Ascending') {
                getNotification.sort((item1, item2) => {
                    let Item1 = item1.Job.toUpperCase();
                    let Item2 = item2.Job.toUpperCase();
                    if (Item1 < Item2) {
                      return -1;
                    }
                    if (Item1 > Item2) {
                      return 1;
                    }
                    return 0;
                });
            } else {
                getNotification.sort((item1, item2) => {
                    let Item1 = item1.Job.toUpperCase();
                    let Item2 = item2.Job.toUpperCase();
                    if (Item1 > Item2) {
                      return -1;
                    }
                    if (Item1 < Item2) {
                      return 1;
                    }
                    return 0;
                });
            }
            break;
        case 'Company':
            if(sortAscDesc.value === 'Ascending') {
                getNotification.sort((item1, item2) => {
                    let Item1 = item1.Company.toUpperCase();
                    let Item2 = item2.Company.toUpperCase();
                    if (Item1 < Item2) {
                    return -1;
                    }
                    if (Item1 > Item2) {
                    return 1;
                    }
                    return 0;
                });
            } else {
                getNotification.sort((item1, item2) => {
                    let Item1 = item1.Company.toUpperCase();
                    let Item2 = item2.Company.toUpperCase();
                    if (Item1 > Item2) {
                    return -1;
                    }
                    if (Item1 < Item2) {
                    return 1;
                    }
                    return 0;
                });
            }
            break;
        case 'Date':
            if(sortAscDesc.value === 'Ascending') {
                getNotification.sort((item1, item2) => {
                    let Item1 = item1.Date.toUpperCase();
                    let Item2 = item2.Date.toUpperCase();
                    if (Item1 < Item2) {
                    return -1;
                    }
                    if (Item1 > Item2) {
                    return 1;
                    }
                    return 0;
                });
            } else {
                getNotification.sort((item1, item2) => {
                    let Item1 = item1.Date.toUpperCase();
                    let Item2 = item2.Date.toUpperCase();
                    if (Item1 > Item2) {
                    return -1;
                    }
                    if (Item1 < Item2) {
                    return 1;
                    }
                    return 0;
                });
            }
            break;
        case 'Status':
                if(sortAscDesc.value === 'Ascending') {
                    getNotification.sort((item1, item2) => {
                        let Item1 = item1.Status.toUpperCase();
                        let Item2 = item2.Status.toUpperCase();
                        if (Item1 < Item2) {
                        return -1;
                        }
                        if (Item1 > Item2) {
                        return 1;
                        }
                        return 0;
                    });
                } else {
                    getNotification.sort((item1, item2) => {
                        let Item1 = item1.Status.toUpperCase();
                        let Item2 = item2.Status.toUpperCase();
                        if (Item1 > Item2) {
                        return -1;
                        }
                        if (Item1 < Item2) {
                        return 1;
                        }
                        return 0;
                    });
                }
                break;
    }

    notificationList.innerHTML = ``;
    let checkButtonControl = 0;
    getNotification.forEach((notification) => {
        if(getDataLocal.user[getDataLocal.currentUser].Username === notification.User) {
            checkButtonControl += 1;
            notificationList.innerHTML += `
                <div class="notification-row">
                    <div>${notification.Job}</div>
                    <div>${notification.Company}</div>
                    <div>${notification.Date}</div>
                    <div style="color: blue;">${notification.Status}</div>
                    <div class="notification-control">
                        <div class="button-1 more-button ${notification.Job.replace(/ /g, '_')} ${notification.Company.replace(/ /g, '_')}">More</div>
                        <div class="button-5 delete-button" data="${JSON.stringify(notification).replace(/"/g, '#')}">Delete</div>
                    </div>
                </div>
            `;
        }
    });
    if(checkButtonControl > 0) {
        const moreButton = document.querySelectorAll('.more-button');
        const deleteButton = document.querySelectorAll('.delete-button');

        moreButton.forEach((button) => {
            button.addEventListener('click', () => {
                getDataLocal.job.forEach((job, index) => {
                    if(job.Name === button.classList[2].replace(/_/g, ' ') && job.Company === button.classList[3].replace(/_/g, ' ')) {
                        getDataLocal.currentJob = index;
                        saveData(key, getDataLocal);
                        window.location.href = './job.html';
                    }
                });
            });
        });

        deleteButton.forEach((button) => {
            button.addEventListener('click', () => {
                getDataLocal.notification.forEach((notification, index) => {
                    if(shallowEqual(notification, JSON.parse(button.getAttribute('data').replace(/#/g, '"')))) {
                        getDataLocal.notification.splice(index, 1);
                        saveData(key, getDataLocal);
                        location.reload(true);
                        alert('Notification deletion was successful!');
                    }
                });

            });
        });
    }
}
selectOptionChange();

const selectOption = document.querySelectorAll('.select-option');
selectOption.forEach((option) => {
    option.addEventListener('change', () => {
        selectOptionChange();
    });
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

const searchTitle = document.getElementById('search-title');
const searchButton = document.querySelector('.search-button');

searchButton.addEventListener('click', () => {
    getDataLocal.notificationSearch = searchTitle.value;
    saveData(key, getDataLocal);
    location.reload(true);
});

searchTitle.value = getDataLocal.notificationSearch;

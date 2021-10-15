// Initialize html objetcs
const themeText = document.querySelector('.theme .theme-txt');
const sun = document.querySelector('#sun');
const moon = document.querySelector('#moon');
const search = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');

// Remove some items from display
moon.style.display = "none";

// set the click function to sun object
sun.addEventListener('click', whiteTheme);

// changes to light theme
function whiteTheme() {
    document.querySelector('body').classList.add("white-theme");
    themeText.innerText = 'dark';
    sun.style.display = "none";
    moon.style.display = "block";
}

// changes to dark theme
moon.addEventListener('click', defaultTheme);
function defaultTheme() {
    document.querySelector('body').classList.remove("white-theme");
    themeText.innerText = 'light';
    moon.style.display = "none";
    sun.style.display = "block";
}


searchBtn.addEventListener('click', searchUser);
function searchUser() {
    const searchTxt = search.value;
    getUsers(searchTxt);
}


function getUsers(username) {
    fetch(`https://api.github.com/users/${username}`)
    .then((res) => res.json())
    .then((user) => {
        displayInfo(user);

        const location = document.getElementById('location');
        const locationSpan = document.querySelector('#location span');
        handleIcons(location, locationSpan, user.location);
        
        const twitter = document.getElementById('twitter');
        const twitterSpan = document.querySelector('#twitter span');
        handleIcons(twitter, twitterSpan, user.twitter_username);
        if (user.twitter_username == null || user.twitter_username == "") {

            twitter.href = '#';
            
        } else {
            twitter.href = `https://twitter.com/${user.twitter_username}`; 
        }

        const link = document.getElementById('link');
        const linkSpan = document.querySelector('#link span');
        handleIcons(link, linkSpan, user.blog);

        const company = document.getElementById('company');
        const companySpan = document.querySelector('#company span');
        handleIcons(company, companySpan, user.company);

    });
}


function handleIcons(iconName, iconSpan, userDetail) {

    if (userDetail == null || userDetail == "") {

        iconSpan.textContent = 'Not Available';
        iconName.classList.add('disable');
        iconName.href = '#';
    } else {

        iconName.classList.remove('disable');
        iconSpan.textContent = userDetail;
        iconName.target = '_blank';

        if (userDetail.includes('https')) {

            iconName.href = userDetail;
        } else if ( userDetail.includes('.com') ) {

            iconName.href = `https://www.${userDetail}`;
        } else if ( userDetail.includes(" ") ) {

            let detailArray = userDetail.split(" ");
            console.log(detailArray);
        }
        
        else {

            // iconName.href = `https://${userDetail}.com`;
            iconName.href = `www.${userDetail}.com`;
        }
        
    }
}



function displayInfo(person) {
    const allInfo = document.getElementById('all-information');
    const container = document.querySelector('.container');
    
    if (person.message == 'Not Found') {

        console.log('User not found');
    } else {

        if ( person.bio && search.value.length > 0) {

            container.classList.remove('no-bio-card');
            let information = `
            
            <div class="pic-details">
                <div id="profile-pic">
                    <img src="${person.avatar_url}" alt="profile-pic">
                </div>

                <div class="personal-details">
                    <div class="name-mini-bio">
                        <p id="personname">${person.name}</p>
                        <a href="${person.html_url}" target="_blank" id="name-link">@${person.login}</a>
                        <p class="date" id="first-date">Joined ${person.created_at}</p>
                        <p id="no-bio-desc">
                            This profile has no bio
                        </p>
                    </div>

                    <p class="date" id="second-date">
                        Joined 25 Jan 2011
                    </p>
                </div>
            </div>

            <p id="bio">
                ${person.bio}
            </p>

            <table class="count-table">
                <tr>
                    <th>repos</th>
                    <th>followers</th>
                    <th>following</th>
                </tr>

                <tr>
                    <td id="repos">${person.public_repos}</td>
                    <td id="followers">${person.followers}</td>
                    <td id="following">${person.following}</td>
                </tr>
            </table>

            <div class="social-icons">
                <a href="#"  id="location" class="icons">
                    <i class="fa fa-map-marker"></i>
                    <span>San Francisco</span>
                </a>
                <a href="#"  id="twitter" class="icons disable">
                    <i class="fa fa-twitter"></i>
                    <span>Not Available</span>
                </a>
                <a href="#" id="link" class="icons">
                    <i class="fa fa-link"></i>
                    <span>https://github.blog</span>
                </a>
                <a href="#"  id="company" class="icons">
                    <i class="fa fa-github"></i>
                    <span>@github</span>
                </a>
                
            </div>
        
        `;

        allInfo.innerHTML = information;

        } else if ( person.bio == null && search.value.length > 0 ) {

            container.classList.add('no-bio-card');
            
            let information = `
            
            <div id="profile-pic">
                <img src="${person.avatar_url}" alt="profile-pic">
            </div>

            <div class="pic-details">
                <div class="personal-details">
                    <div class="name-mini-bio">
                        <p id="personname">${person.name}</p>
                        <a href="${person.html_url}" target="_blank" id="name-link">@${person.login}</a>
                        <p class="date" id="first-date">${person.created_at}</p>
                        <p id="no-bio-desc">
                            This profile has no bio
                        </p>
                    </div>
    
                    <p class="date" id="second-date">
                        Joined ${person.created_at}
                    </p>
                </div>
            </div>


            <table class="count-table">
                <tr>
                    <th>repos</th>
                    <th>followers</th>
                    <th>following</th>
                </tr>

                <tr>
                    <td id="repos">${person.public_repos}</td>
                    <td id="followers">${person.followers}</td>
                    <td id="following">${person.following}</td>
                </tr>
            </table>

            <div class="social-icons">
                <a href="#"  id="location" class="icons">
                    <i class="fa fa-map-marker"></i>
                    <span>San Francisco</span>
                </a>
                <a href="#"  id="twitter" class="icons disable">
                    <i class="fa fa-twitter"></i>
                    <span>Not Available</span>
                </a>
                <a href="#"  id="link" class="icons">
                    <i class="fa fa-link"></i>
                    <span>https://github.blog</span>
                </a>
                <a href="#"  id="company" class="icons">
                    <i class="fa fa-github"></i>
                    <span>@github</span>
                </a>
                
            </div>

            `;

            allInfo.innerHTML = information;
            
        } else {

            console.log('error');
        }
    }

}
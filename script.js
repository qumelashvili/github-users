const mainArea = document.querySelector(".main");
const searchButton = document.querySelector(".search-button");
const inputField = document.querySelector(".search-input");
const darkLightToggle = document.querySelector(".dark-light");
const body = document.querySelector("body");

searchButton.addEventListener('click', function(){
    const url = `https://api.github.com/users/${inputField.value}`;
        
    fetch(url).then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Something went wrong');
    })
    .then((responseJson) => {
        console.log(responseJson)
        getContent(responseJson);
        body.classList.remove("alert");
    })
    .catch((error) => {
        console.log(error);
        body.classList.add("alert");
    });
})

darkLightToggle.addEventListener('click', () => body.classList.toggle("dark"));

function getContent(object){
    const date = object.created_at.split("T");
    const d = new Date(date[0]);
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let name = month[d.getMonth()];
    let day  = d.getDate();
    let year = d.getFullYear();
    let tmp = 
        `
        <div class="profile">
            <img src=${object.avatar_url} alt="">
            <div class="details">
                <h4 class="info">${object.name}</h4>
                <a href="/">@${object.login}</a>
                <p class="lighter">Joined ${day} ${name} ${year}</p>
            </div>
        </div>
        <section class="about-user">
        <p class="lighter info">
            ${object.bio}
        </p>
        </section>
        <div class="followers">
            <ul>
                <li>
                    <p>Repos</p>
                    ${object.public_repos}
                </li>
                <li>
                    <p>Followers</p>
                    ${object.followers}
                </li>
                <li>
                    <p>Following</p>
                    ${object.following}
                </li>
            </ul>
        </div>
        <ul class="links">
            <li>
                <img src="./assets/icon-location.svg">
                <p class="info">${object.location}</p>
            </li>
            <li >
                <img src="./assets/icon-website.svg" alt="">
                <p class="info">${object.blog}</p>
            </li>
            <li>
                <img src="./assets/icon-twitter.svg" alt="">
                <p class="info">${object.twitter_username}</p>  
            </li>
            <li>
                <img src="./assets/icon-company.svg" alt="">
                <p class="info">${object.company}</p>
            </li>
        </ul>
        `
    mainArea.innerHTML = tmp;
    let info = document.querySelectorAll(".info");
    for(var x of info){
        if(x.innerText == "null" || x.innerText == ""){
            x.innerText = "Not Available";
            x.classList.add("null")
        }
    }
}
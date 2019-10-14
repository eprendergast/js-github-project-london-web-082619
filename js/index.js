const GITHUB_FORM = document.getElementById('github-form');
const GITHUB_CONTAINER = document.getElementById('github-container');
const REPOS_LIST = document.getElementById('repos-list');
const USER_LIST = document.getElementById('user-list');

document.addEventListener('DOMContentLoaded', () => {
    GITHUB_FORM.addEventListener('submit', event => searchUsers(event))
})

// Search GitHub for users by name
function searchUsers(event){
    event.preventDefault();
    USER_LIST.innerText = "";
    REPOS_LIST.innerText = "";
    let searchQuery = document.getElementById('search').value;
    API.getUsers(searchQuery).then(users => renderUsers(users))
    event.target.reset();
} 

// Display the results on the page
    // Username, avatar, and link to their profile

function renderUsers(users){
    users.items.forEach(user => {
        renderUser(user)
    })
}

function renderUser(user){
    let userContainer = document.createElement('div')

    let userName = document.createElement('h3');
    userName.innerHTML = `Username: <span> ${user.login} </span>`;
    userName.addEventListener('click', (event) => {
        getUserRepos(event)});
    let userAvatar = document.createElement('img');
    userAvatar.src = user.avatar_url;

    let userLink = document.createElement('a');
    userLink.href = user.html_url;
    userLink.target = "_blank";
    userLink.innerText = `View on GitHub`;

    userContainer.append(userName, userAvatar, userLink)
    USER_LIST.appendChild(userContainer)
}

// Click on a specific user to show all public repos for that user

function getUserRepos(event){
    event.preventDefault();
    let username = event.target.innerText;
    API.getRepos(username).then(repos => renderRepos(repos))
}

function renderRepos(repos){
    repos.forEach(repo => {
        renderRepo(repo);
    })
}

function renderRepo(repo){
    REPOS_LIST.innerText = "";
    let repoLi = document.createElement('li');
    repoLi.innerText = repo.name;
    REPOS_LIST.appendChild(repoLi);
}
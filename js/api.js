
const API_ENDPOINT = 'https://api.github.com';
const USER_SEARCH_URL = `${API_ENDPOINT}/search/users?q=`; // need to append search criteria

function generateRepoURL(username){
    return `${API_ENDPOINT}/users/${username}/repos`;
}

function getUsers(searchQuery){
    
    let url = `${USER_SEARCH_URL}${searchQuery}`
    let configObject = createFetchConfig("GET")

    return fetch(url, configObject)
    .then(response => response.json())

}

function createFetchConfig(httpMethod){
    return {
        method: httpMethod,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/vnd.github.v3+json"
        }
    }
}

function getRepos(username){
    let url = generateRepoURL(username);
    let configObject = createFetchConfig("GET");
    return fetch(url, configObject).then(response => response.json())
}

const API = {
    getUsers,
    generateRepoURL,
    getRepos
}

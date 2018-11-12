console.log("Before");
    getUser(1,displayUser);

console.log('After');

function displayUser(user){
    console.log('User',user);
    getRepositories(user.gitHubUserName,displayRepositories);
}
function displayRepositories(repo){
    console.log(repo.username);
    console.log('Repo',repo);
        getCommits(repo, displayCommits);
}

function displayCommits(commits){
    console.log(commits);
}

function getUser(id, callback){
    setTimeout(() => {
        console.log('Reading a user from database....');
        callback({ id: id, gitHubUserName: 'Swap76'});
    }, 2000);

}

function getRepositories(username, callback){
    setTimeout(()=> {
        callback({username: username,repository: ['repo1','repo2','repo3']});
    },2000);
}

function getCommits(repo,callback){
    setTimeout(() => {
        callback({repository: repo, commit: ['first','second','third']});
    },2000);
}
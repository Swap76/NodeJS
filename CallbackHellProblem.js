console.log("Before");
const user = getUser(1,(user) => {
    console.log('User',user);
    getRepositories(user.gitHubUserName,(repo) => {
        console.log(repo.username);
        console.log('Repo',repo);
    })
});

console.log('After');

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
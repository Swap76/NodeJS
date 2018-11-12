console.log("Before");

getUser(1)
  .then(user => getRepositories(user.gitHubUserName))
  .then(repo => getCommits(repo[0]))
  .then(commits => console.log('commits',commits))
  .catch(err => console.log('Error',err.message));

console.log('After');

function getUser(id){

    return new Promise ((resolve, reject) =>{
        setTimeout(() => {
            console.log('Reading a user from database....');
            resolve({ id: id, gitHubUserName: 'Swap76'});
        }, 2000);
    });
}

function getRepositories(username){

    return new Promise ((resolve, reject) =>{
        setTimeout(()=> {
            console.log('Getting Repostories...')
            resolve({username: username,repository: ['repo1','repo2','repo3']});
        },2000);
    })
}

function getCommits(repo){

    return new Promise ((resolve,reject) =>{
        setTimeout(() => {
            console.log('Calling GitHub API....');
            resolve(['commit']);
        },2000);
    });
}
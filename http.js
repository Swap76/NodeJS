const http = require('http');
const server = http.createServer((req ,res )=>{
       if(req.url==='/')
       {
         res.write('Hello World');
         res.end();
    }
       else if(req.url==='/NodeJS'){
           res.write(JSON.stringify([1,2,3]));
           res.end();
       }
});


server.listen(3000);
console.log('Listening to localhost 3000');
const express = require('express');

const app=express();

app.use(express.json());
app.set('view engine','pug');
const port= process.env.PORT || 3000;

app.listen(port,() => {
    console.log(`Listning on port ${port}....`);
});

app.get('/',(req,res) => {
    res.render('index',{title:'My Express Module',message:'Hello World......!'});
});
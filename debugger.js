const express = require('express');
const startUpDebugger=require('debug')('app:startup');
const bdDbugger= require('debug')('app:db');
const app=express();

app.use(express.json());
app.set('view engine','pug');
const port= process.env.PORT || 3000;

app.listen(port,() => {
    console.log(`Listning on port ${port}....`);
});
startUpDebugger('startup line printed...!');
bdDbugger('Connected to database....!');
const courses =[
    { id: 1, name: 'Course1'},
    { id: 2, name: 'Course2'},
    { id: 3, name: 'Course3'},
]

app.get('/',(req,res) => {
    res.render('index',{title:'My Express Module',message:'Hello World......!'});
});

app.post('/NodeJS',(req,res)=>{
        const course={
            id: courses.length+1,
            name: req.body.name
        };
        courses.push(course);
        res.send(courses);
})

app.put('/Node-JS/:id',(req,res)=>{
    const Course=courses.find(c=>c.id===parseInt(req.params.id));
    if(!Course){
        res.status(404).send("Course Id not found");
        return;
    }
    Course.name=req.body.name;
    res.send(courses);
})

app.delete('/Node-JS/:id',(req,res)=>{
    const Course=courses.find(c=>c.id===parseInt(req.params.id));
    if(!Course){
        res.status(404).send("Course Id not found");
        return;
    }
    const index=courses.indexOf(Course);
    courses.splice(index,1);
    res.send(courses);
})
app.get('/NodeJS/:id',(req,res)=>{
    const Course=courses.find(c=>c.id===parseInt(req.params.id));
    if(!Course){
        res.status(404).send("Course Id not found");
        return;
    }
    res.send(Course);
});
app.get('/NodeJS',(req,res)=>{
    res.send(courses);
});
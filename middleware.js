const express = require('express');
const app=express();

app.use(express.json());

const port= process.env.PORT || 3000;

app.use(function (req,res,next){
    console.log('logging.....');
    next();
});

app.use(function (req,res,next){
    console.log('Athenticating.....');
    next();
});

app.listen(port,() => {
    console.log(`Listning on port ${port}....`);
});

const courses =[
    { id: 1, name: 'Course1'},
    { id: 2, name: 'Course2'},
    { id: 3, name: 'Course3'},
]

app.get('/',(_req,res) => {
    res.send("Hello World!!!");
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
app.get('/NodeJS',(_req,res)=>{
    res.send(courses);
});
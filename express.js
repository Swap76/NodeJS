const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3 '},
];

app.get('/',(req, res) => {
    res.send("Hello World");
});

app.get('/NodeJS',(req, res)=> {
    res.send(courses);
});

app.post('/NodeJS',(req, res)=>{

    const valid = validateCourse(req.body);    
    if(valid.error){
        res.status(404).send(valid.error.details[0].message);
        return;
    }

    const course = {
        id: courses.length +1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
});

 app.put('/NodeJS/:id', (req, res)=>{

  var fcourse =  courses.find(c => c.id === parseInt(req.params.id));
    if(!fcourse){
        res.status(404).send("Course Id not found.");
        return;
    }

    const valid = validateCourse(req.body);
   
    if(valid.error){
        res.status(400).send(valid.error.details[0].message);
        return;
    }
    fcourse.name = req.body.name;
    
    res.send(courses);
 });

 function validateCourse(course){
    const schema ={
        name: Joi.string().min(5).required()
    };
    const valid = Joi.validate(course, schema); 
    return valid;
 }

app.get('/NodeJS/:id',(req, res)=> {
   const course = courses.find(c => c.id === parseInt(req.params.id));
   if(!course)
   res.status(404).send("Course with given id not found");
   else
   res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}.....`));
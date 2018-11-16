const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Debugger = require('debug')('app:dev');

const app=express();
app.use(express.json());
if(app.get('env') === 'development')
app.use(morgan('tiny'));

const port= process.env.PORT || 5000;

app.listen(port,() => {
    console.log(`Listning on port ${port}....`);
});

mongoose.connect('mongodb://localhost/Prcatice')
 .then(() => console.log('Connected to MongoDB....'))
 .catch(err => console.error('Could not connect to MongoDB...',err)); 

const courseSchema = mongoose.Schema({
    name: {
        type : String , 
        required: true,
        minlength: 5,
        maxlength: 10
    },
    index: Number,
    author: String,
    tags: {
        type: Array,
        validate:{
            isAsync: true,
            validator: function(v, callback){
                return (v && v.length >0);
            },
            message: 'A course should have atleast one tag.'
        }
    },
    date: { type: Date, default: Date.now}, 
    isPublished: Boolean,
    price: {
        type: Number,
        required: function(){
            return this.isPublished;
        },
        min: 10,
        max: 20
    }
 });

const Course = mongoose.model('Course', courseSchema);

app.get('/',(req,res) => {
    res.send("Hello to the World Courses !!!");
    Debugger('Landing Page Initiated....');
});

app.post('/Courses',async (req,res)=>{
        /*  const course = new Course({
            name: 'Android',
            index: 1,
           author: 'Rucha',
           tags: ['Frontend','Backend'],
           isPublished: true,
           price: 12
        }); */
        const course = new Course(req.body);
       try{
           const result = await course.save();
           console.log(result);
       }catch(ex){
           console.log(ex.message);
       }
       Debugger('New Course Added....');
    });

app.put('/Courses/:id',async (req,res)=>{
    
        const course = await Course.findByIdAndUpdate(req.params.id,{name: req.body.name},{
            new: true
        });
        if(!course){
            res.status(404).send("Course Id not found");
            return;
        }  
        course.name=req.body.name;
        res.send(course);
        Debugger('Course Modified....');
})

app.delete('/Courses/:id',(req,res)=>{
    
        const result = Course.findByIdAndRemove(req.params.id)
        if(!result){
            res.status(404).send("Course Id not found");
            return;
        }  
        Debugger('Course Removed ....');
})
app.get('/Courses/:id',async (req,res)=>{
   
        const course = await Course.findById(req.params.id)
            res.send(course);
});
app.get('/Courses',async (req,res)=>{
        const courses = await Course
        .find()
        res.send(courses);
});
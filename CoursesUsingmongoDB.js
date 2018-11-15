const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Debugger = require('debug')('app:dev');

const app=express();
app.use(express.json());
if(app.get('env') === 'development')
app.use(morgan('tiny'));

const port= process.env.PORT || 3000;

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

courseSchema.plugin(mongoosePaginate);
const Course = mongoose.model('Course', courseSchema);

app.use(function (req,res,next){
    console.log('Athenticating.....');
    next();
});

app.get('/',(_req,res) => {
    res.send("Hello to the World Courses !!!");
    Debugger('Landing Page Initiated....');
});

app.post('/Courses',(req,res)=>{
    async function createCourse(){
    
        /* const course = new Course({
            name: 'Android',
           author: 'Rucha',
           tags: ['Frontend','Backend'],
           isPublished: true,
           price: 12
        }); */
        const course = req.body;
       try{
           const result = await course.save();
           console.log(result);
       }catch(ex){
           console.log(ex.message);
       }
       Debugger('New Course Added....');
    }
        createCourse(); 
});

app.put('/Courses/:id',(req,res)=>{
    async function findCourseAndUpdate(){
        const course = await Course
        .find({index: {$eq : req.params.id}})
        if(!course){
            res.status(404).send("Course Id not found");
            return;
        }  
        course.name=req.body.name;
        res.send(course);
        Debugger('Course Modified....');

    }
    findCourseAndUpdate();

})

app.delete('/Courses/:id',(req,res)=>{
    async function findCourseAndDelete(){
        const course = await Course
        .find({index: {$eq : req.params.id}})
        if(!course){
            res.status(404).send("Course Id not found");
            return;
        }  
        Course.findByIdAndRemove(course._id);
        Debugger('Course Removed ....');

    }
    findCourseAndDelete();

})
app.get('/Courses/:id',(req,res)=>{
    async function findCourse(){
        const course = await Course
        .find({index: {$eq : req.params.id}})
        console.log(course);
    }
    findCourse();
});
app.get('/Courses',(_req,res)=>{
    async function getCourse(){
        const courses = await Course
        .find()
      console.log(courses);
      }
      getCourse();
});
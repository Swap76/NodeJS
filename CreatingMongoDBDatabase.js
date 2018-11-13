const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
 .then(() => console.log('Connected to MongoDB....'))
 .catch(err => console.error('Could not connect to MongoDB...',err)); 


 const courseSchema = mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now},
    isPublished: Boolean
 });

 async function createCourse(){
    
 const Course = mongoose.model('Course', courseSchema);
 const course = new Course({
    name: 'NodeJS',
    author: 'Swapnil',
    tags: ['Frontend','Backend'],
    isPublished: true
 });

 const result = await course.save();
 console.log(result);
 }
 
 createCourse();
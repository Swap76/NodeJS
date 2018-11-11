const Joi = require('joi');

const express = require('express');
const app=express();
app.use(express.json());
const data =[
    {id:1,name:"swapnil", Email:"swapnilshinde2000@gmail.com"},
    {id:2,name:"swapnilCollage", Email:"swapnil.satish17@siesgst.ac.in"}
]

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Listning on port ${port}...!`);
});

app.post('/NodeJS',(req,res)=> {
    test={
        name: Joi.string().required().min(3)
    };
    const newdata={
        id: data.length+1,
        name:req.body.name,
        //Email:req.body.Email
    };

    //const result =validateName(newdata.name);

    const result=Joi.validate(this.newdata,test);    
    if(result.error) return res.send(error.details[0].message);
    data.push(newdata);
    res.send(data);

})

app.get('/NodeJS',(req,res)=>{
    res.send(data);
});

app.get('/NodeJS/:id',(req,res)=>{
    const Course=data.find(c=>c.id===parseInt(req.params.id));
    if(!Course){
        res.status(404).send("Course Id not found");
        return;
    }
    res.send(Course);
});

app.put('/NodeJS/:id',(req,res)=>{
    const Course=data.find(c=>c.id===parseInt(req.params.id));
    if(!Course){
        res.status(404).send("Course Id not found");
        return;
    }

    newdata={
        name:req.body.name
    };
    test={
        name: Joi.string().required().min(3)
    } ;
    const {error}=Joi.validate(req.body.name,test);    
    if(error) return res.send(error.details[0].message);

    Course.name=newdata.name;
    res.send(data);

})

/*function validateName(val){
    test={
        name: Joi.string().required().min(3)
    } 
    
    return Joi.validate(val,test);        
}*/




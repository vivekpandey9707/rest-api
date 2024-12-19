const { log } = require('console');
const express = require('express');
const app = express();
const port = 8080;
const path = require('path');


const methodOverride = require('method-override')



app.use(methodOverride('_method'))

const { v4: uuidv4 } = require('uuid');
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log('listen to port: 8080')
});

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

let posts=[{
    id:uuidv4(),
    username:"apnacollage",
    content:"hello collage",
},
{         id:uuidv4(),
    username:"apnacollage",
    content:"i love my collage"
},
{   id:uuidv4(),
    username:"apnacollage",
    content:"i love my collage",
}

]
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});
app.post("/posts",(req,res)=>{
let {username,content}=req.body;

let id=uuidv4();
posts.push({id,username,content});
// res.send("post created");
res.redirect("/posts");
});
    
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id === p.id);
    console.log(post);
    res.render("show.ejs",{post});
    
res.send("show post");
});
    
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newcontent=req.body.content;
    let post=posts.find((p)=> id === p.id);
    post.content=newcontent;
    // res.send("update post");
    res.redirect("/posts");
    });


  

app.get("/posts/:id/edit",(req,res)=>{

    let{id}=req.params;
    let post=posts.find((p)=> id === p.id);
    res.render("edit.ejs",{post});

});

app.delete("/posts/:id",(req,res)=>{
    let{id}=req.params;
 posts=posts.filter((p)=> p.id !== id);
    res.redirect("/posts");
    
});
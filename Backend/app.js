const express=require('express');
const passport=require("passport");
const LocalStrategy=require("passport-local").Strategy;
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const {PrismaClient}=require("./generated/prisma")
const cors=require("cors")

const app=express();
const Prisma=new PrismaClient()

app.use(cors());
app.use(express.json())

passport.use(new LocalStrategy(
    async function(username,password,done){
        const user=await Prisma.user.findUnique({where : {username}});

        if(!user){return done(null,false)}

        const isvalid=await bcrypt.compare(password,user.password);

        if(!isvalid){return done(null,false)}

        return done(null,user);
    }
))

function AuthenticateToken(req,res,next){
const authheader=req.headers["authorization"];
if(!authheader){return res.status(401).json({message:"authentication token required"})}


const token=authheader.split(' ')[1]

if(!token){return res.status(401).json({message:"Token not provided"})}

jwt.verify(token,"A secret",(err,decoded) => {
    if(err){return res.status(401).json({message:"Invalid Token"})}

    req.user=decoded;
    next();
})
}

app.use(express.urlencoded({extended:true}))

app.get("/",(req,res) => res.send("working"));

app.get('/friends',AuthenticateToken,async (req,res) => {
const userWithFriends=await Prisma.user.findUnique({
    where : {
        id : req.user.id
    },
    include : {
        FriendRelationAsUser: {
        include : {
            friends_user:true,
        }}
    }
})
console.log(userWithFriends);
const friends = userWithFriends.FriendRelationAsUser.map(fr => fr.friends_user);

res.json({friends : friends});
})

app.post("/msgs",AuthenticateToken,async (req,res) => {
    const username=req.query.user;

    const msgs=await Prisma.user.findUnique({
        where : {username :username},
        include : {
            messageSent : true,
        }
    })
    console.log(msgs);
    res.json({messages : msgs});
})

app.post("/AddMsg",AuthenticateToken,async (req,res) => {
    await Prisma.message.create({
        data : {
            content:req.body.content,
            from:req.user.id,
            to:req.body.to,
        }
    })
    res.json({msg:"done"});
})

app.post("/signup",async (req,res) => {
    const username=await Prisma.user.findUnique({where : {username : req.body.username}});
    if(username){
        res.json({username_error:"username already exists"});
        return;
    }
    console.log(req.body.password)
    console.log(req.body.username)
    console.log(req.body.first)
    const hashed_pass=await bcrypt.hash(req.body.password,10);
    const newUser=await Prisma.user.create({
        data : {
        username:req.body.username,
        first:req.body.first,
        second:req.body.last,
        password:hashed_pass,
        }
    })
        await Prisma.friendRelations.createMany({
        data : [
            {userId:newUser.id,friendId:2},
            {userId:newUser.id,friendId:3},
            {userId:newUser.id,friendId:4},
        ],
        skipDuplicates:true,
    })

    await Prisma.message.createMany({
        data : [
            {content:"hi",from:newUser.id,to:2},
            {content:"How are You?",from:newUser.id,to:3},
            {content:"Wanna go to that concert?",from:newUser.id,to:4},
        ],

    })
})

app.post("/login",passport.authenticate("local",{session:false}),async (req,res) => {

    const username=await Prisma.user.findUnique({
        where : {id : req.user.id},
    })

    if(!username){return res.json({error_msq:"username does not exist"})}
    const isValid=bcrypt.compare(username.password,req.body.password);

    if(!isValid){return res.json({error_msg:"wrong password"})}

    const token=jwt.sign({id:req.user.id,username:req.user.username},"A secret",{expiresIn:"1h"});



    res.json({token});
})
app.post("/logout",(req,res) => {
    res.json({msg:"logout"});
})

app.listen(3000);
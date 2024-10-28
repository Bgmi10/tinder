const { PrismaClient } = require('@prisma/client');
const express  = require('express');
const app  = express();
const PORT = 3001 | process.env.PORT;



const prisma = new PrismaClient();

app.use(express.json());

app.post('/signup' , async  (req, res) => {

    const {username , email , password , age , gender} = await req.body;
 
    try{
        await prisma.user.create({
           data : {
            name : username,
            email : email,
            password : password,
            age : age,
            gender : gender
        }
       })
       res.json({
        message : 'user saved sucessfully'
       })
    }
     catch(E){
        res.json({
        message : 'something went wrong'
      })
    }
   
   
})

app.post('/user' , async (req,res) => {
    const {email , name} = await req.body;

    try { 
        const user = await prisma.user.findUnique({
           where : {
            email
           }
        })
                
        if (user) { 

            return res.json({
                message: 'User found',
                user: user
            });
        } else {
            return res.status(404).json({ 
                message: 'User not found'
            });
        }
    } catch (e) {
        console.error(e); 
        return res.status(500).json({ 
            message: 'An error occurred while searching for the user'
        });
    }
})


app.get('/getalluser' , async (req, res) => {
     const users = await prisma.user.findMany({})

     res.json({
        users : users
     })
})

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`)
}) 
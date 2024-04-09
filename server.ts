import express from 'express';
import { Request, Response } from 'express'
import { user } from './@types/user';
import { sign, decode } from 'jsonwebtoken';
import axios from 'axios';
const app = express();
app.use(express.json())

const PORT = 8000;

let users: user[] = [
    {
        id: 1,
        name: "admin",
        cpf: 123123123,
        password: "admin",
        job: "Hacker"
    },
    {
        id: 2,
        name: "John Doe",
        cpf: 456456456,
        password: "john123",
        job: "Script Kiddie"
    },
    {
        id: 3,
        name: "John Smith",
        cpf: 789789789,
        password: "smith456",
        job: "Not even a script kiddie"
    },
    {
        id: 4,
        name: "Kevin",
        cpf: 101010101,
        password: "kevin789",
        job: "Shellcoder"
    }
];

let tokens: any = [];

app.post('/login', (req: Request, res: Response) => {
    const { name, password } = req.body;
    const _user = users.find(user => {
        console.log('name:', name)
        console.log('userName:', user.name)
        return user.name === name
    })
    if (!_user) {
        console.log("Nome não encontrado!")
    }
    const user = users.find(user => {
        console.log('password:', password)
        console.log('userPassword:', user.password)

        return user.name == _user?.name && user.password == password
    })

    if (!user) {
        console.log("Senha errada")
    } else {
        const token = sign({}, "secret", {
            subject: user.name,
            expiresIn: 60,
        });
        tokens.push(token);
        return res.json(token);

    }
    console.log('teste');

    return res.end();

})

app.get('/users', (req: Request, res: Response) => {
    res.json(users);
});


app.get('/users/:id', (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    const user = users.find(user => user.id === userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
});

app.get('/check-url', async (req: Request, res: Response) => {
    // Get the URL from the request query parameters
    const url = req.query.url;
  
    // Check if URL is provided
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }
  
    try {
      // Send a request to the provided URL
      const response = await axios.get("url");
  
      // Return the response received from the URL
      res.json(response.data);
    } catch (error) {
      // If there's an error in the request to the URL
      console.error('Error fetching URL:', error.message);
      res.status(500).json({ error: 'Error fetching URL' });
    }
  });





app.listen(PORT, () => console.log(`Server listen in port ${PORT}`));
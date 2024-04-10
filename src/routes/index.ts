import { Router, Request, Response } from "express";
import { join } from "node:path";
import { User } from "../@types/user";
// import axios from "axios";
import { sign } from "jsonwebtoken";
import needle from "needle";

const fs = require('fs').promises; // Using fs.promises for asynchronous file operations

const router = Router();

const tokens = [];

let users: User[] = [
    {
        id: 1,
        name: "admin",
        cpf: 123123123,
        password: "0e1337",
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

// api endpoints
router.post("/login", (req: Request, res: Response) => {
    const { name, password } = req.body;
    const user = users.find(user => user.name === name)
    if (!user) {
        return res.status(401).json({ message: "Nome não encontrado!"});
    }
    const passwd = user.password
    console.log("password:", user.password, passwd)
    if (passwd != password) {
        return res.status(401).json({ message: "Senha errada"});
    }
    const token = sign({}, "secret", {
        subject: user.name,
        expiresIn: 60,
    });

    tokens.push(token);

    // localStorage.setItem('jwtToken', token);


    return res.status(200).json({ token });
});

// views
router.get("/", (_req: Request, res: Response) => {
    return res.sendFile(join(__dirname, "..", "..", "view", "index.html"))
});

router.get("/home", (_req: Request, res: Response) => {
    return res.sendFile(join(__dirname, "..", "..", "view", "home.html"))
});


router.get('/users', (req: Request, res: Response) => {
    res.json(users);
});

router.post('/comment', (req: Request, res: Response) => {
    const { prompt } = req.body;
    console.log(req.body)
    res.send( `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>You're not welcome</title>
        <link rel="stylesheet" href="/css/home.css">
    </head>
    
    <body>
        <div class="image-container">
            <img src="/images/hacking.png" alt="">
        </div>
        <div class="terminal-container">
            <div class="terminal">
                <form class="prompt" action="/api/comment" method="post">
                    <label for="prompt">~/root #</label>
                    <input name="prompt" id="prompt" class="block" />
                </form>
                <div class="comment-container">
                    <div class="comment">
                         > ${prompt}           
                    </div>

                </div>
            </div>
        </div>
    
    </body>
    
    </html>` )
});


router.get('/users/:id', (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    const user = users.find(user => user.id === userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
});

// router.post('/check-url', async (req: Request, res: Response) => {
//     // Get the URL from the req query parameters
//     const url = req.query.url;
  
//     // Check if URL is provided
//     if (!url) {
//       return res.status(400).json({ error: 'URL is required' });
//     }
  
//     try {
//       // Send a req to the provided URL
//       const res = await axios.get("url");
  
//       // Return the res received from the URL
//       res.(res.data);
//     } catch (error: unknown) {
//       // If there's an error in the req to the URL
//       console.error('Error fetching URL:');
//       res.status(500).json({ error: 'Error fetching URL' });
//     }
//   });

  router.get('/read-file', async (req: Request, res: Response) => {
    try {
      // Get the file path from the query parameters
      const filePath = req.query.path;
      console.log("filePath:", filePath)
  
      // Check if the file path is provided
      if (!filePath) {
        return res.status(400).json({ error: 'File path is required' });
      }
  
      // Read the file asynchronously
      const fileContent = await fs.readFile(filePath, 'utf8');
  
      // Send the file content in the res
      res.send(fileContent);
    } catch (error) {
      // If there's an error reading the file, send an error res
      console.error('Error reading file:', error);
      res.status(500).json({ error: 'Error reading file' });
    }
  });

  router.get('/check-url', async (req: Request, res: Response) => {
    var params = req.params;
    if (req.query['mime'] == 'plain'){
      var mime = 'plain';
        } else {
      var mime = 'html';
        };
        if (req.query['url']) {
            var url = req.query['url'];
            needle.get(url, { timeout: 3000 }, function(error: any, res1: { statusCode: number; body: any; }) {
                if (!error && res1.statusCode == 200) {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write('<!DOCTYPE html>\n<html>\n<head>\n<style>\n');
                    res.write('body { background-color: black; color: #0a0; }\n');
                    res.write('</style>\n</head>\n<body>\n');
                    res.write('<h1>Welcome to check url feature!</h1>\n\n');
                    const teste = 'url'
                    res.write('<h2>I am an application. I want to be useful, so I requested: <font color="red">' + teste + '</font> for you\n</h2><br><br>\n\n\n');
                    console.log(res1.body);
                    res.write(res1.body);
                    res.write('\n</body>\n</html>');
                    res.end();
                } else {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.write('<!DOCTYPE html>\n<html>\n<head>\n<style>\n');
                    res.write('body { background-color: black; color: #0a0; }\n');
                    res.write('</style>\n</head>\n<body>\n');
                    res.write('<h1>Welcome to check url feature!</h1>\n\n');
                    res.write('<h2>I wanted to be useful, but I could not find: <font color="red">' + url + '</font> for you\n</h2><br><br>\n\n\n');
                    res.write('\n</body>\n</html>');
                    res.end();
                    console.log('error')
                }
            });
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('<!DOCTYPE html>\n<html>\n<head>\n<style>\n');
            res.write('body { background-color: black; color: #0a0; }\n');
            res.write('</style>\n</head>\n<body>\n');
            res.write('<h1>Welcome to check url feature!</h1>\n\n');
            res.write('<h2>I am an application. I want to be useful, so if you specify the url parameter, I\'ll req the page for you:</h2><br><br>\n\n\n');
            res.write('<h2>Example: http://domain/api/check-url?url=https://</h2><br><br>\n\n\n');
            res.write('\n</body>\n</html>');
            res.end();
        }
        

    console.log('New req: '+req.url);


  
})

export { router };


// TODO whitelist for this route 
// curl "http://localhost:8000/read-file?path=/etc/passwd"

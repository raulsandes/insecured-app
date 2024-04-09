import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { User } from "../@types/user";

const users: User[] = [];

// const admin: User = {
//     name: "admin",
//     password: "admin",
//     cpf: 32165498765,
//     job: "dev"
// };

// users.push(admin);

const tokens = [];

const authController = (req: Request, res: Response) => {
    const { name, password } = req.body;
    const user = users.find(user => user.name === name)
    if (!user) {
        return res.status(401).json({ message: "Nome não encontrado!"});
    }
    if (user.password == password) {
        return res.status(401).json({ message: "Senha errada"});
    }
    const token = sign({}, "secret", {
        subject: user.name,
        expiresIn: 60,
    });

    tokens.push(token);

    return res.status(200).json({ token });
}

export { authController };
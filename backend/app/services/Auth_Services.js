import prisma from '../../db.js';
import express from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import zod from 'zod'

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;








export const SignInService = async (email, password) => {

    try {


        const find_user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        })

        if (!find_user) {
            throw new Error("Credentails Wrong")
        }

        const password_check = await bcrypt.compare(password, find_user.password)


        if (!password_check) {
            throw new Error("Credentails Wrong")
        }

        const details = {
            user_id: find_user.userId,
            username: find_user.username,
            email: find_user.email,
        }

        const token = jwt.sign(details, JWT_SECRET, { expiresIn: "7d" })

        return token

    }
    catch (er) {


        throw er

    }
}


export const SignUpService = async (email, username, password) => {

    try {

        const find_user = await prisma.user.findUnique({
            where: {
                email,
            }
        })


        if (find_user) {
            throw new Error("Email Already registred...")
        }

        const find_username = await prisma.user.findUnique({
            where: {
                username: username,
            },
        })

        if (find_username) {
            throw new Error("Username already taken")
        }

        const hashpassword = await bcrypt.hash(password, 10)

        const new_user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashpassword,
            },
        })

        return new_user
    } catch (er) {
        throw er
    }
}
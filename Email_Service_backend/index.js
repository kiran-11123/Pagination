import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import express from 'express'

const app = express();
app.use(express.json());

dotenv.config();

const MAIL_PASSWORD = process.env.GMAIL_APP_PASSWORD;



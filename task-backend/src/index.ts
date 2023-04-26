import express from 'express'
import { Root } from './utils/root.js'
const app=express()
export type AppType=typeof app
const PORT=8000
Root.setup(app,PORT)
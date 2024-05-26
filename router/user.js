import express from "express";
const router = express.Router();
const app = express();
import  { createPool } from "mysql2";
import  allItem from "../database/database.mjs";

// router.get('/', (req, res)=> {
//     res.send(allItem);
// });

module.exports = router;

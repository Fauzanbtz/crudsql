import express from "express";
const app = express();
const router = express.Router();
import mysql, { clearParserCache } from "mysql2";

const pool = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "userauth",
    connectionLimit: 10,
  })
  .promise();

//mendapatkan semua  data
export async function getAll() {
  const [result] = await pool.query("select * from users");
  return result;
}

//mendapatkan data sesuai no_pasien
export async function getId(id) {
  try {
    const [respond] = await pool.query(
      `SELECT * FROM users WHERE id = ?`, [id]
    );
    return respond[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
};

//menambahkan data
export async function addId(firstName, lastName, jenisKelamin) {
  try {
    const [respond] = await pool.query(
      `INSERT into users (firstName, lastName, jenisKelamin) VALUES (?, ?, ?)`, [firstName, lastName, jenisKelamin]
    )
    return respond;
  }catch (err) {
      console.log(err);
      throw err;
    }
}

//mengupdate data
export async function updateId(firstName, lastName, jenisKelamin, id) {
  try {
    const [respond] = await pool.query(
      `UPDATE users SET firstName=?, lastName=?, jenisKelamin=? WHERE id=?`, [firstName, lastName, jenisKelamin, id]
    )
    return respond;
  }catch (err) {
      console.log(err);
      throw err;
    }
};

//menghapus data sesuai id
export async function deleteId(id) {
  try {
    const [respond] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
    return respond;
  }catch (err) {
    console.log(err);
    throw err;
  }
};


router.get("/", (req, res) => {
  res.send("ini dari database");
});

export default pool;

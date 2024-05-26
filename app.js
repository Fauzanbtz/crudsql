import express from "express";
const app = express();
import bodyParser from "body-parser";
import { getAll, getId, addId, updateId, deleteId } from "./database/database.js";
const PORT = 5000;

app.get("/users", async (req, res) => {
  const respond = await getAll();
  res.send(respond);
});

app.use(bodyParser.json());

//mencari data pasien
app.get("/users/:id", async (req, res) => {
  const id  = req.params.id;
  try {
    const respond = await getId(id);
    res.send(respond);
  } catch (err) {
    res.status(500).send("Error retrieving user from the database");
  }
});

//membuat data baru
app.post("/users", async (req, res) => {
  try {
    const { firstName, lastName, jenisKelamin } = req.body;
    const respond = await addId(firstName, lastName, jenisKelamin);
    return res.status(200).json(respond);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//mengupdate data
app.patch("/users/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const { firstName, lastName, jenisKelamin } = req.body;
    const respond = await updateId(firstName, lastName, jenisKelamin, id);
    return res.status(200).json(respond);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//menghapus data sesuai id
app.delete("/users/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const respond = await deleteId(id)
    return res.status(200).json(respond);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "eror saat menghapus data" });
  }
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log(`server berjalan di port: ${PORT}`);
});

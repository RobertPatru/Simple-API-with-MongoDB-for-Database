const express = require("express");
const bodyParser = require("body-parser");
const { connect } = require("./db"); // Conectează-te la MongoDB
const { ObjectId } = require("mongodb");

const app = express();
const port = 3000;

app.use(bodyParser.json());

let db;

// Conectează-te la baza de date MongoDB înainte să înceapă serverul
connect().then((database) => {
	db = database;

	app.listen(port, () => {
		console.log(`Serverul rulează pe http://localhost:${port}`);
	});
});

// GET: Obține toate persoanele
app.get("/persoane", async (req, res) => {
	try {
		const persoane = await db.collection("persoane").find().toArray();
		res.json({ message: "Succes", data: persoane });
	} catch (error) {
		res.status(500).json({ error: "Eroare la obținerea persoanelor" });
	}
});

// GET: Obține o persoană după ID
app.get("/persoane/:id", async (req, res) => {
	try {
		const persoana = await db
			.collection("persoane")
			.findOne({ _id: new ObjectId(req.params.id) });
		if (!persoana) {
			return res.status(404).json({ error: "Persoana nu a fost găsită!" });
		}
		res.json({ message: "Succes", data: persoana });
	} catch (error) {
		res.status(500).json({ error: "Eroare la obținerea persoanei" });
	}
});

// POST: Creează o persoană nouă
app.post("/persoane", async (req, res) => {
	try {
		const { nume, prenume } = req.body;
		const result = await db.collection("persoane").insertOne({ nume, prenume });
		res.json({ message: "Persoană adăugată cu succes", data: result.ops[0] });
	} catch (error) {
		res.status(500).json({ error: "Eroare la adăugarea persoanei" });
	}
});

// PUT: Actualizează o persoană
app.put("/persoane/:id", async (req, res) => {
	try {
		const { nume, prenume } = req.body;
		const result = await db
			.collection("persoane")
			.updateOne(
				{ _id: new ObjectId(req.params.id) },
				{ $set: { nume, prenume } }
			);
		if (result.matchedCount === 0) {
			return res.status(404).json({ error: "Persoana nu a fost găsită!" });
		}
		res.json({ message: "Persoană actualizată cu succes" });
	} catch (error) {
		res.status(500).json({ error: "Eroare la actualizarea persoanei" });
	}
});

// DELETE: Șterge o persoană
app.delete("/persoane/:id", async (req, res) => {
	try {
		const result = await db
			.collection("persoane")
			.deleteOne({ _id: new ObjectId(req.params.id) });
		if (result.deletedCount === 0) {
			return res.status(404).json({ error: "Persoana nu a fost găsită!" });
		}
		res.json({ message: "Persoană ștearsă cu succes" });
	} catch (error) {
		res.status(500).json({ error: "Eroare la ștergerea persoanei" });
	}
});

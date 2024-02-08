// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import cors from "cors";
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytes,
	uploadBytesResumable,
} from "firebase/storage";
import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import admin from "firebase-admin";

dotenv.config();
const envFile = process.env;

const firebaseConfig = {
	apiKey: envFile.API_KEY,
	authDomain: envFile.AUTH_DOMAIN,
	databaseURL: envFile.DB_URL,
	projectId: envFile.PROJECT_ID,
	storageBucket: envFile.STORAGE_BUCKET,
	messagingSenderId: envFile.MESSAGING_SENDER_ID,
	appId: envFile.APP_ID,
	measurementId: envFile.MEASUREMENT_ID,
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
const storage = getStorage();
//express js server
const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//initialize multer
const multStorage = multer.memoryStorage();
const upload = multer({ storage: multStorage });

app.listen(PORT, () => {
	console.log(`App is running on ${PORT}`);
});

app.post("/api/upload", upload.single("video"), async (req, res) => {
	if (!req.file) {
		return res.status(400).send("No file uploaded.");
	}
	try {
		const storageRef = ref(storage, `videos/${req.file.originalname}`);
		const task = uploadBytesResumable(storageRef, req.file.buffer, {
			contentType: req.file.mimetype,
		});
		getDownloadURL(storageRef).then((url) =>
			res.status(201).send(`Upload successfully! Download URL: ${url}`)
		);
	} catch (error) {
		res.status(500).send(`Error: ${error}`);
	}
});

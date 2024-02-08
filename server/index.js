// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import cors from "cors";
import {
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
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
// const bucket = admin.storage().bucket();
// const analytics = getAnalytics(appFirebase);
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
/*
app.post("/api/uploads", async (req, res) => {
	const file = await req.body;
	const filename = req.headers["content-length"];
	const storageRef = ref(storage, filename);
	try {
		uploadBytesResumable(storageRef, file, {
			contentType: "application/octet-stream",
		});
		res
			.status(201)
			.send(
				`Success! Body ${JSON.stringify(file)}, header ${JSON.stringify(
					req.headers
				)}, file ${JSON.stringify(req.file)}`
			);
	} catch (err) {
		console.log(
			`Something's wrong. Body ${file}, header ${req.headers}, file ${req.file}`
		);
		res
			.status(501)
			.send(
				`Something's wrong. Body ${JSON.stringify(
					file
				)}, header ${JSON.stringify(req.headers)}, file ${JSON.stringify(
					req.file
				)}`
			);
	}
});
*/

app.post("/upload", upload.single("video"), async (req, res) => {
	if (!req.file) {
		return res.status(400).send("No file uploaded.");
	}

	try {
		const storageRef = ref(storage, req.file.filename);
		// const bucket = storageRef.bucket;
		// const blob = bucket.
		// const blobStream = blob.createWriteStream({
		// 	metadata: {
		// 		contentType: req.file.mimetype,
		// 	},
		// });

		// blobStream.on("error", (err) => {
		// 	res.status(500).send({ message: err.message });
		// });

		// blobStream.on("finish", () => {
		// 	// Assemble the file public URL
		// 	uploadBytes(storageRef, req.file, {
		// 		contentType: req.file.mimetype,
		// 	});
		// 	res
		// 		.status(200)
		// 		.send({ message: "File uploaded successfully", url: publicUrl });
		// });

		// blobStream.end(req.file.buffer);
		const blob = new Blob(req.file, { type: "video/webm;codecs=vp9,opus" });
		const task = uploadBytes(storageRef, blob, {
			contentType: req.file.mimetype,
		});
		task.on("error", (err) => {
			res.status(500).send({ message: err.message });
		});
		task.on("complete", () => {
			
		});
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
});

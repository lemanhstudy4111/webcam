// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import cors from "cors";
import {
	getDownloadURL,
	getStorage,
	ref as storageref,
	uploadBytesResumable,
} from "firebase/storage";
import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
} from "firebase/auth";
import { set, getDatabase, ref } from "firebase/database";

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
const storage = getStorage(appFirebase);
const realtimeDb = getDatabase(appFirebase);
const auth = getAuth(appFirebase);
let currUser = null;
onAuthStateChanged(auth, (user) => {
	if (user) {
		currUser = user;
	}
});

//express js server
const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//initialize multer
const multStorage = multer.memoryStorage();
const upload = multer({ storage: multStorage });
const formUpload = multer();

app.listen(PORT, () => {
	console.log(`App is running on ${PORT}`);
});

//upload api
/*
app.post(
	"/api/upload",
	upload.fields([
		{
			name: "video",
			maxCount: 1,
		},
		{
			name: "uid",
			maxCount: 1,
		},
	]),
	// upload.single("video"),
	async (req, res) => {
		if (!req.files["video"]) {
			// if (!req.file) {
			return res
				.status(400)
				.send(`No file uploaded. JSON: ${JSON.stringify(req.files["video"])}`);
		}
		try {
			const uid = req.body.uid;
			const video = req.files["video"][0];
			// const video = req.file;
			const storageRef = storageref(storage, `${uid}/${video.originalname}`);
			const task = await uploadBytesResumable(storageRef, video.buffer, {
				contentType: video.mimetype,
			});
			const downloadedURL = await getDownloadURL(storageRef);
			set(ref(realtimeDb, "videos/" + uid), {
				name: video.originalname,
				url: downloadedURL,
			});
		} catch (error) {
			res.status(500).send(`Error: ${error}`);
		}
	}
);
*/
//sign up api
app.post(
	"/api/sign-up",
	formUpload.fields([
		{ name: "email", maxCount: 1 },
		{ name: "password", maxCount: 1 },
	]),
	(req, res) => {
		if (!req.body) {
			return res.status(400).send("Unavailable user credential");
		}
		createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
			.then((userCred) => res.send(`userCred: ${JSON.stringify(userCred)}`))
			.catch((error) => {
				res.status(error.code).send(`Message: ${error.message}`);
			});
	}
);

//sign in api
app.post(
	"/api/sign-in",
	formUpload.fields([
		{ name: "email", maxCount: 1 },
		{ name: "password", maxCount: 1 },
	]),
	(req, res) => {
		if (!req.body) {
			return res.status(400).send("Unavailable user credential");
		}
		signInWithEmailAndPassword(auth, req.body.email, req.body.password)
			.then((userCred) => res.send(`userCred: ${userCred.user.uid}`))
			.catch((error) => {
				res.status(error.code).send(`Message: ${error.message}`);
			});
	}
);

//check if a user signed in
app.get("/api/get-token", (req, res) => {
	if (!currUser) {
		res.send("need to sign in");
	} else {
		res.send(currUser);
	}
});

//api upload
app.post(
	"/api/upload",
	upload.fields({ name: "video", maxCount: 1 }),
	async (req, res) => {
		if (!req.files["video"]) {
			return res
				.status(400)
				.send(`No file uploaded. JSON: ${JSON.stringify(req.files["video"])}`);
		}
		try {
			if (!currUser) {
				return res.send("Need to sign in before upload");
			}
			const uid = currUser.uid;
			const video = req.files["video"][0];
			const storageRef = storageref(storage, `${uid}/${video.originalname}`);
			const task = await uploadBytesResumable(storageRef, video.buffer, {
				contentType: video.mimetype,
			});
			const downloadedURL = await getDownloadURL(storageRef);
			set(ref(realtimeDb, "videos/" + uid), {
				name: video.originalname,
				url: downloadedURL,
			});
		} catch (err) {
			res.status(500).send(`Error: ${error}`);
		}
	}
);

app.post("/api/sign-out", (req, res) => {
	signOut(auth)
		.then(() => {
			res.status(200).send("Sign out successfully!");
		})
		.catch((err) => {
			res.status(500).send("Something happened when signing out...");
		});
});

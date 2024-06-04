import cors from "cors";
import express from "express";
import multer from "multer";
import Database from "./database/db.js";
import dotenv from "dotenv";
import { getUserFn, signIn, signOutFn, signUp } from "./src/auth.js";
import { uploadFn } from "./src/video.js";
import { onAuthStateChanged } from "firebase/auth";

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

//Initializing firebase database
const db = new Database(firebaseConfig);
const storage = db.getStorage();
const realtimeDb = db.getRealtimeDb();
const auth = db.getAuth();
let currUser = null;
onAuthStateChanged(auth, (user) => {
	if (user) {
		currUser = user;
	}
});

//initializing express.js app
const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(PORT, () => {
	console.log(`App is running on ${PORT}`);
});

//initializing multer storage
const multStorage = multer.memoryStorage();
const upload = multer({ storage: multStorage });
const formUpload = multer();

//auth api
app.post(
	"/api/sign-up",
	formUpload.fields([
		{ name: "email", maxCount: 1 },
		{ name: "password", maxCount: 1 },
	]),
	(req, res) => signUp(auth, req, res)
);

app.post(
	"/api/sign-in",
	formUpload.fields([
		{ name: "email", maxCount: 1 },
		{ name: "password", maxCount: 1 },
	]),
	(req, res) => signIn(auth, req, res)
);

app.post("/api/sign-out", (_, res) => signOutFn(res));

app.get("/api/get-token", (_, res) => getUserFn(res, currUser));

//video upload api
app.post(
	"/api/upload",
	upload.fields([
		{
			name: "video",
			maxCount: 1,
		},
	]),
	(req, res) => {
		if (!req.files["video"]) {
			// if (!req.file) {
			return res
				.status(400)
				.send(`No file uploaded. JSON: ${JSON.stringify(req.files["video"])}`);
		}
		uploadFn(req, res, currUser, storage, realtimeDb);
	}
);

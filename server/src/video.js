import {
	uploadBytesResumable,
	getDownloadURL,
	ref as storageref,
} from "firebase/storage";

export async function uploadFn(req, res, currUser, storage, realtimeDb) {
	/*
	if (!req.files["video"]) {
		// if (!req.file) {
		return res
			.status(400)
			.send(`No file uploaded. JSON: ${JSON.stringify(req.files["video"])}`);
	}
    */
	try {
		console.log(currUser);
		const uid = currUser.uid;
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

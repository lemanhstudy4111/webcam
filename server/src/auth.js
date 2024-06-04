import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
} from "firebase/auth";

export function signIn(auth, req, res) {
	if (!req.body) {
		return res.status(400).send({ message: "Unavailable user credential" });
	}
	return signInWithEmailAndPassword(auth, req.body.email, req.body.password)
		.then((userCred) => {
			res.send({ message: `userCred: ${userCred.user.uid}` });
			return res.status(200);
		})
		.catch((err) => {
			res.send({ statusCode: err.code, message: err.message });
			return err.code;
		});
}

export function signUp(auth, req, res) {
	if (!req.body) {
		return res.status(400).send({ message: "Unavailable user credential" });
	}
	return createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
		.then((userCred) => {
			res.send({ message: userCred.user.uid });
			return res.status(200);
		})
		.catch((error) => {
			res.send({ statusCode: error.statusCode, message: error.message });
			return error.code;
		});
}

export function getUserFn(res, currUser) {
	if (!currUser) {
		res.send("need to sign in");
	} else {
		res.send(currUser);
	}
}

export function signOutFn(res) {
	signOut(auth)
		.then(() => {
			res.status(200).send("Sign out successfully!");
		})
		.catch((err) => {
			res.status(500).send("Something happened when signing out...");
		});
}

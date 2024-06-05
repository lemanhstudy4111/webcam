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
		return { message: "need to sign in", user: -1, isSignedIn: 0 };
	} else {
		return { user: currUser, isSignedIn: 1 };
	}
}

export function signOutFn(res) {
	signOut(auth)
		.then(() => {
			res.send({ message: "Sign out successfully!", success: 1 });
		})
		.catch((err) => {
			res.send({
				message: "Something happened when signing out...",
				success: 0,
			});
		});
}

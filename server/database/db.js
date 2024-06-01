import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

class Database {
	constructor(firebaseConfig) {
		this.appFirebase = initializeApp(firebaseConfig);
		/*
		this.storage = null;
		this.realtimeDb = null;
		this.auth = null;
		*/
		this.storage = getStorage(this.appFirebase);
		this.realtimeDb = getDatabase(this.appFirebase);
		this.auth = getAuth(this.appFirebase);
	}
	getStorage() {
		// this.storage = getStorage(this.appFirebase);
		return this.storage;
	}
	getRealtimeDb() {
		// this.realtimeDb = getDatabase(this.appFirebase);
		return this.realtimeDb;
	}
	getAuth() {
		// this.auth = getAuth(this.appFirebase);
		return this.auth;
	}
	getUser() {
		// onAuthStateChanged(auth, (user) => {
		// 	if (user) {
		// 		this.user = user;
		// 	}
		// });
		return this.user;
	}
}

export default Database;

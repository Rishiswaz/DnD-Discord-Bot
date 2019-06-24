const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
const NodeCache = require( "node-cache" );

// Connect to the database
const app = admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://dndbot-5c565.firebaseio.com"
});
const db = admin.database(app);
// Initialize the cache
const dbCache = new NodeCache( { stdTTL: 600, checkperiod: 600 } );

function get(key){
	return new Promise(function(resolve, reject){
		// Attempt to get the cached value
		var cachedValue = dbCache.get(key);
		if (cachedValue == undefined){
			// Attempt to get the value from the db
			var ref = db.ref(key);
			ref.on("value", function(snapshot) {
				var dbValue = snapshot.val();
				dbCache.set(key, dbValue);
				resolve(dbValue);
			}, function (err) {
				reject(err);
			});
		} else {
			resolve(cachedValue);
		}
	});
}

function put(key, value){
	return new Promise(function(resolve, reject){
		// Attempt to put the value in the db
		var ref = db.ref(key);
		ref.on("value", function(snapshot) {
			ref.set(value);
			// Update the cache
			dbCache.set(key, value);
			resolve();
		}, function (err) {
			reject(err);
		});
	});
}

module.exports = {
	get: get,
	put: put,
}
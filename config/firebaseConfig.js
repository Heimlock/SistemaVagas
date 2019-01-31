
//  Dependecies
const admin             = require("firebase-admin");
let   serviceAccount    = require("./firebaseKey.json");

//  Connect to Firebase SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

//  Connect to FireStore
let     db =   admin.firestore();

module.exports  =   db;
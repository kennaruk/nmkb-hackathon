var firebase = require("firebase");

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCx9c1uMrMgRYZdpZ0hn1F7JCiZ27RPeEg",
  authDomain: "nmkb-hackathon.firebaseapp.com",
  databaseURL: "https://nmkb-hackathon.firebaseio.com",
  projectId: "nmkb-hackathon",
  storageBucket: "nmkb-hackathon.appspot.com",
  messagingSenderId: "1090921490709"
};
firebase.initializeApp(config);

var database = firebase.database();

exports.writeUserData = function(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture : imageUrl
    });
}

exports.readUserData = function() {
    var starCountRef = firebase.database().ref('posts/' + postId + '/starCount');
    starCountRef.on('value', function(snapshot) {
        updateStarCount(postElement, snapshot.val());
    });
}
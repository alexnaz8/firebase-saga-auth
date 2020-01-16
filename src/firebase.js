import firebase from "firebase"
        const firebaseConfig = {
        apiKey: "AIzaSyDEFDGeqZfHfFsObNryHL1pVwo21KDFoug",
        authDomain: "redux-saga-firebase-9fe8a.firebaseapp.com",
        databaseURL: "https://redux-saga-firebase-9fe8a.firebaseio.com",
        projectId: "redux-saga-firebase-9fe8a",
        storageBucket: "redux-saga-firebase-9fe8a.appspot.com",
        messagingSenderId: "614863852779",
        appId: "1:614863852779:web:9bce4da22b1b59bc821aae"
    };
        firebase.initializeApp(firebaseConfig);
export default firebase;
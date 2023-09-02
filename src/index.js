import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCT0-oD4xfQFl9Hb3xrykSEgkNAoXx4Uw",
  authDomain: "react-chat-app-e9df1.firebaseapp.com",
  databaseURL: "https://react-chat-app-e9df1-default-rtdb.firebaseio.com",
  projectId: "react-chat-app-e9df1",
  storageBucket: "react-chat-app-e9df1.appspot.com",
  messagingSenderId: "881537595428",
  appId: "1:881537595428:web:2453e19dc8d5a5f28cc0b1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

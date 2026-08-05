import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBACwgDPedagiGeYQPMyyq-QUgN5XDFCYo",
  authDomain: "ai-mock-interview-d7af6.firebaseapp.com",
  projectId: "ai-mock-interview-d7af6",
  storageBucket: "ai-mock-interview-d7af6.firebasestorage.app",
  messagingSenderId: "873760461882",
  appId:"1:873760461882:web:ff0fe7e1e30874bc16d103",
  measurementId: "G-T6FQLKDT6Q"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };

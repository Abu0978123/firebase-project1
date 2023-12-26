import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../config/firebase";

const Auth = () => {


  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
//   sign with email password
 console.log(auth?.currentUser?.email)
  const sign = async() => {
    await createUserWithEmailAndPassword(auth, email, password)
    .then(res => console.log(res))
    .catch(err => console.log(err.message))
  };

//   sign in with google
  const signInWithGoogle = async() => {
    await signInWithPopup(auth,provider)
    .then(res => console.log(res))
    .catch(err => console.log(err.message))
  }

//   logout here
const logout = async() => {
    await signOut(auth)
    .then(() => console.log("log out successfully"))
    .catch(err => console.log(err.message))
}
  return (
    <div>
      <input
        type="text"
        placeholder="Email..."
        onChange={(e) => setEmail(e.target.value)}
      />
      <input type="password" 
      placeholder="Password..." 
      onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={sign}>sign in </button>
      <button onClick={signInWithGoogle}>sign in with Google </button>
      <button onClick={logout}>Log out</button>
    </div>
  );
};

export default Auth;

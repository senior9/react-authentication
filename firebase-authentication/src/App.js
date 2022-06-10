import React, { useState } from 'react';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import './App.css';
import intialize from './firebase.sdk';

intialize();
const provider = new GoogleAuthProvider();
const gitProvider = new GithubAuthProvider();
function App() {
  const [user,setUser] = useState({});
  const auth = getAuth();
  const handleGoogleSignIn = ()=>{
    console.log("SignIn Clicked");
    signInWithPopup(auth,provider)
    .then(res=>{
      const {displayName,email,photoURL} = res.user
      console.log(res.user);
      const signInUser = {
        name: displayName,
        Email: email,
        Photo:photoURL
      }
      setUser(signInUser);
    })
    .catch(err=>{
      console.log(err);
    })
  }
  const handleGoogleSignOut=()=>{
    signOut(auth)
    .then(() =>{
      setUser({});
    })
  }
  const handleGithubSignIn =()=>{
    signInWithPopup(auth,gitProvider)
    .then(res =>{
      const {displayName,email,photoURL} = res.user
      console.log(res.user);
      const signInUser = {
        name: displayName,
        Email: email,
        Photo:photoURL
      }
      setUser(signInUser);
    })
  }
  return (
    <div className="App">
      
     {!user.name? <div>
      <button onClick={handleGoogleSignIn}> Sign In Google</button>
      <button onClick={handleGithubSignIn}> Sign In Github</button>
     </div>:
      <button onClick={handleGoogleSignOut}> Sign Out Google </button>}
      <br/>
      {
        user.name && <div>
          <h1>User Display : {user.name}</h1>
          <h3>User Email : {user.Email}</h3>
          <img src={user.Photo} alt="" />
        </div>
      }
      
    </div>
  );
}
export default App;

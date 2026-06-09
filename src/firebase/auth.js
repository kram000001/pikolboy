import {
  signInWithPopup,
  signOut
} from "firebase/auth";


import {
  auth,
  provider
} from "./config";



export async function login(){

  const result =
    await signInWithPopup(
      auth,
      provider
    );


  return result.user;

}



export function logout(){

  return signOut(auth);

}
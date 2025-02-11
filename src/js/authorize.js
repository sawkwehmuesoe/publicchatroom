import { auth } from "./firebase.js"
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { sendPasswordResetEmail ,onAuthStateChanged } from "firebase/auth";
import { updateProfile } from "firebase/auth";

export function Authorize() {

    // Signup 
    const registerUser = async (fullname, email, password) => {

        const defaultprofileimg = "https://static.thenounproject.com/png/65476-200.png";

        try {

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // console.log(user);

            await updateProfile(auth.currentUser, {
                displayName: fullname,
                photoURL: defaultprofileimg,
              }).then(() => {
                    // Redirect to index.html

                    setLocalName(fullname)
                    window.location.href = "../index.html";
              })

  

        } catch (error) {
            console.log("Error registering users : ", error);
        }

    }

    // Signin 

    const loginUser = (email, password) => {

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                // const user = userCredential.user;

                setLocalName(userCredential.user)

                // Redirect to index.html
                window.location.href = "../index.html";
            })
            .catch((error) => {
                // const errorCode = error.code;
                // const errorMessage = error.message;

                console.log("Error registering users : ", error.message);
            });
    }

    // Signout 

    const logoutUser = () => {

        signOut(auth)
            .then(() => {
                unsetLocalName();

                window.location.href = "../signin.html";
            }).catch((error) => {
                console.log("Error Logging out = ", error.message);
            });
    }

    // Reset Password 

    const resetPassword = async (email, msg) => {

        try {

            await sendPasswordResetEmail(auth, email);

            msg.textContent = "Password reset email send. Please check your inbox";
            msg.style.color = "green";
            msg.style.fontSize = "11px";

        } catch (error) {
            console.log('Error sending password reset email = ', error.message);

            msg.textContent = `Error : ${error.message}`;
            msg.style.color = "red";
            msg.style.fontSize = "11px";
        }
    }
    
    // Google Signin 

    const googleLogin = () => {

        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                // console.log(result);

                // set name to localStorage 
                setLocalName(result.user.displayName)

                // Redirect ot index.html
                window.location.href = "../index.html";
            }).catch((error) => {
                console.log("Error Sign in = ", error.message);
            });

    }

    // Auth Check 

    const isLoggedIn = () => {

        onAuthStateChanged(auth, (userdata) => {
            if (userdata) {
               
                return true;
            } else {
                // User is signed out
                window.location.href = "../signin.html";
            }
        });

    }

    // Get User Info 

    const getUser = (callback) => {
        // callback("Hello Sir");

        onAuthStateChanged(auth, (userdata) => {
            if (userdata) {
               
                callback(userdata)
            } 
        });
    }


    const setLocalName = (userdata)=>{
        localStorage.setItem('username',userdata.displayName);
    }

    const unsetLocalName = ()=>{
        localStorage.removeItem('username');
    }

    return { registerUser, loginUser, logoutUser, resetPassword, googleLogin, isLoggedIn, getUser }

}
import { app } from "./firebase-config";
import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

class AuthService {
  auth;
  constructor() {
    this.auth = getAuth(app);
  }

  async createNewUser({ email, password, displayName, photoURL }) {
    try {
      const response = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      console.log(response.user.uid);

      if (response.user.uid) {
        this.updateUserProfile(displayName, photoURL);
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  async loginUser({ email, password }) {
    try {
      const response = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      console.log(response);

      if (response) {
        return response;
      } else {
        return false;
      }
    } catch (error) {}
  }

  signOutUser() {
    try {
      const response = signOut(this.auth).then(() => true);
      if (response) return true;
    } catch (error) {
      console.log(error);
    }
  }

  async updateUserProfile(displayName = "Nigga", photoURL = "") {
    try {
      const response = await updateProfile(this.auth.currentUser, {
        displayName,
        photoURL,
      });

      if (response) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const authService = new AuthService();
export default authService;

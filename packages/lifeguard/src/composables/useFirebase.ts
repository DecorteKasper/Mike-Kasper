import { initializeApp } from 'firebase/app'
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  updatePassword,
  deleteUser,
  type User,
} from 'firebase/auth'
// import firebase from 'firebase/compat/app'
import { ref } from 'vue'

// Een test

// Shared state
const app = initializeApp({
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId,
})

const auth = getAuth(app)
setPersistence(auth, browserLocalPersistence) // Keep track of logged in user in the browser

const firebaseUser = ref<User | null>(auth.currentUser)


const login = async (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        firebaseUser.value = userCredential.user
        resolve(userCredential.user)
      })
      .catch(error => {
        reject(error)
      })
  })
}

const register = async (
  name: string,
  email: string,
  password: string,
): Promise<User> => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        firebaseUser.value = userCredential.user
        updateProfile(firebaseUser.value, { displayName: name })
        resolve(userCredential.user)
      })
      .catch(error => {
        reject(error)
      })
  })
}

const resetPassword = async (email: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        resolve()
      })
      .catch(error => {
        reject(error)
      })
  })
}

const restoreUser = async (): Promise<User | null> => {
  return new Promise(resolve => {
    onAuthStateChanged(auth, user => {
      if (user) {
        firebaseUser.value = user
        resolve(user)
      } else {
        firebaseUser.value = null
        resolve(null)
      }
    })
  })
}

const logout = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    signOut(auth)
      .then(() => {
        firebaseUser.value = null
        resolve()
      })
      .catch(error => {
        reject(error)
      })
  })
}

// Update password

const updatepassword = async (currentPassword: string, newPassword: string): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!firebaseUser.value || !firebaseUser.value.email) {
        reject(new Error('User not authenticated or missing email'));
        return;
      }

      const { email } = firebaseUser.value;

      // Verifieer het huidige wachtwoord
      await signInWithEmailAndPassword(auth, email, currentPassword);

      // Als de verificatie slaagt, bijwerk het wachtwoord
      await updatePassword(firebaseUser.value, newPassword);
      console.log('Wachtwoord succesvol bijgewerkt');
      resolve();
    } catch (error: any) {
      console.error('Fout bij het bijwerken van het wachtwoord', error);
      reject(error);
    }
  });
};

// Delete account

const deleteAccount = async (): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      // Check of de gebruiker is ingelogd
      if (!firebaseUser.value) {
        reject(new Error('User not authenticated'));
        return;
      }
      // Verwijder de gebruiker
      await deleteUser(firebaseUser.value);
      console.log('Account succesvol verwijderd');
      resolve();
    } catch (error: any) {
      console.error('Fout bij het verwijderen van het account', error);
    }
  });
}


export default () => {
  // State for each composable
  return {
    firebaseUser,

    login,
    logout,
    register,
    resetPassword,
    restoreUser,
    updatepassword,
    deleteAccount,
  }
}
import { UserData } from "../../model/UserData";
import { FacebookAuthProvider, GoogleAuthProvider, User, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, sendEmailVerification, signInWithPopup } from 'firebase/auth'
import { CollectionReference, DocumentReference, collection, doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'
import appFirebase from "../../config/firebase-config";
import { LoginData } from "../../model/LoginData";
import { error } from "console";
import Auth from "./Auth";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/slices/AuthSlice";

export const UID = 'uid-token'

export default class AuthServiceFire implements Auth {
    private users: CollectionReference = collection(getFirestore(appFirebase), 'users');
    private administrators = collection(getFirestore(appFirebase), 'administrators');

    private mapProviders = new Map([
        ['GOOGLE', new GoogleAuthProvider()],
        ['FACEBOOK', new FacebookAuthProvider()]
    ])
    private auth = getAuth(appFirebase);

    private async isAdmin(uid: string) {
        const docRef = doc(this.administrators, uid)
        return (await getDoc(docRef)).exists()
    }

    async login(loginData: LoginData): Promise<UserData> {
        let userData: UserData = null;
        try {
            const userCredential = !loginData.password ?
                await signInWithPopup(this.auth, this.mapProviders.get(loginData.email)!) :
                await signInWithEmailAndPassword(this.auth, loginData.email,loginData.password);
            const user = userCredential.user;
            if (! await this.isAdmin(user.uid)) {
                const doc = await getDoc(this.getDocRef(user.uid));
                userData = doc.data() as UserData;
            } else {
                userData = {
                    email: user.email!,
                    role: 'admin'
                }
            }

            localStorage.setItem(UID, user.uid)
        } catch (error: any) {

        }
        return userData;
    }

    async signUp(loginData: LoginData, userData: UserData): Promise<void> {
        const userCredential = await createUserWithEmailAndPassword(this.auth, loginData.email, loginData.password);
        const user = userCredential.user;
        sendEmailVerification(user)
            .then(() => {
                console.log('Check email for verification')
            })
            .catch((error => {
                console.log("Mistake with sending email")
            }))
        const doc = this.getDocRef(user.uid);
        try {
            await setDoc(doc, userData)
        } catch (error) {
            console.log('error ')
        }

    }

    async updateUser(userData: UserData, uid: string): Promise<UserData> {
        const docRef = this.getDocRef(uid);
        if (!await this.exists(uid)) {
            throw 'Not found'
        }
        try {
            await setDoc(docRef, userData)
        } catch (error: any) {
            // const firestoreError: FirestoreError = error;
            // const errorMessage = getErrorMessage(firestoreError)
            throw error;
        }
        return userData;
    }

    private async exists(id: string): Promise<boolean> {
        const docRef: DocumentReference = this.getDocRef(id);
        const docSnap = await getDoc(docRef);
        return docSnap.exists();
    }

    private getDocRef(id: string): DocumentReference {
        return doc(this.users, id);
    }

    logout(): Promise<void> {
        localStorage.removeItem(UID);
        return signOut(this.auth)
    }

    getAvailableProvider(): { providerName: string; providerIconUrl: string; }[] {
        return [
            { providerName: 'GOOGLE', providerIconUrl: "https://img.icons8.com/color/2x/google-logo.png" },
        ]
    }

}


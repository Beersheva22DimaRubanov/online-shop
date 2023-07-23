import { Observable, catchError, of, filter } from "rxjs";
import { Order } from "../../model/Order";
import OrderService from "./OrderService";
import { DocumentReference, FirestoreError, collection, deleteDoc, doc, getDoc, getFirestore, query, setDoc, where } from "firebase/firestore";
import firebaseApp from "../../config/firebase-config"
import { getRandomInt } from "../../util/random";
import { collectionData } from "rxfire/firestore";

export const MIN_ID = 100000
export const MAX_ID = 1000000

function getErrorMessage(firestoreError: FirestoreError): string {
    let errorMessage = '';
    switch (firestoreError.code) {
        case 'unauthenticated':
        case 'permission-denied': errorMessage = "Authentication"; break;
        default: errorMessage = firestoreError.message
    }
    return errorMessage;
}

export default class OrderServiceFire implements OrderService{
    private collectionRef =  collection(getFirestore(firebaseApp), 'orders');

    private getDocRef(id: any){
        return doc(this.collectionRef, id);
    }

    private async exists(id: string): Promise<boolean> {
        const docRef: DocumentReference = this.getDocRef(id);
        const docSnap = await getDoc(docRef);
        return docSnap.exists();
    }

    private async getId(): Promise<string> {
        let id: string = '';
        do {
          id =  getRandomInt(MIN_ID, MAX_ID).toString()
        } while (await this.exists(id))
        return id;
    }


   async addOrder(order: Order): Promise<Order> {
        const id = await this.getId();
        const orderWithId = {...order, id};
        const doc = this.getDocRef(id);
        try{
            await setDoc(doc, orderWithId)
        }catch(error){

        }
        return order;
    }

    getOrders(uid: String| undefined): Observable<string | Order[]> {
        let queryId = null;
        if(uid){
            queryId = query(this.collectionRef, where('userId', '==', uid))
        }
        return collectionData(uid? queryId!: this.collectionRef).pipe(
            catchError(error => {
            const firestoreError: FirestoreError = error;
            const errorMessage = getErrorMessage(firestoreError);
            return of(errorMessage)
        })) as Observable<string | Order[]>
    }

   async deleteOrder(id: any): Promise<void> {
        const docref = this.getDocRef(id)
        if (!await this.exists(id)) {
            throw 'Not found'
        }
        try {
            deleteDoc(docref);
        } catch (error: any) {
            const firestoreError: FirestoreError = error;
            const errorMessage = getErrorMessage(firestoreError)
            throw errorMessage;
        }
    }

   async updateOrder(order: Order): Promise<Order> {
        const docRef = this.getDocRef(order!.id);
        if (!await this.exists(order!.id)) {
            throw 'Not found'
        }
        try {
            await setDoc(docRef, order)
        } catch (error: any) {
            const firestoreError: FirestoreError = error;
            const errorMessage = getErrorMessage(firestoreError)
            throw errorMessage;
        }
        return order;
    }
    
} 
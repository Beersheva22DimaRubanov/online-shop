import { Observable, catchError, of } from "rxjs";
import { Product } from "../../model/Product";
import ProductService from "./ProductsService";
import { DocumentReference, FirestoreError, collection, deleteDoc, doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import appFirebase from '../../config/firebase-config'
import { collectionData } from 'rxfire/firestore'
import { getRandomInt } from "../../util/random";
import { MIN_ID, MAX_ID } from "../orders/OrderServiceFire";



function getErrorMessage(firestoreError: FirestoreError): string {
    let errorMessage = '';
    switch (firestoreError.code) {
        case 'unauthenticated':
        case 'permission-denied': errorMessage = "Authentication"; break;
        default: errorMessage = firestoreError.message
    }
    return errorMessage;
}

export default class ProductServiceFire implements ProductService {
    private collectionRef = collection(getFirestore(appFirebase), 'products');

   async addProduct(product: Product): Promise<Product> {
        const newId = await this.getId();
        const currentProduct = {...product, id: newId}
        const doc = this.getDoc(currentProduct!.id)
        try{
            await setDoc(doc, currentProduct)
        } catch(error: any){
            const firestoreError: FirestoreError = error;
            const errorMessage = getErrorMessage(firestoreError)
            throw errorMessage;
        }
        return product;
    }

    private async exists(id: string): Promise<boolean> {
        const docRef: DocumentReference = this.getDoc(id);
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


    private getDoc(id: string) {
       return doc(this.collectionRef, id)
    }

    getProducts(): Observable<string | Product[]> {
        return collectionData(this.collectionRef).pipe(catchError(error => {
            const firestoreError: FirestoreError = error;
            const errorMessage = getErrorMessage(firestoreError);
            return of(errorMessage)
        })) as Observable<string | Product[]>
    }
   async deleteProduct(id: any): Promise<void> {
        const docref = this.getDoc(id)
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
   
   async updateProduct(product: Product): Promise<Product> {
        const docRef = this.getDoc(product!.id);
        if (!await this.exists(product!.id)) {
            throw 'Not found'
        }
        try {
            await setDoc(docRef, product)
        } catch (error: any) {
            const firestoreError: FirestoreError = error;
            const errorMessage = getErrorMessage(firestoreError)
            throw errorMessage;
        }
        return product;
    }

}


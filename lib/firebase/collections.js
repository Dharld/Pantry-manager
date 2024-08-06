import { firestore } from "@/firebase";
import { collection } from "firebase/firestore";

const products = collection(firestore, "inventory");
const categories = collection(firestore, "categories");

export { products as productsCollection, categories as categoriesCollection };

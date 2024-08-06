import { deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { productsCollection } from "./collections";
import { firestore } from "@/firebase";

const getCategoryFromId = async (id) => {
  // Get a reference to the category document by its ID
  const categoryRef = doc(firestore, "categories", id);

  // Fetch the document snapshot from the reference
  const categorySnap = await getDoc(categoryRef);
  // Return the data from the snapshot
  return categorySnap.data();
};

// Fetch all products
export const getProducts = async () => {
  const snapshot = await getDocs(productsCollection);

  // Map over the documents to create an array of promises
  const products = await Promise.all(
    snapshot.docs.map(async (doc) => {
      // Extract data from the current document
      const data = doc.data();

      // Get the category ID from the product data
      const categoryId = data.category.id;

      // Fetch the category data using the category ID
      const category = await getCategoryFromId(categoryId);

      // Return the product data along with the category details
      return {
        ...data,
        id: doc.id,
        category: {
          name: category.name,
          id: categoryId,
        },
      };
    })
  );

  // Return the array of products with their categories
  return products;
};

// Function to delete a product from Firestore
export const deleteProduct = async (id) => {
  try {
    // Create a reference to the product document
    const productRef = doc(productsCollection, id);
    // Delete the document from Firestore
    await deleteDoc(productRef);
    // Log success message
    console.log(`Product with ID ${id} successfully deleted.`);
    return true;
  } catch (error) {
    // Log error message if deletion fails
    console.error("Error deleting product:", error);
    // Re-throw the error for handling in the calling function
    throw error;
  }
};

// Function to add a new product to Firestore
export const addProduct = async (product) => {
  try {
    // Check if all required fields are present
    const requiredFields = [
      "name",
      "thumbnail",
      "size",
      "quantity",
      "retailPrice",
      "wholeSalePrice",
      "category",
    ];
    const missingFields = requiredFields.filter((field) => !product[field]);

    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
    }

    // Create a new document reference in the products collection
    const productRef = doc(productsCollection);
    // Set the document data with the provided product object
    await setDoc(productRef, product);
    // Return true if the operation was successful
    return true;
  } catch (error) {
    // Log any errors that occur during the process
    console.error("Error adding product:", error);
    // Re-throw the error for handling in the calling function
    throw error;
  }
};

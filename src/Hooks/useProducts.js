import { useState, useEffect } from "react";
import { collection , getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config"

export function useProducts ({tipo}){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);    
  
    useEffect(()=>{

      const fetchProducts = async () => {
        try {
          setLoading(true);                   

          if (!tipo) {  
            const productCollections = collection(db, "productos");
            const snapshot = await getDocs(productCollections);
            const data = snapshot.docs.map((doc) => ({id:doc.id, ...doc.data() }));  
            setProducts(data);
          }
          else
          {   
            const productByCategoryCollections = query(
              collection(db, "productos"),
              where("categoria", "==", tipo)
            );
            
            const snapshot = await getDocs(productByCategoryCollections);
            const data = snapshot.docs.map((doc) => ({id:doc.id, ...doc.data() }));
            setProducts(data);
          }
        } catch (error) {
          console.log(error);
        }
        finally{
          setLoading(false);
        }
      }
      fetchProducts();      
    }, [tipo])
  
    return { products, loading }
  }
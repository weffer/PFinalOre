import { useEffect, useState } from "react";
import { doc , getDoc } from "firebase/firestore";
import { db } from "../firebase/config"


export function useProductDetail({id}) {

  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {

    const fetchDetailProduct = async () => {
      try {
        setLoading(true);        
        const productoRef = doc(db, "productos", id);
        const snapshot = await getDoc(productoRef);

        if(snapshot.exists()){
          setDetail({id: snapshot.id, ...snapshot.data()})
        }
        
      } catch (error) {
        console.log(error);
      }
      finally{
        setLoading(false);
      }
    }    
    fetchDetailProduct();
  }, [id])

  return { detail, loading }
}
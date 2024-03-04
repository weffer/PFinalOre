import { useState } from "react";

export function useProductCount({detail}) {  
   
   const [ count, setCount ] = useState(0);

   const handleIncrement = (event)=> {
     event.preventDefault();
     
     if(count < detail?.stock)     
      setCount(oldCount => oldCount + 1);
   }

   const handleDecrement = (event)=> {
     event.preventDefault();
     if(count > 0)
      setCount(oldCount => oldCount - 1);
   }
    

  return {  count, handleIncrement, handleDecrement }
}
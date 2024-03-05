import { useState } from "react";

export function useProductCount({detail}) {  
   
   const [ count, setCount ] = useState(1);

   const handleIncrement = (event)=> {
     event.preventDefault();
     
     if(count < detail?.stock)     
      setCount(oldCount => oldCount + 1);
   }

   const handleDecrement = (event)=> {
     event.preventDefault();
     if(count > 1)
      setCount(oldCount => oldCount - 1);
   }
    

  return {  count, handleIncrement, handleDecrement }
}
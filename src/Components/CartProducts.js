import react from "react";
import { CartProduct } from "./CartProduct";
export const CartProducts=({cartProducts})=>{
    var tab=[]
    tab=cartProducts;
    console.log(tab);
   
    return  (
        < div className="row">
        {
        tab.map((i)=>
             <div className="products-container">
             <CartProduct cart={i}/>
             </div>
         )   
        }
        
       </ div>
    )
}
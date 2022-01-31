import react from "react";
import Navbar from "./Navbar";
import React, { useEffect, useState } from 'react'

import { auth, fs } from '../Config/Config';
import { Link, useNavigate } from 'react-router-dom';
import { CartProducts } from "./CartProducts";
import { Toast } from "bootstrap";
import StripeCheckout from "react-stripe-checkout";
import { CartProduct } from "./CartProduct";
export const Cart=()=>{
    const GetCurrentUser=()=>{
        const [user,setuser]=useState(null);
            useEffect(()=>{
             auth.onAuthStateChanged(user=>{
               if(user){
                fs.collection('users').doc(user.uid).get().then(snapshot=>{
                  setuser(snapshot.data().Name);
                })
               }
               else{
                 setuser(null);
               }
             })
            },[])
            return user;
          }
          const user=GetCurrentUser();
          const [cardProducts,setcardProducts]=useState([]);
          useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('Cart '+user.uid).onSnapshot(snapshot=>{
                    const newCartProduct=snapshot.docs.map((doc)=>({
                        ID:doc.id,
                        ...doc.data(),
                    }));
                    setcardProducts(newCartProduct);
                })

            }
            else{
                
                console.log("user is not signed in to retrieve cart");
            }
                 })
          },[])
          const qty=cardProducts.map(cartProduct=>{
              return cartProduct.qty;
          })
           console.log(qty);
            const reduceqty=(accu,currentvalue)=>accu+currentvalue;
           const totalqty=qty.reduce(reduceqty,0);
             console.log(totalqty);

             const price=cardProducts.map(cartProduct=>{
                return cartProduct.price;
            })
             console.log(qty);
              const reduceprice=(accu,currentvalue)=>accu+currentvalue;
             const totalprice=price.reduce(reduceprice,0);
               console.log(totalprice);
       
    return(
        <>
           <Navbar user={user}/>
           <br></br>
           {cardProducts.length > 0&&(
               <div className="container-fluid">
                 <h1 className="text-center">   Cart</h1>
                 <div>
               <CartProducts cartProducts={cardProducts}/>
                 </div>
   <br></br>
              
<div class="cart-summary">
<div className='cart-summary-heading'>
    Cart-Summary
</div>
<div className='cart-summary-price'>
    <span>Total Price: {totalprice} DH</span>
    <span></span>
</div>
<div className='cart-summary-price'>
    <span> Total qality:{totalqty}</span>
    <span></span>
</div>

 <StripeCheckout>

 </StripeCheckout>
      
</div>
               </div>    
                   


           )
           }
           {
               cardProducts.length <1 &&(
                   <div className="container-fluid"> No Products To show</div>
               )
               }
                    
        </>
    )
}
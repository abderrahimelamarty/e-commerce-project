import React from "react";
import { Link } from "react-router-dom";
import { auth, fs } from "../Config/Config";
export const CartProduct=({cart})=>{
  let Product;
  const cartIncrease=(cartproduct)=>{
    //console.log(cartproduct);
    Product=cartproduct;
    Product.qty=Product.qty+1;
    Product.price=Product.qty*Product.price;
    auth.onAuthStateChanged(user=>{
      if(user){
fs.collection('Cart '+user.uid).doc(cartproduct.ID).update(Product).then(()=>{
  console.log("increment addd");
})
      }
      else{
        console.log("you are not conncted");
      }
    })

  }
   const cartDecrease=(cartproduct)=>{
    Product=cartproduct;
    Product.qty=Product.qty-1;
    Product.price=Product.qty*Product.price;
    auth.onAuthStateChanged(user=>{
      if(user){
fs.collection('Cart '+user.uid).doc(cartproduct.ID).update(Product).then(()=>{
  console.log("increment addd");
})
      }
      else{
        console.log("you are not conncted");
      }
    })

   }

  const handledecrease=()=>{
    cartDecrease(cart);
  }
  const handleIncrease=()=>{
    cartIncrease(cart);
  }
  const handledelete=()=>{
    auth.onAuthStateChanged(user=>{
      if(user){
        fs.collection('Cart '+user.uid).doc(cart.ID).delete().then(()=>{
          console.log("delele successful");
        })
      }
    })
  }
    
    return(
         
    < div className="product-card" >
    <img className="product-img" src={cart.image} alt="Card image" style={{width:"80%"}}/>
    <div className="card-body">
    <h4  className="product-name"> {cart.title} </h4>
    <p className="product-price"> {cart.price}DH</p>

                <div type="button" class="btn btn-secondary" onClick={handleIncrease}>+</div>
              <div className="quantity">quantity :{cart.qty}</div>
              <button type="button" class="btn btn-secondary" onClick={handledecrease}>-</button>
           <br></br><br></br>
              <Link to="#" className=" btn btn-primary" onClick={handledelete}> Delete</Link>
          </div>
    </div>
    



      
        
    )
}
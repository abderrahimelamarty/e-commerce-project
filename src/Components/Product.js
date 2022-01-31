import react from "react";
import { Link } from "react-router-dom";
export const Product =({product,addtoCart})=>{
    var name=product.title
    var desc=product.description
    var prix=product.price
    var logo=product.image
    const handleAddToCart=()=>{
        addtoCart(product);
    }

   return(
     
    < div className="product-card" >
    <img className="product-img" src={logo} alt="Card image" style={{width:"80%"}}/>
    <div className="card-body">
    <h4  className="product-name"> {name} </h4>
    <p className="card-text" > {desc} </p>
    <p className="product-price"> {prix}DH</p>
    <Link to="#" class="btn btn-primary" onClick={handleAddToCart}>ADD TO CART</Link>
    </div>
    </div>
   
   )
    
}
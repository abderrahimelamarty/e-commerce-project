import React from 'react'
import { Product } from './Product';

export const Products = ({products,addtoCart}) => {
  var tab=[]
    tab=products
  return (
  <div className='products-container'>
    {
   tab.map((product)=>(
     <div >
  <Product product={product}  addtoCart={addtoCart} />  

  <br></br>
  </div> 
  )
  )}
</div>
  )   
}

export default Products
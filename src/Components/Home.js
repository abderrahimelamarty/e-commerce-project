
import Navbar from './Navbar';
import Products from './Products';
import React, { useEffect, useState } from 'react'

import { auth, fs } from '../Config/Config';
import { useNavigate } from 'react-router-dom';
import  Carousel  from './Carousel';

export const Home = () => {
  const nav=useNavigate();
  function GetUserUid(){
    const [uid,setUseruid]=useState(null)
    useEffect(()=>{
      auth.onAuthStateChanged(user=>{
        if(user){
        setUseruid(user.uid)

        }
      
      }
    )
    },[])
    return uid;
  }
  const uid=GetUserUid();
  
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
  console.log(user);

const [products ,setProducts]=useState([]);
const GetProducts= ()=>{
  fs.collection('Products').onSnapshot((snapshot) => {
    const postData = [];
    snapshot.forEach((doc) => postData.push({ ...doc.data(), id: doc.id }));
    setProducts(postData);
    console.log(products.length)
  });
}
useEffect(()=>{
    

 GetProducts();
},[]) 
const [TotalProducts,setTotalProducts]=useState(0);
useEffect(()=>{
auth.onAuthStateChanged(user=>{
  if(user){
    fs.collection('Cart '+ user.uid).onSnapshot(snapshot=>{
      const qty=snapshot.docs.length;
      setTotalProducts(qty);
    })
  }
})
},[])




 let Product;
 const addtoCart=(product)=>{
   

   if(uid!==null){
     Product=product
     Product['qty']=1;
     Product['TotalProductPrice']=Product.qty*Product.price;
     fs.collection('Cart ' +uid).doc(product.ID).set(Product).then(()=>{
       console.log("add successful");
       alert("the product add successfuly");
     })


   
   }
   else{
      nav("/login", { replace: true });
   }


 }

  return (
    <>
    <Navbar user={user} totalProducts={TotalProducts} uid={uid}/>
    {products.length> 0 && (
      <div className='container-fluid'> 
   <h1 className='text-center'>   Products </h1>
   <h1 className='text-center'> Our  Products </h1>
 
     <Products products ={products} addtoCart={addtoCart}/>

      </div>
    )}
    { products.length<1&&(
      <div className='container-fluid'>
 
 please wait ...
      </div>
    )}
    </>
  )
}

export default Home;
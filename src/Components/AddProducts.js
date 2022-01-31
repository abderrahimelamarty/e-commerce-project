import React  from 'react';
import { useState } from 'react';
import { storage,fs } from '../Config/Config';
export const AddProducts = () => {
  const [title,settitle]=useState("");
  const [description,setdescription]=useState("");
  const [price,setprice]=useState(0);
  const [image,setimage]=useState(null);
  const [success,setsuccess]=useState("");
  const [Error,setError]=useState("");
  const types = ['image/png', 'image/jpeg'];

  const handleimg=(e)=>{
    let selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
        setimage(selectedFile);
        setError('')
    }
    else {
        setimage(null);
        setError('Please select a valid image type (jpg or png)');
    }

  }
  const addProduct = (e) => {
    e.preventDefault();
    const uploadTask = storage.ref(`product-images/${image.name}`).put(image);
    uploadTask.on('state_changed', snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
    }, Error => setError(Error.message)
        , () => {
            storage.ref('product-images').child(image.name).getDownloadURL().then(url => {
                fs.collection('Products').add({
                 title: title,
                price: Number(price),
                    image: url,
                    description: description
                }).then(() => {
                    setsuccess("le produit est ajouté avec succés")
                    settitle('');
                    setprice(0)
                    setimage('');
                    setError('');
                    setTimeout(() => {
                        setsuccess("");
                    }, 3000);
                    document.getElementById('file').value = '';
                }).catch(Error => setError(Error.message))
            })
        })}


    return (
        <div className='container'>
        <br />
        {success && <span className='alert alert-success'>{success}</span>}
        <br>
    </br>
    <br></br>
        <h2>ADD PRODUCTS</h2>
        <hr />
  
        <form autoComplete="off" className='form-group' onSubmit={addProduct}>
            <label htmlFor="product-name">Product Name</label>
            <input type="text" className='form-control' required
                onChange={(e) => settitle(e.target.value)} value={title} />
            <br />
            <label htmlFor="product-price">Product Price</label>
            <input type="number" className='form-control' required
                onChange={(e) => setprice(e.target.value)} value={price} />
            <br />
            <label htmlFor="product-description">Product Description</label>
            <input type="text" className='form-control' required
                onChange={(e) => setdescription(e.target.value)} value={description} />
            <br />
            <label htmlFor="product-img">Product Image</label>
            <input type="file" className='form-control' id="file" required
                onChange={handleimg} />
            <br />
            <button type="submit" className='btn btn-success btn-md mybtn'>ADD</button>
        </form>
        {Error && <span className='error-msg'>{Error}</span>}
    </div>)

}
export default AddProducts;
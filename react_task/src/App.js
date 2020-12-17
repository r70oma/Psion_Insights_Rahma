import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import Select from 'react-select';
import { render } from 'react-dom';


function App() {

  const [Name, setName] = useState('')
  const [id, setId] = useState('')
  const [Size, setSize] = useState(null)
  const [Color, setColor] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [product, setProduct] = useState([])

  const options = [
    { value: 1, label: 'pink' },
    { value: 2, label: 'black' },
    { value: 3, label: 'green' },
    { value: 4, label: 'gold' },
  ];
  useEffect(() => {
    Axios.get('http://localhost:9000/products').then((response) => {
      setProduct(response.data)
    })
  }, []);

  // const addProduct = () => {
  //   Axios.post('http://localhost:9000/products/add',
  //     { id:id, Name: Name, Size: Size, Color: Color, price: price, image: image });
  //   setProduct([...product,
  //   { Name: Name, Size: Size, Color: Color, price: price, image: image },
  //   ]);
  // };

  const deleteProduct = (pid) => {
    Axios.delete(`http://localhost:9000/Products/${pid}`);


  };

  const updateProduct = (prid) => {
    Axios.post('http://localhost:9000/products/update',
      { id: prid, Name: Name, Size: Size, Color: Color, price: price, image: image });
    setProduct([...product,
    { Name: Name, Size: Size, Color: Color, price: price, image: image },
    ]);
  };
  
  return (
    
    <div className="App">
      {/* <h1>CRUD AOOLICATION</h1>
      <div className="form">
        <label>Name :
   <input type="text" name="name" onChange={(e) =>
            setName(e.target.value)} /></label>
             <label>Size :
  1 <input type="checkbox" name="Size" value = {1} onChange={(e) => setSize(e.target.value)} />  
  2 <input type="checkbox" name="Size" value = {2} onChange={(e) => setSize(e.target.value)} /></label>
        <label>Color : <Select className="select" 
           options={options} value={Size}/> </label>
        <br />
        <label>Price :
   <input type="text" name="price" onChange={(e) =>
            setPrice(e.target.value)} /></label>
   

        <button onClick={addProduct}>ADD Product</button> */}

        {product.map((val) => {
          return <div className="card">
            <img src={`../images/${val.image}`}></img><br />

            <h1>{val.Name}</h1> <p>{val.Size} <br />{val.Color}<br />  $ {val.price}  </p>
            <button onClick={() => { deleteProduct(val.id) }}>Delete</button>
            {/* <button onClick={() => { updateProduct(val.id) }}>Update</button> */}
          </div>
        })}

      </div>
  );
}

export default App;

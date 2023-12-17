import InventoryCard from "../InventoryCard";
import CartList from "../CartList";
import { useState, useEffect } from "react";
import InventoryForm from "../InventoryForm";
import axios from "axios";
import LogoutButton from "./Logout";

export default function GroceriesApp() {
  const [formData, setFormData] = useState({
    id: "",
    productName: "",
    brand: "",
    quantity: "",
    image: "",
    price: "",
  });

  const [cartList, setCartList] = useState([]);
  const [products, setProducts] = useState([]);
  const [postResponse, setPostResponse] = useState("");
  const [toggleEdit, setToggleEdit] = useState(false);

  useEffect(() => {
    handleFindDB();
  }, [postResponse]);

  async function handleFindDB() {
    const response = await fetch("http://localhost:3001/products");
    const products = await response.json();
    setProducts(products);
  }

  const handlePostDB = async (product) => {
    const postData = {
      id: crypto.randomUUID(),
      productName: product.productName,
      brand: product.brand,
      quantity: product.quantity,
      image: product.image,
      price: product.price,
    };

    await axios
      .post("http://localhost:3001/submitProduct", postData)
      .then((response) => setPostResponse(<p>{response.data}</p>));
  };

  const handleOnChange = (evt) => {
    const fieldName = evt.target.name;
    const fieldValue = evt.target.value;
    console.log(fieldName);
    setFormData((prevData) => {
      return {
        ...prevData,
        id: crypto.randomUUID(),
        [fieldName]: fieldValue,
      };
    });
  };

  const handleOnSubmit = (evt) => {
    evt.preventDefault;
    setPostResponse("");
    toggleEdit ? handleEditProduct(formData) : handlePostDB(formData);
    setFormData({
      id: "",
      productName: "",
      brand: "",
      quantity: "",
      image: "",
      price: "",
    });
    console.log("Here!");
  };

  const handleAddToCart = (item) => {
    setCartList((prevList) => {
      console.log(cartList);
      return [...prevList, { ...item, id: crypto.randomUUID() }];
    });
  };

  const handleEmptyCart = () => {
    setCartList([]);
  };

  const handleRemoveItem = (id) => {
    setCartList((prevList) => {
      return prevList.filter((i) => i.id !== id);
    });
  };

  const handleToggleEdit = (product) => {
    setFormData(product);
    setToggleEdit(true);
  };

  const handleProductDelete = async (product) => {
    const id = product._id;
    await axios
      .delete(`http://localhost:3001/products/${id}`)
      .then((response) => setPostResponse(<p>{response.data}</p>));
  };

  const handleEditProduct = async (product) => {
    const id = product._id;
    const postData = {
      id: product._id,
      productName: product.productName,
      brand: product.brand,
      quantity: product.quantity,
      image: product.image,
      price: product.price,
    };
    await axios
      .patch(`http://localhost:3001/products/${id}`, postData)
      .then((response) => setPostResponse(<p>{response.data}</p>))
      .then(setToggleEdit(false));
  };

  return (
    <>
      <h1>Groceries App</h1>
      <LogoutButton/>
      <InventoryForm
        handleOnChange={handleOnChange}
        formData={formData}
        handleOnSubmit={handleOnSubmit}
        toggleEdit={toggleEdit}
      />
      {postResponse}
      <div className="GroceriesApp-Container">
        <InventoryCard
          list={products}
          onClick={handleAddToCart}
          handleToggleEdit={handleToggleEdit}
          handleProductDelete={handleProductDelete}

          // newList={newProducts}
        />
        <CartList
          cartList={cartList}
          onClickEmpty={handleEmptyCart}
          onClickRemove={handleRemoveItem}
        />
      </div>
    </>
  );
}

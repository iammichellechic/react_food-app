import {  useState} from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const[cartIsShown, setCartIsShow]=useState(false);

  const showCartHandler=()=>{
    setCartIsShow(true);
  }

  const hideCartHandler = () => {
    setCartIsShow(false);
  };


  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onClickCart={showCartHandler}></Header>
      <main>
        <Meals></Meals>
      </main>
    </CartProvider>
  );
}

export default App;

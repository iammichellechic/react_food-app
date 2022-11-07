import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formInpValidity, setformInpValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameInpRef = useRef();
  const streetInpRef = useRef();
  const postalInpRef = useRef();
  const cityInpRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const entName = nameInpRef.current.value;
    const entStreet = streetInpRef.current.value;
    const entPostal = postalInpRef.current.value;
    const entCity = cityInpRef.current.value;

    const entNameIsValid = !isEmpty(entName);
    const entStrIsValid = !isEmpty(entStreet);
    const entCityIsValid = !isEmpty(entCity);
    const entPosIsValid = isFiveChars(entPostal);

    setformInpValidity({
      name: entNameIsValid,
      street: entStrIsValid,
      city: entCityIsValid,
      postalCode: entPosIsValid,
    });

    const formIsValid =
      entNameIsValid && entCityIsValid && entStrIsValid && entPosIsValid;

    if (!formIsValid) {
      return;
    }

    props.onSubmit({
      name: entName,
      street: entStreet,
      city: entCity,
      postalCode: entPostal
    });
  };

  const nameControlClasses = `${classes.control} ${
    formInpValidity.name ? "" : classes.invalid
  }`;

  const strControlClasses = `${classes.control} ${
    formInpValidity.street ? "" : classes.invalid
  }`;

  const cityControlClasses = `${classes.control} ${
    formInpValidity.city ? "" : classes.invalid
  }`;

  const posControlClasses = `${classes.control} ${
    formInpValidity.postalCode ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInpRef} />
        {!formInpValidity.name && <p>Pls enter a valid name</p>}
      </div>

      <div className={strControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInpRef} />
        {!formInpValidity.street && <p>Pls enter a valid street</p>}
      </div>

      <div className={posControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInpRef} />
        {!formInpValidity.postalCode && <p>Pls enter a valid postal code</p>}
      </div>

      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInpRef} />
        {!formInpValidity.city && <p>Pls enter a valid city</p>}
      </div>

      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;

import React, { useState, useEffect } from "react";
import { Minus, Plus } from "@phosphor-icons/react";
import wal from "../assets/images/wal4.jpg";
import { nanoid } from "nanoid";
import { getUser, isLoggedIn } from "../User";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const OrderPage = () => {
  const navigate = useNavigate();
  const [submitButtonDisabled, setSubmitButtomDisabled] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("XS");
  const [formattedDate, setFormattedDate] = useState("");
  const [address, setAddress] = useState({
    streetName: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
  });

  //Setting complete address from address hook
  const completeAddress =
    address.streetName +
    ", " +
    address.city +
    ", " +
    address.state +
    ", " +
    address.postalCode +
    ", Phone: " +
    address.phone;

  //Getting current formatted time
  useEffect(() => {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");

    const timezoneOffsetMinutes = currentDate.getTimezoneOffset();
    const timezoneOffsetHours = Math.abs(timezoneOffsetMinutes / 60);
    const timezoneOffsetSign = timezoneOffsetMinutes > 0 ? "-" : "+";

    const formattedDateWithOffset = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timezoneOffsetSign}${String(
      Math.floor(timezoneOffsetHours)
    ).padStart(2, "0")}:${String(Math.abs(timezoneOffsetMinutes) % 60).padStart(
      2,
      "0"
    )}`;

    setFormattedDate(formattedDateWithOffset);
  }, []);

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }
  });

  //Getting product details
  const [productData, setProductData] = useState([]);
  const { productId } = useParams();
  console.log(productId);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/product/${productId}`)
      .then((res) => {
        console.log(res.data);
        setProductData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [productId]);

  //Getting the logged in user's detail
  const userDetails = getUser();
  console.log(userDetails);

  const totalPrice = productData.price * quantity;

  //Setting up the oder details
  const orderDetails = {
    id: nanoid(),
    orderDate: formattedDate,
    orderPrice: totalPrice,
    orderAddress: completeAddress,
    productId: productData.id,
    productName: productData.name,
    size: selectedSize,
    quantity: quantity,
    userId: userDetails.id,
  };

  console.log(orderDetails);

  const handleCheckout = (e) => {
    e.preventDefault();
    setSubmitButtomDisabled(true);
    axios
      .post(`http://localhost:8080/order`, orderDetails)
      .then((res) => {
        setSubmitButtomDisabled(false);
        console.log(res);
        navigate("/orderplaced");
      })
      .catch((err) => {
        setSubmitButtomDisabled(false);
        console.log(err);
      });
  };

  //Handling quantity decrement
  const handleMinusClick = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  //Handling quantity increment
  const handlePlusClick = () => {
    if (quantity < 4) {
      setQuantity(quantity + 1);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center text-2xl h-[100vh] gap-[64px]">
      <div>Order Summary</div>
      <div className="flex flex-row justify-center items-center gap-[32px]">
        <div className="flex flex-col justify-center items-center gap-[32px]">
          <div>Product Details</div>
          <div className="flex flex-row gap-[24px] p-[5px]">
            <div>
              <img src={wal} alt="" className="h-[150px] w-[150px] rounded" />
            </div>
            <div className="flex flex-col text-xl">
              <div>{productData.name}</div>
              <div>₹{productData.price}</div>
              <div>
                Size:
                <select
                  name="size"
                  value={selectedSize}
                  onChange={(event) => {
                    setSelectedSize(event.target.value);
                  }}
                >
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                </select>
              </div>
              <div className="flex flex-row justify-center items-center gap-[8px]">
                Quantity:
                <div>
                  <Minus
                    size={16}
                    weight="light"
                    className="cursor-pointer"
                    onClick={handleMinusClick}
                  />
                </div>
                <div>{quantity}</div>
                <div>
                  <Plus
                    size={16}
                    weight="light"
                    className="cursor-pointer"
                    onClick={handlePlusClick}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Partition */}
        <div className="h-[100%] border-[1px] border-black"></div>
        {/* Partition */}

        <div className="middle flex flex-col justify-center items-center gap-[16px]">
          <div>Address</div>
          <div className="flex flex-col justify-center items-center text-xl gap-[8px]">
            <input
              type="text"
              placeholder="Street name"
              required
              onChange={(event) =>
                setAddress((prev) => ({
                  ...prev,
                  streetName: event.target.value,
                }))
              }
              className="border border-black rounded-[5px] text-[20px]"
            />
            <input
              type="text"
              placeholder="City"
              required
              onChange={(event) =>
                setAddress((prev) => ({
                  ...prev,
                  city: event.target.value,
                }))
              }
              className="border border-black rounded-[5px] text-[20px]"
            />
            <input
              type="text"
              placeholder="State"
              required
              onChange={(event) =>
                setAddress((prev) => ({
                  ...prev,
                  state: event.target.value,
                }))
              }
              className="border border-black rounded-[5px] text-[20px]"
            />
            <input
              type="number"
              placeholder="Postal Code"
              required
              onChange={(event) =>
                setAddress((prev) => ({
                  ...prev,
                  postalCode: event.target.value,
                }))
              }
              className="border border-black rounded-[5px] text-[20px]"
            />
            <input
              type="number"
              placeholder="Phone number"
              required
              onChange={(event) =>
                setAddress((prev) => ({
                  ...prev,
                  phone: event.target.value,
                }))
              }
              className="border border-black rounded-[5px] text-[20px]"
            />
          </div>
        </div>

        {/* Partition */}
        <div className="h-[100%] border-[1px] border-black"></div>
        {/* Partition */}

        <div className="right flex flex-col justify-center items-center gap-[24px]">
          <div>Checkout Details</div>
          <div className="flex flex-col text-base w-[100%] gap-[8px]">
            <div className="flex flex-row justify-between w-[100%]">
              <div>Product:</div>
              <div>Name</div>
            </div>
            <div className="flex flex-row justify-between w-[100%]">
              <div>Size:</div>
              <div>S</div>
            </div>
            <div className="flex flex-row justify-between w-[100%]">
              <div>Qty:</div>
              <div>{quantity}</div>
            </div>
            <div className="flex flex-row justify-between w-[100%]">
              <div>Total:</div>
              <div>₹{quantity}</div>
            </div>
            <div className="flex justify-center items-center">
              <input
                type="submit"
                value="Checkout"
                disabled={submitButtonDisabled}
                onClick={handleCheckout}
                className="text-lg border border-black rounded bg-black text-white w-[100%]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;

import React, { useEffect, useState } from "react";
import { isLoggedIn, getUser } from "../User";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const [userDetails, setUserdetails] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    } else {
      setUserdetails(getUser());
    }
  }, [navigate]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/orders/${userDetails.id}`)
      .then((res) => {
        console.log(res);
        setOrderData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userDetails]);
  return (
    <div className="flex flex-col justify-center items-center gap-[32px]">
      <div className="account">
        <div className="text-3xl mb-[32px]">Account Details</div>
        <div className="flex flex-col text-xl gap-[32px]">
          <div className="flex flex-row">
            <div>Name:</div>
            <div>{userDetails.name}</div>
          </div>
          <div className="flex flex-row">
            <div>Email:</div>
            <div>{userDetails.email}</div>
          </div>
          <div className="flex flex-row">
            <div>Phone Number:</div>
            <div>{userDetails.phone}</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center order">
        <div className="text-3xl mb-[32px]">Order History</div>
        <div className="flex flex-row justify-center items-center gap-[16px]">
          {orderData.map((order) => {
            return (
              <div
                key={order.id}
                className="flex flex-col w-[22vw] border border-black rounded shadow-xl p-[16px]"
              >
                <div>Product Name: {order.productName}</div>
                <div>Price: {order.orderPrice}</div>
                <div>Quantity: {order.quantity}</div>
                <div>Date: {order.orderDate}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Account;

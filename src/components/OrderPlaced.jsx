import { React, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../User";
import orderPlaced from "../assets/images/Order-placed.gif";

const OrderPlaced = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }
  });
  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <div className="flex flex-col justify-center items-center gap-[16px] p-[32px] rounded text-xl shadow-2xl">
        <div>
          <img src={orderPlaced} alt="order-placed-gif" className="h-[250px]" />
        </div>
        <div>Your order has been confirmed</div>
        <div>Thank you for ordering</div>
        <div className="w-[100%] bg-[#fb8b24] p-[4px] rounded text-center">
          <Link to="/home" className="no-underline text-black">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderPlaced;

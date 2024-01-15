import React, { useEffect, useState } from "react";
import { ShoppingCart } from "@phosphor-icons/react";
import { BadgeIndianRupee } from "lucide-react";
import wal4 from "../assets/images/wal4.jpg";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const Product = () => {
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
  return (
    <div className="flex flex-row m-[10vh] w-[80vw] gap-[32px]">
      <div className="left flex flex-col justify-center items-center">
        <div>
          <img
            src={wal4}
            alt=""
            className="h-[400px] w-[400px] rounded mb-[8px]"
          />
        </div>
        <div className="flex flex-col justify-between items-center text-2xl w-[100%]">
          <button
            type="button"
            className="flex flex-row justify-center items-center rounded w-[100%] mb-[8px] bg-[#ffb703]"
          >
            <ShoppingCart size={24} weight="bold" />
            ADD TO CART
          </button>
          {/* <button
            type="button"
            className="flex flex-row justify-center items-center rounded w-[100%] bg-[#fb8500]"
          >
            <BadgeIndianRupee />
            BUY NOW
          </button> */}
          <div className="flex flex-row justify-center items-center w-[100%]">
            <Link
              to={`/order/${productId}`}
              className="flex flex-row justify-center items-center rounded w-[100%] bg-[#fb8500] no-underline text-black"
            >
              <BadgeIndianRupee />
              BUY NOW
            </Link>
          </div>
        </div>
      </div>
      <div className="right flex flex-col text-xl">
        <div>{productData.name}</div>
        <div>₹{productData.price}</div>
        <div>{productData.description}</div>
      </div>
    </div>
  );
};

export default Product;

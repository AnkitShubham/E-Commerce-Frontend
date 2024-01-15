import React, { useEffect, useState } from "react";
import Header from "./Header";
import {
  DeviceMobileCamera,
  Devices,
  ShirtFolded,
  Television,
  CookingPot,
  Couch,
  Volleyball,
  Books,
} from "@phosphor-icons/react";
import Carousel from "./Carousel";
import Sections from "./Sections";
import Footer from "./Footer";
import axios from "axios";
import { isLoggedIn } from "../User";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [productData, setProductData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/products`)
      .then((res) => {
        setProductData(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <Header />
      </div>
      <div className="flex flex-col justify-center items-center mt-[32px] mb-[32px] gap-[8px]">
        <div>
          <p className="text-2xl">Categories</p>
        </div>
        <div className="flex flex-row justify-center items-center gap-[40px]">
          <div className="flex flex-col justify-center items-center">
            <DeviceMobileCamera size={32} weight="light" />
            <p>Mobiles & Tablets</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <Devices size={32} weight="light" />
            <p>Electronics</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <Television size={32} weight="light" />
            <p>Tv & Appliances</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <ShirtFolded size={32} weight="light" />
            <p>Fashion</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <CookingPot size={32} weight="light" />
            <p>Home & Kitchen</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <Couch size={32} weight="light" />
            <p>Furniture</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <Volleyball size={32} weight="light" />
            <p>Sports</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <Books size={32} weight="light" />
            <p>Books</p>
          </div>
        </div>
      </div>
      <div>
        <Carousel />
      </div>
      <div>
        <Sections name="Mobiles & Tablets" data={productData} />
        <Sections name="Electronics" data={productData} />
        <Sections name="Tv & Appliances" data={productData} />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;

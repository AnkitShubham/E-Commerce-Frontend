import React, { useEffect, useState } from "react";
import axios from "axios";
import wal4 from "../assets/images/wal4.jpg";
import { useParams, Link } from "react-router-dom";

const Category = () => {
  const [productsByCategory, setProductsByCategory] = useState([]);
  const { categoryName } = useParams();
  const decodedCategoryName = decodeURIComponent(categoryName);
  console.log(decodedCategoryName);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/category/${decodedCategoryName}`)
      .then((res) => {
        setProductsByCategory(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [decodedCategoryName]);
  return (
    <div className="flex flex-col justify-center items-center">
      <div>{decodedCategoryName}</div>
      <div className="grid grid-cols-5 gap-4 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5">
        {productsByCategory.map((product) => (
          <Link
            to={`/product/${product.id}`}
            className="no-underline text-black"
          >
            <div className="cards border border-black rounded p-[5px]">
              <div>
                <img
                  src={wal4}
                  alt=""
                  className="h-[250px] w-[250px] rounded"
                />
              </div>
              <div>{product.name}</div>
              <div>{product.price}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;

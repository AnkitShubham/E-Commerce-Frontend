import React from "react";
import { CaretCircleRight } from "@phosphor-icons/react";
import wal4 from "../assets/images/wal4.jpg";
import { Link } from "react-router-dom";

const Sections = ({ name, data }) => {
  let count = 0;
  return (
    <div className="flex flex-col justify-center items-center mt-[32px]">
      <div className="flex flex-row justify-between items-center w-[100%]">
        <div>
          <p className="text-2xl">{name}</p>
        </div>
        <div>
          <Link
            to={`/category/${name}`}
            className="flex flex-row justify-center items-center no-underline text-black"
          >
            View all
            <CaretCircleRight size={28} weight="light" />
          </Link>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center gap-[32px]">
        {data.map((product) => {
          if (product.category === name && count < 5) {
            count++;
            return (
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
            );
          }
          return null;
        })}
      </div>
      {/* <div className="flex flex-row justify-center items-center gap-[32px]">
        <div className="cards border border-black rounded p-[5px]">
          <div>
            <img src={wal4} alt="" className="h-[250px] w-[250px] rounded" />
          </div>
          <div>Product name</div>
          <div>Price</div>
        </div>
      </div> */}
    </div>
  );
};

export default Sections;

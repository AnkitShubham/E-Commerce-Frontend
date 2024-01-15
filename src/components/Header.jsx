import React from "react";
import styles from "./header.module.css";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  UserCircle,
  MagnifyingGlass,
  SignOut,
} from "@phosphor-icons/react";
import { logout } from "../User";

const Header = () => {
  const handleLogout = () => {
    logout();
  };
  return (
    <nav>
      <div className={styles.container}>
        <div className={styles.logo}>E-Commerce</div>
        <div className={styles.search}>
          <div>
            <input
              type="search"
              placeholder="Search for products, brands and more..."
              className={styles.searchBox}
            />
          </div>
          <div className={styles.searchButton}>
            <MagnifyingGlass size={32} weight="light" />
          </div>
        </div>

        {/* Cart div */}

        <Link to="/cart" className={styles.links}>
          <div className={styles.cart}>
            <ShoppingCart size={32} weight="light" />
            <div>Cart</div>
          </div>
        </Link>

        {/* Cart div */}

        {/* Account Div */}

        <Link to="/account" className={styles.links}>
          <div className={styles.account}>
            <UserCircle size={32} weight="light" />
            <div>Account</div>
          </div>
        </Link>

        {/* Account Div */}

        {/* Logout Div */}

        <Link className={styles.links} onClick={handleLogout}>
          <div className={styles.logout}>
            <SignOut size={32} weight="light" />
            <div>Logout</div>
          </div>
        </Link>

        {/* Logout Div */}
      </div>
    </nav>
  );
};

export default Header;

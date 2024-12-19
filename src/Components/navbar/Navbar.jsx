import React from "react";
import styles from "./navbar.module.css";
import logo from "../../assets/download.svg";

const Navbar = () => {
  return (
    <div className={styles.navbarContainer}>
      <img src={logo} alt="logo" height={31} width={31} />
      <span>Monk Upsell & Cross-sell</span>
    </div>
  );
};

export default Navbar;

import React from "react";
import "./Footer.css";
import Gweta from '../../../assets/Gweta.png'

const Footer = () => {
  return (
    <div className="FooterParent">
      <div className="Footer1" data-aos="fade">
        <div>
          <img
            style={{ width: "280px" }}
            src={Gweta}
            alt="Gweta Rangu"
            data-aos="fade"
          />
          <br />
          <br />
        </div>
        <div>
          <p className="footerpara">
            © 2023 <span className="footergoldenpara">Gweta Rangu</span>{" "}
            <br /> Designed and Developed by <br />
            <span className="footergoldenpara">BOF</span>
          </p>
        </div>
      </div>
      <div className="Footer2">
        <p className="footeremail">info@gwetarangu.co.zw</p>
        <p>Contact Us: +263 771 234 567</p>
      </div>
    </div>
  );
};

export default Footer;

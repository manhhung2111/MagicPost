import "./Footer.scss";
import { BiPackage, BiHomeAlt } from "react-icons/bi";
import {AiTwotonePhone, AiOutlineMail} from "react-icons/ai"
function Footer() {
  return (
    <div className="footer-custom">
      <div className="section">
        <h2 className="brand">
          <BiPackage />
          Magic Post
        </h2>
        <p>
          Magic Post is for small and medium businesses looking for simple and
          reliable global transportation solutions. You don't need to be a
          shipping expert to get started with Magic Post.
        </p>
      </div>
      <div className="section">
        <h2 className="brand">Let us help</h2>
        <p>About us</p>
        <p>Contact us</p>
        <p>Insights</p>
        <p>Supports</p>
      </div>
      <div className="section">
        <h2>Legal</h2>
        <p>Privacy Policy</p>
        <p>Terms of Use</p>
        <p>Site map</p>
      </div>
      <div className="section">
        <h2>Contacts</h2>
        <p className="contact"> <BiHomeAlt />144 Xuan Thuy, Dich Vong Hau, Ha Noi</p>
        <p className="contact"> <AiOutlineMail />magicpost@logistics.vn</p>
        <p className="contact"> <AiTwotonePhone />+84 123-456-789</p>
      </div>
    </div>
  );
}

export default Footer;

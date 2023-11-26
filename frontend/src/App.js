import "./App.scss";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { BiPackage } from "react-icons/bi";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "./components/Footer/Footer";
import LoginModal from "./components/HomeComponents/LoginModal/LoginModal";
import avatar from "./assets/programmer.png";
import { useNavigate } from "react-router-dom";
import AccountInfo from "./components/HomeComponents/AccountInfo/AccountInfo";

function App() {
  const [headerColor, setHeaderColor] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isShowSetting, setIsShowSetting] = useState(false);
  const [showAccountModal, setIsShowAccountModal] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    let isLogin = JSON.parse(localStorage.getItem("account"))?.isAuthenticated;
    console.log(isLogin);
    if (!isLogin) isLogin = false;
    setIsAuthenticated(isLogin);
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // window.scrollTo(0, 0)
    if (location.pathname !== "/") {
      setHeaderColor("blur");
    } else {
      setHeaderColor("");
    }
  }, [location.pathname]);

  const handleChangeHeaderColor = (e) => {
    if (location.pathname !== "/") {
      return;
    }
    const scrollHeight = e.currentTarget.scrollTop;
    if (scrollHeight >= 150) setHeaderColor("blur");
    else setHeaderColor("");
  };

  const handleLogin = () => {
    setShowLoginModal(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsShowSetting(false);
    setShowLoginModal(false);
    localStorage.clear();
    navigate("/");
  };

  return (
    <div
      className={`app-container`}
      onScroll={(e) => handleChangeHeaderColor(e)}
    >
      <Navbar
        key={"lg"}
        expand={"lg"}
        className={`mb-3 nav-bar-custom ${headerColor}`}
        fixed="top"
      >
        <Container className="p-3">
          <Navbar.Brand>
            <NavLink to={"/"} className="nav-brand">
              <BiPackage className="icon" />
              <h3>Magic Post</h3>
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-"lg"-${"lg"}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${"lg"}`}
            aria-labelledby={`offcanvasNavbarLabel-"lg"-${"lg"}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title
                id={`offcanvasNavbarLabel-expand-${"lg"}`}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <BiPackage className="icon" style={{ fontSize: "2rem" }} />
                <h3>Magic Post</h3>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3 fs-4 g-2 nav-links">
                <NavLink to={"/"} className="nav-link">
                  Home
                </NavLink>
                <NavLink to={"/tracking"} className="nav-link">
                  Tracking
                </NavLink>
                {isAuthenticated && (
                  <NavLink to={"/parcel-transaction"} className="nav-link">
                    Parcel Transaction
                  </NavLink>
                )}
                <NavLink to={"/services"} className="nav-link">
                  Services
                </NavLink>
                {headerColor === "blur" && !isAuthenticated && (
                  <button className="signin-btn" onClick={() => handleLogin()}>
                    Log in
                  </button>
                )}
                {headerColor === "" && !isAuthenticated && (
                  <button className="signin-btn" onClick={() => handleLogin()}>
                    Log in
                  </button>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
          {isAuthenticated && (
            <div
              className="user-account"
              onBlur={() => setIsShowSetting(false)}
              tabIndex={0}
            >
              <img
                src={avatar}
                alt="This is avatar after login"
                onClick={() => setIsShowSetting((prev) => !prev)}
              />
              <div
                className={`triangle ${isShowSetting ? "active" : ""}`}
              ></div>
              <div className={`settings ${isShowSetting ? "active" : ""}`}>
                <p onClick={() => setIsShowAccountModal(true)}>Account</p>
                <p onClick={() => handleLogout()}>Log out</p>
              </div>
            </div>
          )}
        </Container>
      </Navbar>
      <main>
        <Outlet />
      </main>
      <Footer />
      <LoginModal
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
        setIsAuthenticated={setIsAuthenticated}
      />
      <AccountInfo
        showModal={showAccountModal}
        setShowModal={setIsShowAccountModal}
      />
    </div>
  );
}

export default App;

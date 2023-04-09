import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

import "./Header.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

interface headerProps {
  isAtPageTop?: boolean;
}

const Header = ({ isAtPageTop = false }: headerProps) => {
  const navLinkList = [
    { link: "home", name: "Home" },
    { link: "gallery", name: "Gallery" },
    { link: "blog", name: "Blog" },
    { link: "about", name: "About" },
    {
      link: "user",
      name: "User",
      icon: <FontAwesomeIcon icon={faUser} />,
    },
    {
      link: "#instagram",
      name: "Instagram",
      icon: (
        <FontAwesomeIcon
          icon={faInstagram}
          size="lg"
          style={{ transform: "translateY(-1px)" }}
        />
      ),
    },
  ];

  const headerBackground = isAtPageTop
    ? "transparent-background"
    : "fill-background";

  return (
    <Navbar
      collapseOnSelect
      fixed="top"
      expand="lg"
      variant="dark"
      id="menu"
      className={`${headerBackground}  justify-content-between`}
    >
      <div className="container-fluid mx-4">
        <Navbar.Brand href="#page-top" as="a">
          <span>My</span> Trails<span>.</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" role="button" />
        <Navbar.Collapse
          className="justify-content-end"
          id="responsive-navbar-nav"
        >
          <Nav>
            {navLinkList.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={"/" + item.link}
                  className={({ isActive }) =>
                    isActive ? "active page-scroll nav-link" : "page-scroll nav-link"
                  }
                >
                  {!item.icon ? item.name : item.icon}
                </NavLink>
              </li>
            ))}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Header;

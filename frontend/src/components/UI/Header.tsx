import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Header.css";
import HeaderLogin from "./HeaderLogin";

interface headerProps {
  isAtPageTop?: boolean;
}

interface linkList {
  link: string;
  name: string;
  icon?: JSX.Element;
  isExternalLink?: boolean;
}

const Header = ({ isAtPageTop = false }: headerProps) => {
  const navLinkList: linkList[] = [
    { link: "home", name: "Home" },
    { link: "gallery", name: "Gallery" },
    { link: "blog", name: "Blog" },
    { link: "contact", name: "Contact" },
    {
      link: "user",
      name: "User",
      icon: <FontAwesomeIcon icon={faUser} />,
    },
    {
      link: "https://www.instagram.com/saraninho.su/",
      name: "Instagram",
      icon: (
        <FontAwesomeIcon
          icon={faInstagram}
          size="lg"
        />
      ),
      isExternalLink: true,
    },
  ];

  const navLinkComponent = (item: linkList) => {
    const linkText = !item.icon ? item.name : item.icon;

    if (item.name === "User") {
      return <HeaderLogin />;
    } else if (item.isExternalLink) {
      return (
        <a
          href={item.link}
          className="page-scroll nav-link"
          target="_blank"
          rel="noreferrer nofollow"
        >
          {linkText}
        </a>
      );
    }

    return (
        <NavLink
          to={"/" + item.link}
          className={({ isActive }) =>
            isActive && !item.icon
              ? "active page-scroll nav-link"
              : "page-scroll nav-link"
          }
        >
          {linkText}
        </NavLink>
      );
  };

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
                {navLinkComponent(item)}
              </li>
            ))}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Header;

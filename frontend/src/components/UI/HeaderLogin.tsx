import Dropdown from "react-bootstrap/Dropdown";
import Spinner from "react-bootstrap/Spinner";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { faUser, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  fetchLogin,
  logout,
  stateAuthProcessState,
  stateAuthResponseMsg,
  stateIsAuth,
} from "../../store/authSlice";
import { useAppDispatch } from "../../store/store";

const HeaderLogin = () => {
  const dispatch = useAppDispatch();
  const isAuth = useSelector(stateIsAuth);
  const resMsg = useSelector(stateAuthResponseMsg);
  const authProcessState = useSelector(stateAuthProcessState);

  const onSubmitHandle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.currentTarget;
    dispatch(
      fetchLogin({
        username: target.username.value,
        password: target.password.value,
      })
    );
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="page-scroll nav-link" id="mylogindiv">
      <Dropdown align="end">
        <Dropdown.Toggle className="icon-header" bsPrefix="p-0">
          <div className="icon-div">
            {isAuth ? (
              <FontAwesomeIcon icon={faUserCheck} className="icon-colored" />
            ) : (
              <FontAwesomeIcon icon={faUser} className="icon-white" />
            )}
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu className="fromitem p-2" id="logindiv">
          {isAuth ? (
            <div className="logoutdiv">
              <Link to="/gallery/upload" className="btn btn-sm m-1">
                Upload
              </Link>
              <button className="btn btn-sm m-1" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="row">
              <div className="container-fluid">
                <form onSubmit={onSubmitHandle}>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      className="form-control"
                      name="username"
                      id="username"
                      type="text"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      className="form-control"
                      name="password"
                      id="password"
                      type="password"
                    />
                  </div>

                  <p
                    className={`my-2 error ${
                      authProcessState !== "failed" && "hide"
                    }`}
                  >
                    {resMsg && resMsg + " Please try again!"}
                  </p>

                  <button type="submit" className="btn btn-sm">
                    {authProcessState === "pending" ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      "Login"
                    )}
                  </button>
                </form>
              </div>
            </div>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default HeaderLogin;

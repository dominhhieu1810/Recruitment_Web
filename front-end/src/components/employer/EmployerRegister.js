import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../../services/auth.service";
import { Link } from "react-router-dom";
import EmployerNavbar from "./EmployerNavbar";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value) || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const EmployerRegister = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [checkcfpassword, setCheckcfpassword] = useState(false)

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const onChangeConfirmPassword = (e) => {
    const confirmpassword = e.target.value;
    setConfirmpassword(confirmpassword);
  };


  const handleRegister = (e) => {
    e.preventDefault();
    console.log('check');
    setMessage("");
    setSuccessful(false);
    //console.log('check1');
    form.current.validateAll();
    if (password !== confirmpassword) {
      //setMessage('confirm password do not match');
      setCheckcfpassword(true)
    }
    else if (checkBtn.current.context._errors.length === 0) {
      //console.log('check');
      setCheckcfpassword(false)
      AuthService.employeeregister(username, email, password).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div>
      <EmployerNavbar />
      <section className="vh-100 bg-image">
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{ borderradius: "15px" }}>
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                    <Form onSubmit={handleRegister} ref={form}>

                      {!successful && (
                        <div>
                          <div className="form-outline mb-4">
                            <label htmlFor="username">Username</label>
                            <Input
                              type="text"
                              className="form-control"
                              name="username"
                              value={username}
                              onChange={onChangeUsername}
                              validations={[required, vusername]}
                            />
                          </div>

                          <div className="form-outline mb-4">
                            <label htmlFor="email">Email</label>
                            <Input
                              type="text"
                              className="form-control"
                              name="email"
                              value={email}
                              onChange={onChangeEmail}
                              validations={[required, validEmail]}
                            />
                          </div>

                          <div className="form-outline mb-4">
                            <label htmlFor="password">Password</label>
                            <Input
                              type="password"
                              className="form-control"
                              name="password"
                              value={password}
                              onChange={onChangePassword}
                              validations={[required, vpassword]}
                            />
                          </div>

                          <div className="form-outline mb-4">
                            <label htmlFor="password">Confirm Password</label>
                            <Input
                              type="password"
                              className="form-control"
                              name="password"
                              value={confirmpassword}
                              onChange={onChangeConfirmPassword}
                              validations={[required]}
                            />
                          </div>
                          {checkcfpassword && (
                            <div className="alert alert-danger" role="alert">
                              The confirm password do not match
                            </div>
                          )}
                          <div className="form-check d-flex justify-content-center mb-5">
                            <label className="form-check-label" htmlFor="form2Example3g">
                              I agree all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                            </label>
                          </div>

                          <div className="d-flex justify-content-center">
                            <button className="btn btn-success btn-block">Sign Up</button>
                          </div>
                        </div>
                      )}

                      {message && (
                        <div className="form-group">
                          <div
                            className={
                              successful ? "alert alert-success" : "alert alert-danger"
                            }
                            role="alert"
                          >
                            {message}
                            <Link className="justify-content-center" to="/employerlogin"><u>Go to login</u></Link>
                          </div>
                        </div>
                      )}
                      <CheckButton style={{ display: "none" }} ref={checkBtn} />
                    </Form>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmployerRegister;

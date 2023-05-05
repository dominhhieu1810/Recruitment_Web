import React from 'react';
import "./Footer.scss"
const Footer = (props) => {
    return (
        <footer className="footer footer-wrapper">

            <div className="main-footer">

                <div className="container">
                    <div className="row">

                        <div className="col-sm-4 col-md-4">

                            <div className="footer-about-us">
                                <h2 className="footer-title">Jobs Portal</h2>
                                <p>Online job portal developed by Hieu.</p>

                            </div>

                        </div>

                        <div className="col-sm-4 col-md-4">
                            <h2 className="footer-title">Quick Links</h2>
                            <ul className="nav flex-column">
                                <li className="nav-item mb-2">Home</li>
                                <li className="nav-item mb-2">Job List</li>
                                <li className="nav-item mb-2">Contact Us</li>
                                <li className="nav-item mb-2">Go to top</li>

                            </ul>

                        </div>
                        <div className="col-sm-4 col-md-4">

                            <h2 className="footer-title">Contact</h2>

                            <p>Address : Ha Noi, University of Engineering and Technology</p>
                            <p>Email : <a href="mailto:dominhhieu1810@gmail.com">dominhhieu1810@gmail.com</a></p>
                            <p>Phone : <a href="tel:+233546607474">+84 0976455445</a></p>


                        </div>
                    </div>

                </div>

            </div>

            <div className="bottom-footer">

                <div className="container">

                    <div className="row">

                        <div className="col-sm-4 col-md-4">

                            <p className="copy-right">&#169; Copyright </p>

                        </div>

                        <div className="col-sm-4 col-md-4">
                            <h6>Developed by Hieu</h6>

                        </div>
                        <div className="col-sm-4 col-md-4">
                            <ul className="list-unstyled d-flex align-items-center justify-content-center">
                                <li className="ms-3"><i className="fa-brands fa-square-twitter"></i></li>
                                <li className="ms-3"><i className="fa-brands fa-square-facebook"></i></li>
                                <li className="ms-3"><i className="fa-brands fa-square-instagram"></i></li>
                            </ul>
                        </div>



                    </div>

                </div>

            </div>

        </footer >

    );
};

export default Footer;
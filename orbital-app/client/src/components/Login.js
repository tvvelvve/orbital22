import { useState } from "react";
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';

const Login = ({ setAuth }) => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        activateEmail: "",
        OTP: "",
        newPassword: ""
    });
    const [isActivate, setIsActivate] = useState(false);
    const [isValidatedOTP, setValidatedOTP] = useState(false);
    const { email, password, activateEmail, OTP, newPassword } = inputs;

    const onChange = e => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const onSubmitLoginForm = async (e) => {
        e.preventDefault();
        try {
            const body = { email, password }
            const response = await fetch("/auth/login", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(body)
            })

            const parseRes = await response.json();

            if (parseRes.jwtToken) {
                localStorage.setItem("token", parseRes.jwtToken);
                setAuth(true);
                toast.success('Login Successfully', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
            } else {
                setAuth(false);
                toast.error(parseRes, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
            }

        } catch (err) {
            console.error(err.message);
        }
    }

    const sendOTP = async (e) => {
        e.preventDefault();
        try {
            const body = { activateEmail }
            const response = await fetch("/users/email", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(body)
            })

            const parseRes = await response.json();

            if (parseRes === "Success") {
                toast.success('Your OTP has been sent!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                });

                var generatedOTP = Math.floor(Math.random() * 9999999999);

                var otpTemplate = {
                    message: generatedOTP,
                    email: activateEmail
                };

                emailjs.send('service_etex65i', 'template_93vttqe', otpTemplate, 'qDiJ9JLggVBi1V2Lz')
                    .then(function (response) {
                        console.log('SUCCESS!', response.status, response.text);
                    }, function (error) {
                        console.log('FAILED...', error);
                    });

                updateOTP(e, generatedOTP);

            }
            else {
                toast.error(parseRes, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
            }

        } catch (err) {
            console.error(err.message);
        }
    }

    const updateOTP = async (e, OTP) => {
        e.preventDefault();
        try {
            const body = { OTP, activateEmail };
            const response = await fetch(
                `/users/updateotp`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }

            );

            return response;
        } catch (err) {
            console.error(err.message);
        }
    };

    const validateOTP = async (e) => {
        e.preventDefault();
        try {
            const body = { OTP, activateEmail };
            const response = await fetch(
                `/users/verifyotp`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }

            );
            const parseRes = await response.json();

            if (parseRes === "Correct OTP!") {
                toast.success('Validated', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                });

                updateOTP(e, "");
                setValidatedOTP(true);
            } else {
                toast.error(parseRes, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    const updatePassword = async (e) => {
        e.preventDefault();
        try {
            const body = { newPassword, activateEmail };
            const response = await fetch(
                `/users/updatepw`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }

            );

            const parseRes = await response.json();

            toast.success(parseRes, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
            });

            setIsActivate(false);
            setValidatedOTP(false);

        } catch (err) {
            console.error(err.message);
            return false;
        }
    };

    const toggleActivate = () => {
        setIsActivate(current => !current);
    };

    return (
        <>
            <section id='intro-div'>
                <div className="middlecontent px-4 py-5 px-md-5 text-center text-lg-start" style={{ backgroundColor: 'hsl(0, 0%, 96%)' }}>
                    <div className="container-xxl">
                        <div className="body row gx-lg-5 align-items-center">
                            <div id="intro-left" className="introbody col col-lg-6 mb-lg-0">
                                <h1 className="ao display-3 fw-bold ls-tight text-left">
                                    About <span className="text-primary">Orbital</span>
                                </h1>
                                <p style={{ color: 'hsl(217, 10%, 50.8%)', textAlign: 'justify', textJustify: 'inter-word' }}>
                                    Orbital is the School of Computing’s self-driven programming summer experience. It is designed to give first-year students the opportunity to 1) self-learn and 2) build something useful. It is designed as a 4 modular credit (MC) module that is taken pass/fail (CS/CU) over the summer<sup>1</sup>.
                                    Our School does not teach programming prowess as formal coursework, as it is not academic in nature. Orbital is one mode where young energetic students can fill this gap by their own initiative.
                                    <br /> <br />
                                    <sup>1</sup>Credit will be provided under the 4 MC S/U module code CP2106 Independent Software Development Project.
                                </p>
                            </div>


                            <div id="intro-right" className="loginbody col-lg-5">
                                <div className="card flip-card">
                                    <div className="logincontent py-5 px-md-5">
                                        <div className="flip-card-inner" style={{
                                            transform: isActivate ? 'rotateY(180deg)' : '',
                                        }}>
                                            <div className="flip-card-front" style={{
                                                display: isActivate ? 'none' : 'block',
                                            }}>
                                                <h1><span className="signin">Sign in</span></h1>
                                                <p className="loginhere">Login here using your username</p> <br />
                                                <form onSubmit={onSubmitLoginForm}>
                                                    {/* Email input */}
                                                    <div className="form-outline mb-4">
                                                        <input type="email" name="email" className="form-control" placeholder="Email" defaultValue={email} onChange={(e) => onChange(e)} />
                                                    </div>
                                                    {/* Password input */}
                                                    <div className="form-outline mb-4">
                                                        <input type="password" name="password" className="form-control" placeholder="Password" defaultValue={password} onChange={(e) => onChange(e)} />
                                                    </div>
                                                    {/* Submit button */}
                                                    <button type="submit" className="loginbutton btn btn-primary btn-block mb-4">
                                                        Login
                                                    </button>

                                                    <p className="memberornot">Not a member? &nbsp;
                                                        <br />
                                                        <a id="ForgetPasswordBtn" className="text-primary" href="/#" onClick={toggleActivate}>Activate your account</a>
                                                    </p>
                                                </form>
                                            </div>
                                            <div className="flip-card-back"
                                                style={{
                                                    display: isActivate ? 'block' : 'none',
                                                }}>
                                                <h1><span className="signin">{isValidatedOTP ? 'Enter your new password' : 'Get Started'}</span></h1>
                                                <p className="loginhere">Activate your account using your email</p> <br />
                                                <form onSubmit={isValidatedOTP ? updatePassword : validateOTP}>
                                                    {/* Email input */}
                                                    <div className="form-outline mb-4">
                                                        <div className="input-group">
                                                            <input type="email" name="activateEmail" className="form-control" placeholder="Email" readOnly={isValidatedOTP ? true : false} defaultValue={activateEmail} onChange={(e) => onChange(e)} />
                                                            <button className="btn btn-md btn-primary m-0" type="button" style={{
                                                                display: isValidatedOTP ? 'none' : 'block',
                                                            }} onClick={sendOTP}>Send OTP</button>
                                                        </div>
                                                    </div>

                                                    {/* OTP input */}
                                                    <div className="form-outline mb-4" style={{
                                                        display: isValidatedOTP ? 'none' : 'block',
                                                    }}>
                                                        <input type="number" name="OTP" className="form-control" placeholder="OTP" defaultValue={OTP} onChange={(e) => onChange(e)} />
                                                    </div>

                                                    {/* Password input */}
                                                    <div className="form-outline mb-4" style={{
                                                        display: isValidatedOTP ? 'block' : 'none',
                                                    }}>
                                                        <input type="password" name="newPassword" className="form-control" placeholder="New Password" defaultValue={newPassword} onChange={(e) => onChange(e)} />
                                                    </div>

                                                    {/* Submit button */}
                                                    <button type="submit" className="btn btn-primary btn-block mb-4">
                                                        Submit
                                                    </button>

                                                    <p className="memberornot">Already a member? &nbsp;
                                                        <br />
                                                        <a id="ForgetPasswordBtn" href="/#" className="text-primary" onClick={toggleActivate}>Login</a>
                                                    </p>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}

export default Login
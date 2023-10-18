import React, { useEffect, useState } from "react";
import Footer from '../components/Layout/Footer';
import HeaderAuth from '../components/Layout/HeaderAuth';
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import env from "react-dotenv";
import {
    MDBContainer,
    MDBInput,
    MDBBtn,
} from 'mdb-react-ui-kit';

function Login() {
    const BACKEND_BASE_URL = env.API_URL;
    const navigate = useNavigate();
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');

    const submitHandler = async (event) => {
        event.preventDefault();

        const enteredData = {
            email: enteredEmail,
            password: enteredPassword,
        };
        const entryData = async () => {
            const response = await fetch(
                `${BACKEND_BASE_URL}/login`, {
                method: 'POST',
                body: JSON.stringify(enteredData),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            );
            if (!response.ok) {
                throw new Error('Invalid Credentials !');
            }
            toast.success('Logged In', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            // console.log(response.data.id);
            localStorage.setItem(
                "genArt_EngineX",
                JSON.stringify(enteredEmail));
            setTimeout(() => {
                navigate("/");
            }, 1000);
            // console.log(enteredData);
        };
        entryData().catch((error) => {
            toast.error(error.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        });
    };

    useEffect(() => {
        if (localStorage["genArt_EngineX"]) {
            navigate("/");
        }
    }, []);

    const emailChangeHandler = (event) => {
        setEnteredEmail(event.target.value);
    };

    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value);
    };
    return (
        <>
            <HeaderAuth></HeaderAuth>
            <MDBContainer fluid className='mt-5'>
                <section className='background-radial-gradient overflow-hidden'>
                    <div className='container px-4 py-5 px-md-5 text-center text-lg-start my-5'>
                        <div className='row gx-lg-5 align-items-center mb-5'>
                            {/* Text-Generator */}
                            <div className='col-lg-6 mb-5 mb-lg-0' style={{ zIndex: 10 }}>
                                <h1 className='my-5 display-4 fw-bold ls-tight' style={{ color: '#543e00' }}>
                                    Text to image generator <br />
                                    <span style={{ color: 'black' }}>based on OpenAI Dall-E</span>
                                </h1>
                                <p className='mb-4 opacity-80' style={{ color: 'black', fontStyle: "italic" }}>
                                    DALL-E is an advanced AI model created by OpenAI that utilizes a combination of GPT-3 and VQ-VAE algorithms. It is trained to generate high-quality, original images based on textual descriptions, allowing it to bring imagined concepts to life. By understanding the semantics and context of the input text, DALL-E can produce visually coherent and creative visuals, pushing the boundaries of generative AI in the realm of image synthesis.
                                </p>
                            </div>
                            {/* SignUp Form  */}
                            <div className='col-lg-6 mb-5 mb-lg-0 position-relative'>
                                <div id='radius-shape-1' className='position-absolute rounded-circle shadow-5-strong'></div>
                                <div id='radius-shape-2' className='position-absolute shadow-5-strong'></div>

                                <div
                                    className='card cascading-right'
                                    style={{ background: 'hsla(0, 0%, 100%, 0.55)', backdropFilter: 'blur(30px)' }}
                                >
                                    <div className='card-body p-5 shadow-5 text-center'>
                                        <h2 className='fw-bold mb-5'>Login now</h2>
                                        <form onSubmit={submitHandler}>

                                            <MDBInput className='mb-4' value={enteredEmail} onChange={emailChangeHandler} type='email' id='registerEmail' label='Email' />
                                            <MDBInput className='mb-4' value={enteredPassword} onChange={passwordChangeHandler} type='password' id='registerPassword' label='Password' />

                                            <MDBBtn type='submit' block className='mb-4' style={{ color: "white", background: "black" }}>
                                                Sign in
                                            </MDBBtn>

                                            <div className='text-center'>
                                                <p>Don't have an account ?</p>
                                                <MDBBtn color='link' type='button' className='mx-1' style={{ color: "black" }} onClick={() => {
                                                    navigate("/register")
                                                }}>Sign up here</MDBBtn>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section >
                <ToastContainer></ToastContainer>
            </MDBContainer >
            <Footer></Footer>
        </>
    );
}

export default Login;

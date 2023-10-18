import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import imgSrc from "./assests/logo.svg"
import env from "react-dotenv";
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBRow,
    MDBCol,
    MDBInput,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBCollapse,
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter
} from 'mdb-react-ui-kit';

export default function Header() {

    const navigate = useNavigate();
    const logoutHandler = () => {
        localStorage.setItem("genArt_EngineX", "");
        navigate("/login");
    }
    const [showBasic, setShowBasic] = useState(false);
    //Modal
    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = () => setBasicModal(!basicModal);
    //Updating Perssonal Information
    const [editing, setEditing] = useState(false);
    const BACKEND_BASE_URL = env.API_URL;
    const LoggedInEmail = localStorage.getItem("genArt_EngineX");

    //Getting User's Information
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [userName, setuserName] = useState('');
    const [phoneNumber, setphoneNumber] = useState('');

    const profileHandler = async () => {
        if (!localStorage["genArt_EngineX"]) {
            navigate("/login");
            return;
        }
        const fetchDetails = async () => {
            const response = await fetch(`${BACKEND_BASE_URL}/userinformation/${LoggedInEmail.replace(/['"]+/g, '')}`);
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const responseData = await response.json();
            setfirstName(responseData.firstName);
            setlastName(responseData.lastName);
            setuserName(responseData.userName);
            setphoneNumber(responseData.phonenumber);
        };
        fetchDetails().catch((error) => {
            alert("Something wrong happened!");
        });
        toggleShow();
    }


    return (
        <>
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Personal Information</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <MDBRow className='mb-4'>
                                <MDBCol>
                                    <MDBInput className='mb-4' disabled={true} id='first2' value={firstName} label='First name' />
                                </MDBCol>
                                <MDBCol>
                                    <MDBInput className='mb-4' disabled={true} id='last2' value={lastName} label='Last name' />
                                </MDBCol>
                            </MDBRow>

                            <MDBInput className='mb-4' type='text' disabled={true} value={userName} id='registerUsername' label='Username' />
                            <MDBInput className='mb-4' type='number' disabled={true} value={phoneNumber} id='registerPhone' label='Phone Number' />
                        </MDBModalBody>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
            {/* Navigation Buuton */}
            <MDBNavbar fixed='top' expand='lg' dark bgColor='dark' >
                <MDBContainer fluid>
                    <MDBNavbarBrand onClick={() => { navigate("/"); }} style={{ color: "white" }}>
                        <img
                            src={imgSrc}
                            height='30'
                            alt=''
                            loading='lazy'
                        />
                        GenArt_EngineX
                    </MDBNavbarBrand>

                    <MDBNavbarToggler
                        aria-controls='navbarSupportedContent'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                        onClick={() => setShowBasic(!showBasic)}
                    >
                        <MDBIcon icon='bars' fas />
                    </MDBNavbarToggler>

                    <MDBCollapse navbar show={showBasic}  >
                        <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
                            <MDBNavbarItem>
                                <MDBNavbarLink onClick={profileHandler}>Profile</MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink onClick={logoutHandler}>Logout</MDBNavbarLink>
                            </MDBNavbarItem>
                        </MDBNavbarNav>

                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
            <ToastContainer></ToastContainer>
        </>
    );
}
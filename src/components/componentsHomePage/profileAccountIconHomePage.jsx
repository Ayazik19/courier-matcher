import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useAuth } from '../hook/useauth.js';
import { useDispatch } from "react-redux";
import { removeUser } from "../store/slices/userSlice.js";
import CheckAccountPhotoProfile from './CheckAccountPhotoProfile.jsx';
import "./profileAccountIconHomePage.css";

export default function ProfileAccountIconHomePage() {
  const { isAuth, displayName } = useAuth();
  const dispatch = useDispatch();


  return isAuth ? (
    <>
      <div className="home-page-acc-header-right-icon-acc">
        <button className="button-acc-link">
          <Link to="/User-account" className="link-user-acc">
            <div className= 'account-icon'>
              <CheckAccountPhotoProfile />
            </div>
          </Link>
        </button>
        <span className="name-user-acc">{displayName}</span>
      </div>
      <div>
        <button
          className="button-home-page-heaeder-log-out-acc"
          onClick={() => dispatch(removeUser())}
        >
          Log out
        </button>
      </div>
    </>
  ) : (
    <div className="home-page-acc-header-right">
      <button className="button-home-page-header-button-registration-acc">
        <Link to='/Registration-SignIn' className="link-register-header-home-page">
          Register
        </Link>
      </button>
      <button className="button-home-page-header-button-sign-in-acc">
        <Link to='/SignIn-Registration' className="link-sign-in-header-home-page">
          Sign In
        </Link>
      </button>
    </div>
  );
}
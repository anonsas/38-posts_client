import React from 'react';
import './LoginPolicies.scss';

import { useNavigate } from 'react-router-dom';

function LoginPolicies({ link }) {
  const navigate = useNavigate();

  return (
    <div className="login-policies">
      <p className="login-policies__paragraph">
        By signing-in you agree to the FinalExam (FAKE) Conditions of Use & Sale. Please
        see our Privacy Notice, our Cookies Notice and our Interest-based Ads Notice.
      </p>
      <button
        type="button"
        className="login-policies__register-btn"
        onClick={() => navigate(link)}
      >
        Create your Account
      </button>
    </div>
  );
}

export default LoginPolicies;

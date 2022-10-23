import React from 'react';
import './LoginPolicies.scss';

import { useNavigate } from 'react-router-dom';

function LoginPolicies() {
  const navigate = useNavigate();

  return (
    <div className="login-policies-container">
      <p className="login-policies__paragraph">
        By signing-in you agree to the BookVilnius (FAKE) Conditions of Use & Sale. Please
        see our Privacy Notice, our Cookies Notice and our Interest-based Ads Notice.
      </p>
      <button
        type="button"
        className="login-policies__register-btn"
        onClick={() => navigate('/register')}
      >
        Create your BookVilnius Account
      </button>
    </div>
  );
}

export default LoginPolicies;

import './Form.scss';

function Form({
  submitFormHandler,
  formType,
  username,
  setUsername,
  password,
  setPassword,
  submitText,
}) {
  return (
    <form onSubmit={submitFormHandler} className="form">
      <div className="form__input-container">
        <label htmlFor={`${formType}-username`} className="form__label">
          Username
        </label>
        <input
          id={`${formType}-username`}
          className="form__input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="off"
        />
      </div>

      <div className="form__input-container">
        <label htmlFor={`${formType}-password`} className="form__label">
          Password
        </label>
        <input
          id={`${formType}-password`}
          className="form__input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
        />
      </div>

      <button type="submit" className="form__submit-btn">
        {submitText}
      </button>
    </form>
  );
}

export default Form;

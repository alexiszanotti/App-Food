import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { Link } from "react-router-dom";
import { startLogin } from "../../Redux/slice/thunkAuth";

const formValidations = {
  email: [value => value.includes("@"), "the email must contain an at sign"],
  password: [value => value?.length >= 6, "The password must have at least 6 characters"],
};

export const Login = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { email, password, onInputChange, isFormValid, emailValid, passwordValid } = useForm(
    {
      email: "",
      password: "",
    },
    formValidations
  );

  const dispatch = useDispatch();

  const { status, errorMessage } = useSelector(state => state.auth);

  const isAuthenticating = useMemo(() => status === "checking", [status]);

  const onSubmit = e => {
    e.preventDefault();
    if (!isFormValid) return;
    dispatch(startLogin({ email, password }));
    setFormSubmitted(true);
  };

  return (
    <div className='auth-containner'>
      <form className='form-auth-container' onSubmit={onSubmit}>
        <h2>Login</h2>
        <input
          type='email'
          placeholder='email'
          name='email'
          value={email}
          onChange={onInputChange}
        />
        {!!emailValid && formSubmitted && <p className='error-message'>{emailValid}</p>}
        <input
          type='password'
          placeholder='password'
          name='password'
          value={password}
          onChange={onInputChange}
        />
        {!!passwordValid && formSubmitted && <p className='error-message'>{passwordValid}</p>}
        {!!errorMessage && <p className='error-message'>{errorMessage}</p>}
        <button disabled={isAuthenticating} type='submit'>
          Sign in
        </button>
        <span>
          <Link to='/register'>
            New? <span>Create an account</span>
          </Link>
        </span>
      </form>
    </div>
  );
};

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuthStore } from "./../../hooks/useAuthStore";
import Spinner from "./../../Components/Spinner/Spinner";

const formValidations = {
  email: [value => value.includes("@"), "the email must contain an at sign"],
  password: [value => value?.length >= 6, "The password must have at least 6 characters"],
};

export const Login = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { email, password, onInputChange, emailValid, passwordValid } = useForm(
    {
      email: "",
      password: "",
    },
    formValidations
  );

  const { startLogin } = useAuthStore();

  const dispatch = useDispatch();

  const { status, errorMessage } = useSelector(state => state.auth);

  const isAuthenticating = useMemo(() => status === "checking", [status]);

  const onSubmit = e => {
    e.preventDefault();
    if (!emailValid && !passwordValid){

      dispatch(startLogin({ email, password }));
    }
    setFormSubmitted(true);
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Authentication error", errorMessage, "error");
    }
  }, [errorMessage]);

  if (isAuthenticating) {
    return <Spinner />;
  }

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

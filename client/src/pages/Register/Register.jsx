import { useEffect, useMemo, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useAuthStore } from "../../hooks/useAuthStore";

const formValidations = {
  email: [value => value.includes("@"), "the email must contain an at sign"],
  password: [value => value?.length >= 6, "The password must have at least 6 characters"],
  name: [value => value?.length >= 3, "The name must have at least 3 characters"],
};

export const Register = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const dispatch = useDispatch();

  const { status, errorMessage } = useSelector(state => state.auth);

  const isCheckingAuthentication = useMemo(() => status === "checking", [status]);

  const { email, name, password, onInputChange, nameValid, emailValid, passwordValid } = useForm(
    {
      email: "",
      password: "",
      name: "",
    },
    formValidations
  );
  const { startRegister } = useAuthStore();
  const onSubmit = e => {
    e.preventDefault();
    dispatch(startRegister({ email, name, password }));
    setFormSubmitted(true);
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Authentication error", errorMessage, "error");
    }
  }, [errorMessage]);

  return (
    <div className='auth-containner'>
      <form className='form-auth-container' onSubmit={onSubmit}>
        <h3>Creatte an account</h3>
        <input type='text' placeholder='name' name='name' value={name} onChange={onInputChange} />
        {!!nameValid && formSubmitted && <p className='error-message'>{nameValid}</p>}
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
        <button disabled={isCheckingAuthentication} type='submit'>
          Create
        </button>
        <Link to='/login'>Sign In</Link>
      </form>
    </div>
  );
};

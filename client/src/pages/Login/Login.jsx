import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { Link } from "react-router-dom";
import { checkingAuthentication } from "../../Redux/slice/thunkAuth";

export const Login = () => {
  const { email, password, onInputChange } = useForm({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const { status } = useSelector(state => state.auth);

  const isAuthenticating = useMemo(() => status === "checking", [status]);

  const onSubmit = e => {
    e.preventDefault();
    dispatch(checkingAuthentication(email, password));
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
        <input
          type='password'
          placeholder='password'
          name='password'
          value={password}
          onChange={onInputChange}
        />
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

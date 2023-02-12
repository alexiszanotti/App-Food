import { AuthLayout } from "../../auth/layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

export const Login = () => {
  const { email, password, onInputChange, onResetForm } = useForm({
    email: "",
    password: "",
  });

  const onSubmit = e => {
    e.preventDefault();
    console.log({ email, password });
    onResetForm();
  };

  return (
    <AuthLayout title='Login'>
      <form onSubmit={onSubmit}>
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
        <button type='submit'>Login</button>
        <GoogleLogin
          onSuccess={credentialResponse => {
            console.log(credentialResponse);
            const decode = jwt_decode(credentialResponse.credential);
            console.log(decode);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
        <button onClick={() => googleLogout()}>Logout</button>;<p>Crear una cuenta</p>
      </form>
    </AuthLayout>
  );
};

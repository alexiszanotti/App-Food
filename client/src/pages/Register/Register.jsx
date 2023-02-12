import { AuthLayout } from "../../auth/layout/AuthLayout";
import { useForm } from "../../hooks/useForm";

export const Register = () => {
  const { email, name, password, onInputChange, onResetForm } = useForm({
    email: "",
    password: "",
    name: "",
  });

  const onSubmit = e => {
    e.preventDefault();
    console.log({ email, password });
    onResetForm();
  };

  return (
    <AuthLayout title='Login'>
      <form onSubmit={onSubmit}>
        <input type='text' placeholder='name' name='name' value={name} onChange={onInputChange} />
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
        <button type='submit'>Create</button>
        <p>Sign In</p>
      </form>
    </AuthLayout>
  );
};

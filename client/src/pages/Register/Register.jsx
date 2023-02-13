import { useForm } from "../../hooks/useForm";
import { Link } from "react-router-dom";

export const Register = () => {
  const { email, name, password, onInputChange } = useForm({
    email: "",
    password: "",
    name: "",
  });

  const onSubmit = e => {
    e.preventDefault();
    console.log({ email, password, name });
  };

  return (
    <div className='auth-containner'>
      <form className='form-auth-container' onSubmit={onSubmit}>
        <h3>Creatte an account</h3>
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
        <Link to='/login'>Sign In</Link>
      </form>
    </div>
  );
};

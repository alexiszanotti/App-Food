import "./AuthLayout.css";

export const AuthLayout = ({ children, title = "" }) => {
  return (
    <div className='container-layout'>
      <div className='layout-form'>
        <h3>{title}</h3>
        {children}
      </div>
    </div>
  );
};

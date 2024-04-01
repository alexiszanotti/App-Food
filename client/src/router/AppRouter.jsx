import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Spinner from "../Components/Spinner/Spinner";
import { CreateRecipe, DetailRecipe, Home, Landing, Login, Register } from "../pages";
import { useAuthStore } from "./../hooks/useAuthStore";
export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === "checking") {
    return <Spinner />;
  }

  return (
    <Routes>
      {status === "not-authenticated" ? (
        <>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/*' element={<Navigate to='/login' />} />
        </>
      ) : (
        <>
          <Route path='/home' element={<Home />} />
          <Route exact path='/' element={<Landing />} />
          <Route path='/recipes/:id' element={<DetailRecipe />} />
          <Route path='/recipe' element={<CreateRecipe />} />
          <Route path='/*' element={<Navigate to='/' />} />
        </>
      )}
    </Routes>
  );
};

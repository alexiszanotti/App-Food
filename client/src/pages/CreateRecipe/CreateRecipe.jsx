import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { postRecipe } from "../../Redux/slice";
import { useForm } from "./../../hooks/useForm";
import Swal from "sweetalert2";
import "./CreateRecipe.css";

const formValidations = {
  title: [value => value?.length >= 3, "Minimum three characters"],
  summary: [value => value],
  spoonacularScore: [value => value && value <= 10, "It has to be a number between 1 and 10"],
  healthScore: [value => value && value <= 100, "It has to be a number between 1 and 10"],
  steps: [value => value],
};

export const CreateRecipe = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    summary,
    summaryValid,
    spoonacularScore,
    spoonacularScoreValid,
    healthScore,
    healthScoreValid,
    title,
    titleValid,
    steps,
    stepsValid,
    onInputChange,
    isFormValid,
    onResetForm,
  } = useForm(
    { title: "", summary: "", spoonacularScore: "", healthScore: "", steps: "" },
    formValidations
  );

  const onSubmit = e => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    const dataToSubmit = {
      summary,
      title,
      spoonacularScore: +spoonacularScore,
      healthScore: +healthScore,
      steps,
    };
    dispatch(postRecipe(dataToSubmit));
    onResetForm();
    Swal.fire("Recipe created successfully!", "", "success");
    navigate("/home");
  };

  return (
    <div className='container-form'>
      <div className='form-container'>
        <div className='icon-container'>
          <Link to='/home'>
            <i className='icon fas fa-arrow-left'></i>
          </Link>
        </div>
        <h1 className='form-title'>Create your recipe</h1>
        <form onSubmit={onSubmit}>
          <div>
            <input
              placeholder='Title...'
              className='form-input'
              type='text'
              name='title'
              value={title}
              onChange={onInputChange}
            />
            {!!titleValid && formSubmitted && (
              <p className='error'>
                {" "}
                <i className='fas fa-light fa-circle-exclamation'></i>
                {titleValid}{" "}
              </p>
            )}
          </div>
          <div>
            <input
              placeholder='Summary...'
              className='form-input'
              type='text'
              name='summary'
              value={summary}
              onChange={onInputChange}
            />
            {!!summaryValid && formSubmitted && (
              <p className='error'>
                {" "}
                <i className='fas fa-light fa-circle-exclamation'></i>
                {summaryValid}{" "}
              </p>
            )}
          </div>
          <div>
            <input
              placeholder='Score...'
              className='form-input'
              type='number'
              name='spoonacularScore'
              value={spoonacularScore}
              onChange={onInputChange}
            />
            {!!spoonacularScoreValid && formSubmitted && (
              <p className='error'>
                {" "}
                <i className='fas fa-light fa-circle-exclamation'></i>
                {spoonacularScoreValid}{" "}
              </p>
            )}
          </div>
          <div>
            <input
              placeholder='Health Score...'
              className='form-input'
              type='number'
              name='healthScore'
              value={healthScore}
              onChange={onInputChange}
            />
            {!!healthScoreValid && formSubmitted && (
              <p className='error'>
                {" "}
                <i className='fas fa-light fa-circle-exclamation'></i>
                {healthScoreValid}{" "}
              </p>
            )}
          </div>
          <div>
            <input
              placeholder='Steps...'
              className='form-input'
              type='text'
              name='steps'
              value={steps}
              onChange={onInputChange}
            />
            {stepsValid && formSubmitted && (
              <p className='error'>
                {" "}
                <i className='fas fa-light fa-circle-exclamation'></i>
                {stepsValid}{" "}
              </p>
            )}
          </div>

          <button className='btn-create' type='submit'>
            Create Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

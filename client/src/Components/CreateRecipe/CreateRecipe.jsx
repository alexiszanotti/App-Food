import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postRecipe } from "../../Store/slice";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./CreateRecipe.css";

const MySwal = withReactContent(Swal);
const validate = ({ title, summary, spoonacularScore, healthScore, instructions }) => {
  let errors = {};
  if (!title) errors.title = "Title is required ";
  else if (!summary) errors.summary = "Summary es required";
  else if (spoonacularScore < 1 || spoonacularScore > 10)
    errors.spoonacularScore = "The score has to be a number between 1 and 10 ";
  else if (healthScore < 1 || healthScore > 100)
    errors.healthScore = "The Health Score has to be a number between 1 and 100";
  else if (!instructions) errors.instructions = "Instructions es required";

  return errors;
};

export default function CreateRecipe() {
  const dispatch = useDispatch();
  const diet = useSelector(state => state.recipeReducer.diets);
  const history = useHistory();
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    title: "",
    summary: "",
    spoonacularScore: "",
    healthScore: "",
    instructions: "",
    diet: [],
  });

  function handleInputChange({ target }) {
    setInput({
      ...input,
      [target.name]: target.value,
    });
    setErrors(
      validate({
        ...input,
        [target.name]: target.value,
      })
    );
  }

  function handleCheck({ target }) {
    if (target.checked) {
      setInput({
        ...input,
        diet: [...input.diet, target.value],
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      dispatch(postRecipe(input));
      MySwal.fire({
        title: <p>Hello World</p>,
        footer: "Copyright 2018",
        didOpen: () => {
          MySwal.clickConfirm();
        },
      }).then(() => {
        return MySwal.fire("Recipe successfully created!", "", "success");
      });
      history.push("/home");
    } else {
      MySwal.fire({
        didOpen: () => {
          MySwal.clickConfirm();
        },
      }).then(() => {
        return MySwal.fire("UPS!", "There can be no empty fields! ", "error");
      });
    }
  }

  return (
    <div className='container-form'>
      <div className='form-container'>
        <Link to='/home'>
          <button className='btn-create'>Back go home</button>
        </Link>
        <h1 className='form-title'>Create your recipe</h1>
        <form onSubmit={e => handleSubmit(e)}>
          <div>
            <input
              placeholder='Title...'
              className='form-input'
              type='text'
              name='title'
              value={input.title}
              onChange={handleInputChange}
            />
            {errors.title && <p className='error'>{errors.title} </p>}
          </div>
          <div>
            <input
              placeholder='Summary...'
              className='form-input'
              type='text'
              name='summary'
              value={input.summary}
              onChange={handleInputChange}
            />
            {errors.summary && <p className='error'>{errors.summary} </p>}
          </div>
          <div>
            <input
              placeholder='Score...'
              className='form-input'
              type='number'
              name='spoonacularScore'
              value={input.spoonacularScore}
              onChange={handleInputChange}
            />
            {errors.spoonacularScore && <p className='error'>{errors.spoonacularScore} </p>}
          </div>
          <div>
            <input
              placeholder='Health Score...'
              className='form-input'
              type='number'
              name='healthScore'
              value={input.healthScore}
              onChange={handleInputChange}
            />
            {errors.healthScore && <p className='error'>{errors.healthScore} </p>}
          </div>
          <div>
            <input
              placeholder='Steps...'
              className='form-input'
              type='text'
              name='instructions'
              value={input.instructions}
              onChange={handleInputChange}
            />
            {errors.instructions && <p className='error'>{errors.instructions} </p>}
          </div>
          <div className='form-checkbox'>
            {diet.map(({ id, name }) => {
              return (
                <label key={id}>
                  <input
                    className='form-checkbox'
                    type='checkbox'
                    onChange={e => handleCheck(e)}
                    value={name}
                  />
                  {name}
                </label>
              );
            })}
          </div>
          <button disabled={errors ? true : false} className='btn-create' type='submit'>
            Create Recipe
          </button>
        </form>
      </div>
    </div>
  );
}

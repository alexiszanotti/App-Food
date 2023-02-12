import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postRecipe } from "../../Redux/slice";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./CreateRecipe.css";

const MySwal = withReactContent(Swal);

export const CreateRecipe = () => {
  const dispatch = useDispatch();
  const diet = useSelector(state => state.recipes.diets);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [disabledSubmit, setDisabledSubmit] = useState(true);

  const [input, setInput] = useState({
    title: "",
    summary: "",
    spoonacularScore: "",
    healthScore: "",
    instructions: "",
    diet: [],
  });

  let errorsMsg = {};
  const validate = ({ title, summary, spoonacularScore, healthScore, instructions }) => {
    if (!title) errorsMsg.title = "Title is required ";
    else if (!summary) errorsMsg.summary = "Summary es required";
    else if (spoonacularScore < 1 || spoonacularScore > 10)
      errorsMsg.spoonacularScore = "The score has to be a number between 1 and 10 ";
    else if (healthScore < 1 || healthScore > 100)
      errorsMsg.healthScore = "The Health Score has to be a number between 1 and 100";
    else if (!instructions) errorsMsg.instructions = "Instructions es required";

    return errorsMsg;
  };

  const handleInputChange = ({ target }) => {
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
  };

  const handleCheck = ({ target }) => {
    if (target.checked) {
      setInput({
        ...input,
        diet: [...input.diet, target.value],
      });
    }
  };

  useEffect(() => {
    if (
      input.summary &&
      input.title &&
      input.instructions &&
      input.spoonacularScore &&
      input.healthScore &&
      input.diet.length > 0
    ) {
      setDisabledSubmit(false);
    } else {
      setDisabledSubmit(true);
    }
  }, [input]);

  const handleSubmit = e => {
    e.preventDefault();
    if (
      !input.summary ||
      !input.title ||
      !input.instructions ||
      !input.spoonacularScore ||
      !input.healthScore ||
      input.diet.length === 0
    )
      return;
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
      navigate("/home");
    } else {
      MySwal.fire({
        didOpen: () => {
          MySwal.clickConfirm();
        },
      }).then(() => {
        return MySwal.fire("UPS!", "There can be no empty fields! ", "error");
      });
    }
  };

  return (
    <div className='container-form'>
      <div className='form-container'>
        <Link to='/home'>
          <button className='btn-create'>Back go home</button>
        </Link>
        <h1 className='form-title'>Create your recipe</h1>
        <form onSubmit={handleSubmit}>
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
          <button disabled={disabledSubmit} className='btn-create' type='submit'>
            Create Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

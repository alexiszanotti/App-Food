import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, postRecipe } from "../../Actions/index.js";

function validate(input) {
  let errors = {};
  if (!input.title) errors.title = "Title is required ";
  else if (!input.summary) errors.summary = "Summary es required";
  else if (input.score.value > 10 || input.score.value < 1)
    errors.score = "The score has to be a number between 1 and 10 ";
  else if (input.health_score.value > 100 || input.health_score.value < 1)
    errors.health_score = "The Health Score has to be a number between 1 and 10";
  else if (!input.steps) errors.steps = "Steps es required";

  return errors;
}

export default function CreateRecipe() {
  const dispatch = useDispatch();
  const diets = useSelector(state => state.diets);
  const history = useHistory();
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    title: "",
    summary: "",
    score: "",
    health_score: "",
    steps: "",
    diets: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleCheck(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        diets: [...input.diets, e.target.value],
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postRecipe(input));
    history.push("/home");
  }

  useEffect(() => {
    dispatch(getDiets());
  }, []);

  return (
    <div>
      <Link to='/home'>
        <button>Back</button>
      </Link>
      <h1>Create your recipe!</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <div>
          <label> Title:</label>
          <input type='text' name='title' value={input.title} onChange={e => handleChange(e)} />
          {errors.title && <p className='error'>{errors.title} </p>}
        </div>
        <div>
          <label> Summary:</label>
          <input type='text' name='summary' value={input.summary} onChange={e => handleChange(e)} />
          {errors.summary && <p className='error'>{errors.summary} </p>}
        </div>
        <div>
          <label> Score:</label>
          <input type='number' name='score' value={input.score} onChange={e => handleChange(e)} />
          {errors.score && <p className='error'>{errors.score} </p>}
        </div>
        <div>
          <label> Health Score:</label>
          <input
            type='number'
            name='health_score'
            value={input.health_score}
            onChange={e => handleChange(e)}
          />
          {errors.health_score && <p className='error'>{errors.health_score} </p>}
        </div>
        <div>
          <label> Steps:</label>
          <input type='text' name='steps' value={input.steps} onChange={e => handleChange(e)} />
          {errors.steps && <p className='error'>{errors.steps} </p>}
        </div>
        <div>
          <label>Diets: </label>
          {diets.map(el => {
            return (
              <label>
                <input type='checkbox' onChange={e => handleCheck(e)} value={el.name} />
                {el.name}
              </label>
            );
          })}
        </div>
        <div>
          <button type='submit'>Create Recipe</button>
        </div>
      </form>
    </div>
  );
}

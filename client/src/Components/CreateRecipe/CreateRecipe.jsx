import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, postRecipe } from "../../Actions/index.js";

export default function CreateRecipe() {
  const dispatch = useDispatch();
  const diets = useSelector(state => state.diets);

  const [input, setInpu] = useState({
    title: "",
    summary: "",
    score: "",
    health_score: "",
    steps: "",
    diets: [],
  });

  useEffect(() => {
    dispatch(getDiets());
  }, []);

  return (
    <div>
      <Link to='/home'>
        <button>Back</button>
      </Link>
      <h1>Create your recipe!</h1>
      <form>
        <div>
          <label> Title:</label>
          <input type='text' name='title' value={input.title} />
        </div>
        <div>
          <label> Summary:</label>
          <input type='text' name='summary' value={input.summary} />
        </div>
        <div>
          <label> Score:</label>
          <input type='number' name='score' value={input.score} />
        </div>
        <div>
          <label> Health Score:</label>
          <input type='number' name='health_score' value={input.health_score} />
        </div>
        <div>
          <label> Steps:</label>
          <input type='text' name='steps' value={input.steps} />
        </div>
        <div>
          <label>Diets: </label>
          <label>
            <input type='checkbox' name='gluten free' value='gluten free' />
            Gluten Free
          </label>
          <label>
            <input type='checkbox' name='Ketogenic' value='Ketogenic' />
            Ketogenic
          </label>
          <label>
            <input type='checkbox' name='Vegetarian' value='lacto ovo vegetarian' />
            Vegetarian
          </label>
          <label>
            <input type='checkbox' name='lacto ovo vegetarian' value='lacto ovo vegetarian' />
            Lacto-Ovo-Vegetarian
          </label>
          <label>
            <input type='checkbox' name='Ovo-Vegetarian' value='lacto ovo vegetarian' />
            Ovo-Vegetarian
          </label>
          <label>
            <input type='checkbox' name='vegan' value='vegan' />
            Vegan
          </label>
          <label>
            <input type='checkbox' name='pescatarian' value='pescatarian' />
            Pescetarian
          </label>
          <label>
            <input type='checkbox' name='paleolithic' value='paleolithic' />
            Paleo
          </label>
          <label>
            <input type='checkbox' name='primal' value='primal' />
            Primal
          </label>
          <label>
            <input type='checkbox' name='fodmap friendly' value='fodmap friendly' />
            Low FODMAP
          </label>
          <label>
            <input type='checkbox' name='whole 30' value='whole 30' />
            Whole30
          </label>
        </div>
      </form>
    </div>
  );
}

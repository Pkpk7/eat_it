import React, { useState, useEffect } from "react";
import { TweenMax, TimelineMax } from "gsap";
import "../style.css";
import Button from "./Button";
import axios from "axios";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import { PDFLink } from "./Link";

function Recipe() {
  const [recipeTimeline] = useState(new TimelineMax());
  const [recipeName, setRecipeName] = useState("");
  const [photo, setPhoto] = useState("");
  const [recipe, setRecipe] = useState("");
  const [ingredients, setIngredients] = useState([]);

  let tweenTarget = null;

  useEffect(() => {
    // call only to get the api response for the first recipe, set the animation time for 0
    handleChildClick("recipe__exit-button", 0);

    recipeTimeline.to(tweenTarget, 0.5, {
      width: "80vw",
      height: "80vh",
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function updated(howLong) {
    TweenMax.fromTo(
      ".recipe__smaller-div",
      howLong,
      { x: "-10vh", opacity: 0 },
      { x: 0, opacity: 1 }
    );
    //setOnce(false);
  }

  function handleChildClick(buttonType, animationTime) {
    if (buttonType === "recipe__okay-button") {
    } else {
      let recipeNameVar = "";
      let photoVar = "";
      let recipeVar = "";
      let ingredientsVar = [];

      axios
        .get(`https://www.themealdb.com/api/json/v1/1/random.php`)
        .then((res) => {
          const recipeAPIObject = res.data.meals[0];
          if (recipeAPIObject.strMeal) recipeNameVar = recipeAPIObject.strMeal;
          if (recipeAPIObject.strMealThumb)
            photoVar = recipeAPIObject.strMealThumb;
          if (recipeAPIObject.strInstructions)
            recipeVar = recipeAPIObject.strInstructions;
          console.log(recipeName);

          let i = 1;
          while (recipeAPIObject[`strIngredient${i}`]) {
            ingredientsVar.push(
              recipeAPIObject[`strIngredient${i}`] +
                " " +
                recipeAPIObject[`strMeasure${i}`]
            );
            i++;
          }

          TweenMax.to(".recipe__smaller-div", animationTime, {
            x: "10vw",
            opacity: 0,
            onComplete: function () {
              if (photoVar) setPhoto(photoVar);
              else setPhoto("");
              if (recipeNameVar) setRecipeName(recipeNameVar);
              else setRecipeName("");
              if (recipeVar) setRecipe(recipeVar);
              else setRecipe("");
              if (ingredientsVar.length > 0) setIngredients(ingredientsVar);
              else setIngredients([]);
            },
          });
        })
        .catch((error) => console.log(error.message));
    }
  }

  return (
    <div className="recipe">
      <div className="recipe__content" ref={(div) => (tweenTarget = div)}>
        <SimpleBar style={{ maxHeight: "100%" }}>
          <div className="recipe__smaller-div">
            {recipeName && <h1 className="recipe__title">{recipeName}</h1>}
            {photo && (
              <img
                src={photo}
                alt="Food"
                className="recipe__image"
                onLoad={() => updated(1)}
              />
            )}

            {ingredients.length > 0 && (
              <ul>
                {ingredients.map((element, index) => {
                  return <li key={index}> {element} </li>;
                })}
              </ul>
            )}

            {recipe && <p className="recipe__steps">{recipe}</p>}
          </div>
        </SimpleBar>
      </div>
      <div className="recipe__button-container">
        <PDFLink
          photo={photo}
          recipe={recipe}
          ingredients={ingredients}
          recipeName={recipeName}
          handleChildClick={handleChildClick}
        />
        <Button
          buttonType="recipe__exit-button"
          handleChildClick={handleChildClick}
        />
      </div>
    </div>
  );
}

export default Recipe;

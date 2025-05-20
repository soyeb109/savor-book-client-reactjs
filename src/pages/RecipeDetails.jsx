import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { FaHeart } from "react-icons/fa";

const RecipeDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://savor-book-server.onrender.com/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load recipe details");
        navigate("/404");
      });
  }, [id, navigate]);

  const handleLike = () => {
    if (user?.email === recipe?.authorEmail) {
      toast.error("You cannot like your own recipe");
      return;
    }

    fetch(`https://savor-book-server.onrender.com/recipes/like/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        setRecipe((prev) => ({
          ...prev,
          likeCount: (prev.likeCount || 0) + 1,
        }));
        toast.success("You liked this recipe!");
      })
      .catch(() => toast.error("Failed to like recipe"));
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="text-center py-20 text-red-500">
        <p>Recipe not found!</p>
      </div>
    );
  }

  return (
    <div className="w-11/12 max-w-5xl mx-auto my-10">
      <h2 className="text-2xl font-semibold mb-4 text-center text-lime-600">
        {recipe.likeCount} people interested in this recipe
      </h2>

      <div className="card bg-base-100 shadow-xl">
        <figure>
          <img
            src={
              recipe.image ||
              "https://via.placeholder.com/400x250?text=No+Image"
            }
            alt={recipe.title}
            className="w-full h-96 object-cover rounded-3xl"
          />
        </figure>

        <div className="card-body">
          <h1 className="card-title text-3xl">{recipe.title}</h1>
          <p>
            <strong>Cuisine:</strong> {recipe.cuisineType}
          </p>
          <p>
            <strong>Preparation Time:</strong> {recipe.prepTime} minutes
          </p>
          <p>
            <strong>Categories:</strong> {recipe.categories?.join(", ")}
          </p>

          <div className="mt-4">
            <h2 className="font-bold mb-1">Ingredients:</h2>
            <ul className="list-disc ml-5 text-sm">
              {recipe.ingredients.split(",").map((item, index) => (
                <li key={index}>{item.trim()}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <h2 className="font-bold mb-1">Intructions:</h2>
            <p className="text-sm">{recipe.instructions}</p>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-lg font-semibold flex items-center gap-3">
              <FaHeart /> Likes: {recipe.likeCount}
            </p>
            <button onClick={handleLike} className="btn btn-secondary btn-sm">
              Like
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;

import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const AddRecipe = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCategories([...categories, value]);
    } else {
      setCategories(categories.filter((cat) => cat !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const newRecipe = {
      image: form.image.value,
      title: form.title.value,
      ingredients: form.ingredients.value,
      instructions: form.instructions.value,
      cuisineType: form.cuisineType.value,
      prepTime: parseInt(form.prepTime.value),
      categories: categories,
      likeCount: 0,

      authorName: user.displayName || "Annomyous",
      authorEmail: user.email,
    };

    try {
      const res = await fetch(
        "https://savor-book-server.onrender.com/add-recipe",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(newRecipe),
        }
      );

      const data = await res.json();
      if (data.insertedId || data.acknowledged) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Recipe added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/all-recipes");
      } else {
        throw new Error("Failed to add recipe");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: `<p>${error.message}</p>`,
      });
    }
  };

  const category = ["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan"];

  return (
    <div className="max-w-3xl mx-auto p-6 shadow rounded my-12">
      <h2 className="text-2xl font-bold mb-8 text-center mt-6 text-lime-500 ">
        Add a New Recipe
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="title"
          placeholder="Recipe Title"
          className="input input-bordered w-full"
          required
        />
        <textarea
          name="ingredients"
          placeholder="Ingredients (comma separated)"
          className="textarea textarea-bordered w-full"
          required
        ></textarea>
        <textarea
          name="instructions"
          placeholder="Instructions"
          className="textarea textarea-bordered w-full"
          required
        ></textarea>

        <div>
          <label className="font-semibold block mb-1">Cuisine Type</label>
          <select
            name="cuisineType"
            className="select select-bordered w-full"
            required
          >
            <option value="">Select one</option>
            <option>Italian</option>
            <option>Mexican</option>
            <option>Bangladeshi</option>
            <option>Chinese</option>
            <option>Others</option>
          </select>
        </div>

        <input
          type="number"
          name="prepTime"
          placeholder="Preparation Time (minutes)"
          className="input input-bordered w-full"
          required
        />

        <div>
          <label className="font-semibold block mb-4">Categories</label>
          <div className="flex flex-wrap gap-3">
            {category.map((cat) => (
              <label key={cat} className="label cursor-pointer gap-2">
                <input
                  type="checkbox"
                  value={cat}
                  onChange={handleCategoryChange}
                  className="checkbox checkbox-primary"
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full my-6">
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;

import React, { useState } from "react";
import Swal from "sweetalert2";

const UpdateRecipeModal = ({ recipe, onClose, onUpdate }) => {
  const {
    _id,
    image = "",
    title = "",
    ingredients = "",
    instructions = "",
    cuisineType = "",
    preparationTime = "",
    categories = "",
  } = recipe || {};

  const [formData, setFormData] = useState({
    image,
    title,
    ingredients,
    instructions,
    cuisineType,
    preparationTime,
    categories,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`https://savor-book-server.onrender.com/my-recipes/${_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Recipe updated successfully") {
          Swal.fire({
            icon: "success",
            title: "Recipe updated",
            showConfirmButton: false,
            timer: 1500,
          });
          onUpdate({ ...formData, _id }); // id for state update
          onClose();
        } else {
          Swal.fire("Error", "Failed to update recipe", "error");
        }
      })
      .catch(() => {
        Swal.fire("Error", "Failed to update recipe", "error");
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-xl font-bold"
          aria-label="Close modal"
        >
          &times;
        </button>
        <h2 className="text-2xl mb-4 text-center font-semibold text-lime-700">
          Update Recipe
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className="input input-bordered w-full"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">Cuisine Type</label>
            <select
              name="cuisineType"
              className="select select-bordered w-full"
              value={formData.cuisineType}
              onChange={handleChange}
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

          <div>
            <label className="block font-medium mb-1" htmlFor="preparationTime">
              Preparation Time (minutes)
            </label>
            <input
              id="preparationTime"
              name="preparationTime"
              type="number"
              min="1"
              className="input input-bordered w-full"
              value={formData.preparationTime}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1" htmlFor="categories">
              Categories (comma separated)
            </label>
            <input
              id="categories"
              name="categories"
              type="text"
              className="input input-bordered w-full"
              value={formData.categories}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-medium mb-1" htmlFor="image">
              Image URL
            </label>
            <input
              id="image"
              name="image"
              type="text"
              className="input input-bordered w-full"
              value={formData.image}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-medium mb-1" htmlFor="ingredients">
              Ingredients
            </label>
            <textarea
              id="ingredients"
              name="ingredients"
              className="textarea textarea-bordered w-full"
              rows={3}
              value={formData.ingredients}
              onChange={handleChange}
            ></textarea>
          </div>

          <div>
            <label className="block font-medium mb-1" htmlFor="instructions">
              Instructions
            </label>
            <textarea
              id="instructions"
              name="instructions"
              className="textarea textarea-bordered w-full"
              rows={4}
              value={formData.instructions}
              onChange={handleChange}
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary w-full mt-4">
            Update Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateRecipeModal;

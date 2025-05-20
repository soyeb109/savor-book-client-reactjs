import React, { useContext, useEffect, useState } from "react";
import { Bounce, Fade } from "react-awesome-reveal";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router";
import UpdateRecipeModal from "./UpdateRecipeModal";

const MyRecipes = () => {
  const { user } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchMyRecipes = async () => {
    try {
      const res = await fetch(
        `https://savor-book-server.onrender.com/my-recipes?email=${user.email}`
      );
      const data = await res.json();
      setRecipes(data);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch your recipes", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) fetchMyRecipes();
  }, [user]);

  const handleEditClick = (recipe) => {
    setEditingRecipe(recipe);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://savor-book-server.onrender.com/my-recipes/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (
              data.deletedCount > 0 ||
              data.message === "Recipe deleted successfully!"
            ) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Recipe deleted successfully",
                showConfirmButton: false,
                timer: 1500,
              });

              setRecipes((prevRecipes) =>
                prevRecipes.filter((recipe) => recipe._id !== id)
              );
            }
          })
          .catch(() => {
            Swal.fire("Error", "Failed to delete recipe", "error");
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-dots loading-sm"></span>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <Bounce cascade damping={0.1}>
        <div className="flex flex-col items-center text-center justify-center text-red-500 h-64 mt-12">
          <img
            src="https://cdn-icons-png.flaticon.com/512/706/706164.png"
            alt="Empty Plate"
            className="w-20 h-20 mb-4 animate-pulse"
          />
          <p className="text-xl font-semibold">
            You haven't added any recipes yet!
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Please add some delicious recipes 🍽️
          </p>
        </div>
      </Bounce>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-12 text-center my-12 text-lime-600 ">
        My Recipes
      </h2>

      <Fade cascade damping={0.1} triggerOnce>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="card bg-base-100 shadow-md hover:scale-105 transition-transform duration-300"
            >
              <figure>
                <img
                  src={recipe.image || "https://via.placeholder.com/300x200"}
                  alt={recipe.title}
                  className="h-48 w-full object-cover rounded-t"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{recipe.title}</h3>
                <p>
                  <strong>Cuisine:</strong> {recipe.cuisineType}
                </p>
                <p>
                  <strong>Prep Time:</strong> {recipe.preparationTime} mins
                </p>
                <p>
                  <strong>Likes:</strong> {recipe.likeCount || 0}
                </p>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => handleEditClick(recipe)}
                    className="btn btn-sm btn-primary"
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(recipe._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <button className="btn btn-primary">
            <Link to="/add-recipe">Add New Recipe</Link>
          </button>
        </div>
      </Fade>
      {modalOpen && editingRecipe && (
        <UpdateRecipeModal
          recipe={editingRecipe}
          onClose={() => setModalOpen(false)}
          onUpdate={(updatedRecipe) => {
            setRecipes((prev) =>
              prev.map((r) =>
                r._id === updatedRecipe._id ? { ...r, ...updatedRecipe } : r
              )
            );
          }}
        />
      )}
    </div>
  );
};

export default MyRecipes;

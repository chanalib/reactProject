// import React, { useEffect, useState } from 'react';
// import AddRecipe from './AddRecipe';

// interface Ingredient {
//   name: string;
//   count: number;
//   type: string;
// }

// interface Recipe {
//   id: number;
//   name: string;
//   instructions: string[];
//   difficulty: string;
//   duration: number;
//   description: string;
//   userId: number;
//   categoryId: number;
//   img: string;
//   ingredients: Ingredient[];
// }

// const RecipeList: React.FC = () => {
//   const [recipes, setRecipes] = useState<Recipe[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/api/recipe');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data: Recipe[] = await response.json();
//         setRecipes(data);
//       } catch (error: unknown) {
//         if (error instanceof Error) {
//           setError(error.message);
//         } else {
//           setError('An unknown error occurred');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRecipes();
//   }, []);

//   const addRecipe = async (newRecipe: Recipe) => {
//     try {
//       const response = await fetch('http://localhost:8080/api/recipe', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newRecipe),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to add recipe');
//       }

//       const addedRecipe: Recipe = await response.json();
//       setRecipes((prevRecipes) => [...prevRecipes, addedRecipe]);
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         setError(error.message);
//       } else {
//         setError('An unknown error occurred while adding recipe');
//       }
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h1>Recipe List</h1>
//       <AddRecipe onAddRecipe={addRecipe} />
//       <ul>
//         {recipes.map((recipe) => (
//           <li key={recipe.id}>{recipe.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default RecipeList;


// הוסף את השורה הזו בסוף הקובץ
export {};

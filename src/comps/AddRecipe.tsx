// import React, { useState } from 'react';

// interface Ingredient {
//   name: string;
//   count: number;
//   type: string;
// }

// interface Recipe {
//   id?: number; 
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

// interface AddRecipeProps {
//   onAddRecipe: (newRecipe: Recipe) => Promise<void>; // כאן נוודא שהפונקציה מחזירה Promise
// }

// const AddRecipe: React.FC<AddRecipeProps> = ({ onAddRecipe }) => {
//   const [recipe, setRecipe] = useState<Recipe>({
//     name: '',
//     instructions: [],
//     difficulty: '',
//     duration: 0,
//     description: '',
//     userId: 1,
//     categoryId: 1,
//     img: '',
//     ingredients: [],
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setRecipe((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await onAddRecipe(recipe); // קריאה לפונקציה להוספת המתכון
//     setRecipe({
//       name: '',
//       instructions: [],
//       difficulty: '',
//       duration: 0,
//       description: '',
//       userId: 1,
//       categoryId: 1,
//       img: '',
//       ingredients: [],
//     }); 
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" name="name" value={recipe.name} onChange={handleChange} placeholder="שם המתכון" required />
//       <textarea name="description" value={recipe.description} onChange={handleChange} placeholder="תיאור" required />
//       <input type="text" name="difficulty" value={recipe.difficulty} onChange={handleChange} placeholder="רמת קושי" required />
//       <input type="number" name="duration" value={recipe.duration} onChange={handleChange} placeholder="זמן הכנה (דקות)" required />
//       <input type="text" name="img" value={recipe.img} onChange={handleChange} placeholder="קישור לתמונה" required />
//       <button type="submit">הוסף מתכון</button>
//     </form>
//   );
// };

// export default AddRecipe;
// הוסף את השורה הזו בסוף הקובץ
export {};

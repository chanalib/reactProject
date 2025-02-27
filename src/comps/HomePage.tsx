import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import RecipeList from './RecipeList'; // ייבוא רכיב המתכונים
import { Recipe } from './Recipe'; // ייבוא טיפוס Recipe

const HomePage: React.FC = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    const handleRecipeSelect = (recipe: Recipe) => {
        // כאן תוכל להוסיף פונקציה שתפתח את המתכון המלא
        console.log(recipe);
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
                <RecipeList recipes={recipes} onRecipeSelect={handleRecipeSelect} />
            </Grid>
            <Grid item xs={12} md={4}>
                {/* רכיבים נוספים כאן */}
            </Grid>
        </Grid>
    );
};

export default HomePage;

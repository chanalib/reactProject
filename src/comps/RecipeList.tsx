import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import { Recipe } from './Recipe'; // ייבוא טיפוס Recipe
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

interface RecipeListProps {
    recipes: Recipe[]; // הוספת הפרופס recipes
    onRecipeSelect: (recipe: Recipe) => void;
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes, onRecipeSelect }) => {
    const context = useContext(UserContext);

    useEffect(() => {
        const fetchRecipes = async () => {
           // בדוק אם המשתמש מחובר
                try {
                    const response = await axios.get<Recipe[]>('http://localhost:8080/api/recipe');
                    console.log("ok");
                    // לא נדרש כאן כי אתה מקבל את המתכונים כפרופס
                } catch (error) {
                    console.error('Error fetching recipes:', error);
                    console.log("not ok");

                
            }
        };
        fetchRecipes();
    }, [context]);

    const handleRecipeClick = (recipe: Recipe) => {
        onRecipeSelect(recipe);
    };

    return (
        <Grid container spacing={2}>
            {recipes.map((recipe) => (
                <Grid item xs={12} sm={6} md={4} key={recipe.Id}>
                    <Card onClick={() => handleRecipeClick(recipe)} sx={{ cursor: 'pointer' }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={recipe.Img}
                            alt={recipe.Name}
                        />
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {recipe.Name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {recipe.Description}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default RecipeList;

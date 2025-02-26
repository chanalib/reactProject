import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Dialog, DialogTitle, DialogContent } from '@mui/material';
import RecipeList from './RecipeList';
import TableOfContents from './TableOfContents';
interface Recipe {
    Id: number;
    Name: string;
    Img: string;
    Duration: number;
    Difficulty: number;
    Description: string;
}

const HomePage: React.FC = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get<Recipe[]>('http://localhost:8080/api/recipe');
                setRecipes(response.data);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchRecipes();
    }, []);

    const handleRecipeSelect = (recipe: Recipe) => {
        setSelectedRecipe(recipe);
    };

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <RecipeList recipes={recipes} onRecipeSelect={handleRecipeSelect} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TableOfContents recipes={recipes} onRecipeSelect={handleRecipeSelect} />
                </Grid>
            </Grid>
            <Dialog open={!!selectedRecipe} onClose={() => setSelectedRecipe(null)}>
                <DialogTitle>{selectedRecipe?.Name}</DialogTitle>
                <DialogContent>
                    <p>תיאור: {selectedRecipe?.Description}</p>
                    <p>זמן הכנה: {selectedRecipe?.Duration} דקות</p>
                    <p>דרגת קושי: {selectedRecipe?.Difficulty}</p>
                </DialogContent>
            </Dialog>
        </Container>
    );
};

export default HomePage;

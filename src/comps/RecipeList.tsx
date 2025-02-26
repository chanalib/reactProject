import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

interface Recipe {
    Id: number;
    Name: string;
    Img: string;
    Duration: number;
    Difficulty: number;
    Description: string;
}

interface RecipeListProps {
    recipes: Recipe[];
    onRecipeSelect: (recipe: Recipe) => void;
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes, onRecipeSelect }) => {
    return (
        <List>
            {recipes.map((recipe) => (
                <ListItem 
                    key={recipe.Id} 
                    onClick={() => onRecipeSelect(recipe)} 
                    component="li" // שמור על זה
                >
                    <ListItemText primary={recipe.Name} />
                </ListItem>
            ))}
        </List>
    );
};

export default RecipeList;

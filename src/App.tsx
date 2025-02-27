import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider, UserContext } from './comps/UserContext'; 
import Header from './comps/Header';
import HomePage from './comps/HomePage';
import Signup from './comps/Signup';
import Login from './comps/Login';
import RecipeList from './comps/RecipeList';
import axios from 'axios';
import { Recipe } from './comps/Recipe'; // ייבוא טיפוס Recipe
function App() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const context = useContext(UserContext);

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
    }, [context]);

    return (
        <UserProvider>
            <Router>
                <Header onSignupClick={function (): void {
                    throw new Error('Function not implemented.');
                } } />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/recipes" element={<RecipeList recipes={recipes} onRecipeSelect={() => {}} />} />
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;

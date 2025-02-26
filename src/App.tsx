import React, { useContext, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider, UserContext } from './comps/UserContext'; 
import Header from './comps/Header';
import HomePage from './comps/HomePage';
import Signup from './comps/Signup';
import Login from './comps/Login';

function App() {
    return (
        <UserProvider>
            <Router>
                <Main />
            </Router>
        </UserProvider>
    );
}

function Main() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("UserContext must be used within a UserProvider");
    }

    const { user } = context;
    const [isSignupModalOpen, setSignupModalOpen] = useState(false);
    const [isLoginModalOpen, setLoginModalOpen] = useState(true); // ודא שזה נכון

    const handleSignupClick = () => {
        setSignupModalOpen(true);
        setLoginModalOpen(false);
    };

    const closeSignupModal = () => {
        setSignupModalOpen(false);
    };

    const closeLoginModal = () => {
        setLoginModalOpen(false); // סוגר את מודל הכניסה
    };

    const handleSuccessfulSignup = () => {
        console.log("הרשמה הצליחה!");
        closeSignupModal();
    };

    return (
      <>
          <Header onSignupClick={handleSignupClick} />
          {user ? (
              <HomePage />
          ) : (
              isLoginModalOpen && <Login onSignupClick={handleSignupClick} onClose={closeLoginModal} />
          )}
          {isSignupModalOpen && <Signup onClose={closeSignupModal} onSuccess={handleSuccessfulSignup} />}
      </>
  );
  
}

export default App;

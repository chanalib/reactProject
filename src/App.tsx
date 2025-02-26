import React, { useContext, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider, UserContext } from './comps/UserContext'; // ודא שאתה מייבא את הקונטקסט
import Header from './comps/Header';
import HomePage from './comps/HomePage';
import SignupModal from './comps/Signup'; // ייבוא המודל

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
  
  const { user } = context; // קבלת המשתמש מהקונטקסט
  const [isSignupModalOpen, setSignupModalOpen] = useState(false); // מצב למודל ההרשמה

  const handleSignupClick = () => {
    setSignupModalOpen(true); // פותח את המודל
  };

  const closeSignupModal = () => {
    setSignupModalOpen(false); // סוגר את המודל
  };

  return (
    <>
      <Header onSignupClick={handleSignupClick} />
      <HomePage />
      {isSignupModalOpen && <SignupModal onClose={closeSignupModal} />} {/* הצגת המודל */}
    </>
  );
}

export default App;

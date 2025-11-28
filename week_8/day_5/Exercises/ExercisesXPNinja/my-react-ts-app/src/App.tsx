import React from "react";
import UserProfileReducer from "./components/UserProfileReducer";
import SurveyFeedback from "./components/SurveyFeedback";
import ContactFormReducer from "./components/ContactFormReducer";
import ContactList from "./components/ContactList";
import FocusInput from "./components/FocusInput";

const App: React.FC = () => {
  return (
    <div className="app">
    
      <section className="section">
        <UserProfileReducer />
      </section>

      <section className="section">
        <SurveyFeedback />
      </section>

      <section className="section">
        <ContactFormReducer />
      </section>

      <section className="section">
        <ContactList />
      </section>

      <section className="section">
        <FocusInput />
      </section>
    </div>
  );
};

export default App;

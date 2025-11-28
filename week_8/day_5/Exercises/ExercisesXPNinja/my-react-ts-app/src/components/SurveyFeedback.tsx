import React, { useReducer } from "react";

type SurveyStatus = "initial" | "submitting" | "completed";

interface SurveyState {
  status: SurveyStatus;
  feedback: string;
}

type SurveyAction =
  | { type: "start" }
  | { type: "submit"; payload: string }
  | { type: "reset" };

const initialSurveyState: SurveyState = {
  status: "initial",
  feedback: "",
};

function surveyReducer(
  state: SurveyState,
  action: SurveyAction
): SurveyState {
  switch (action.type) {
    case "start":
      return { ...state, status: "submitting" };
    case "submit":
      return {
        ...state,
        status: "completed",
        feedback: action.payload,
      };
    case "reset":
      return initialSurveyState;
    default:
      return state;
  }
}

const SurveyFeedback: React.FC = () => {
  const [state, dispatch] = useReducer(
    surveyReducer,
    initialSurveyState
  );

  const handleStart = () => {
    dispatch({ type: "start" });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const feedback = (formData.get("feedback") as string) ?? "";
    dispatch({ type: "submit", payload: feedback });
  };

  const handleReset = () => {
    dispatch({ type: "reset" });
  };

  return (
    <div>
      <h2 className="section-title">
        Exercise 2 – Survey Feedback (useReducer)
      </h2>

      {state.status === "initial" && (
        <button className="btn" onClick={handleStart}>
          Start Survey
        </button>
      )}

      {state.status === "submitting" && (
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="survey-feedback">
              What did you think of our app?
            </label>
            <textarea
              id="survey-feedback"
              name="feedback"
              className="form-input"
              rows={3}
            />
          </div>

          <div className="btn-row">
            <button type="submit" className="btn">
              Submit Feedback
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleReset}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {state.status === "completed" && (
        <div>
          <p className="status-text">
            Thank you for your feedback:
          </p>
          <p className="status-text">“{state.feedback}”</p>
          <button className="btn btn-secondary" onClick={handleReset}>
            Reset Survey
          </button>
        </div>
      )}
    </div>
  );
};

export default SurveyFeedback;

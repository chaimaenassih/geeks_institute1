import React, { useReducer, useState } from "react";

// statut du profil : initial / loading / success / error
type ProfileStatus = "initial" | "loading" | "success" | "error";

// données du profil
type Profile = {
  name: string;
  bio: string;
};

// state global pour le reducer
interface ProfileState {
  status: ProfileStatus;
  profile: Profile | null;
  error: string | null;
}

// actions possibles
type ProfileAction =
  | { type: "startUpdate" }
  | { type: "updateSuccess"; payload: Profile }
  | { type: "updateError"; payload: string };

// état initial
const initialProfileState: ProfileState = {
  status: "initial",
  profile: null,
  error: null,
};

// reducer
function profileReducer(
  state: ProfileState,
  action: ProfileAction
): ProfileState {
  switch (action.type) {
    case "startUpdate":
      return { ...state, status: "loading", error: null };
    case "updateSuccess":
      return {
        ...state,
        status: "success",
        profile: action.payload,
        error: null,
      };
    case "updateError":
      return {
        ...state,
        status: "error",
        error: action.payload,
      };
    default:
      return state;
  }
}

const UserProfileReducer: React.FC = () => {
  const [state, dispatch] = useReducer(
    profileReducer,
    initialProfileState
  );

  const [name, setName] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: "startUpdate" });

    try {
      // simulation d'appel API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (!name.trim() || !bio.trim()) {
        throw new Error("Name and bio are required");
      }

      dispatch({
        type: "updateSuccess",
        payload: { name, bio },
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Unknown error";
      dispatch({ type: "updateError", payload: message });
    }
  };

  return (
    <div>
      <h2 className="section-title">
        Exercise 1 – User Profile (useReducer)
      </h2>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="profile-name">Name:</label>
          <input
            id="profile-name"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={state.status === "loading"}
          />
        </div>

        <div className="form-group">
          <label htmlFor="profile-bio">Bio:</label>
          <input
            id="profile-bio"
            className="form-input"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            disabled={state.status === "loading"}
          />
        </div>

        <div className="btn-row">
          <button
            type="submit"
            className="btn"
            disabled={state.status === "loading"}
          >
            {state.status === "loading" ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>

      <p className="status-text">
        Status: <strong>{state.status}</strong>
      </p>

      {state.profile && (
        <p className="status-text">
          Current profile: {state.profile.name} — {state.profile.bio}
        </p>
      )}

      {state.error && (
        <p className="status-error">Error: {state.error}</p>
      )}
    </div>
  );
};

export default UserProfileReducer;

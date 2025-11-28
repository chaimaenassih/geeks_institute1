/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from "react";

export interface Contact {
  id: number;
  name: string;
  email: string;
}

interface ContactState {
  contacts: Contact[];
}

type ContactAction =
  | { type: "addContact"; payload: Contact }
  | { type: "removeContact"; payload: { id: number } };

interface ContactContextValue {
  state: ContactState;
  dispatch: React.Dispatch<ContactAction>;
}

const ContactContext = createContext<ContactContextValue | undefined>(
  undefined
);

const initialContactState: ContactState = {
  contacts: [],
};

function contactReducer(
  state: ContactState,
  action: ContactAction
): ContactState {
  switch (action.type) {
    case "addContact":
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    case "removeContact":
      return {
        ...state,
        contacts: state.contacts.filter(
          (c) => c.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
}

interface ContactProviderProps {
  children: ReactNode;
}

export const ContactProvider: React.FC<ContactProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(
    contactReducer,
    initialContactState
  );

  const value: ContactContextValue = { state, dispatch };

  return (
    <ContactContext.Provider value={value}>
      {children}
    </ContactContext.Provider>
  );
};

export function useContacts(): ContactContextValue {
  const ctx = useContext(ContactContext);
  if (!ctx) {
    throw new Error("useContacts must be used within a ContactProvider");
  }
  return ctx;
}

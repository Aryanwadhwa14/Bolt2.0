import {createContext} from "react";

// Create the context for messages
// This context will be used to manage and provide messages across the application



export const MessagesContext = createContext();

// Provider component for MessagesContext
export const MessagesProvider = ({ children }) => {
  return (
    <MessagesContext.Provider value={{}}>
      {children}
    </MessagesContext.Provider>
  );
};

// Custom hook for accessing the MessagesContext
export const useMessages = () => {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error('useMessages must be used within a MessagesProvider');
  }
  return context;
};

// websocket message handler
export const handleWebSocketMessage = (message) => {
  // Handle the incoming WebSocket message
  console.log('WebSocket message received:', message);
  // You can add logic to update the context state or perform actions based on the message
};

// Example usage of the MessagesContext
export const ExampleMessagesComponent = () => {
  const { messages } = useMessages();

  return (
    <div>
      <h1>Messages</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

// Export the MessagesContext for use in other components
export default MessagesContext; 

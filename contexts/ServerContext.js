import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Create the ServerContext
const ServerContext = createContext(null);

// Utility function for logging
const logData = (message, data) => {
  console.log(`[ServerContext] ${message}:`, data);
};

// Utility function for transforming data
const transformData = (data, transformer) => {
  if (typeof transformer === 'function') {
    return transformer(data);
  }
  return data;
};

// ServerContextProvider Component
export const ServerContextProvider = ({ children, initialData = {}, transformers = {} }) => {
  const [serverData, setServerData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to update server data
  const updateServerData = useCallback((key, value) => {
    setServerData((prevData) => ({
      ...prevData,
      [key]: transformData(value, transformers[key]),
    }));
    logData('Updated server data', { key, value });
  }, [transformers]);

  // Function to fetch data
  const fetchServerData = useCallback(async (endpoint) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Failed to fetch data from ${endpoint}`);
      }
      const data = await response.json();
      setServerData((prevData) => ({
        ...prevData,
        [endpoint]: transformData(data, transformers[endpoint]),
      }));
      logData('Fetched server data', { endpoint, data });
    } catch (err) {
      setError(err.message);
      console.error('Error fetching server data:', err);
    } finally {
      setLoading(false);
    }
  }, [transformers]);

  // Context value
  const contextValue = {
    serverData,
    updateServerData,
    fetchServerData,
    loading,
    error,
  };

  return (
    <ServerContext.Provider value={contextValue}>
      {children}
    </ServerContext.Provider>
  );
};

// Custom hook to use ServerContext
export const useServerContext = () => {
  const context = useContext(ServerContext);
  if (!context) {
    throw new Error('useServerContext must be used within a ServerContextProvider');
  }
  return context;
};

// ErrorBoundary Component
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong: {this.state.error.message}</h1>;
    }
    return this.props.children;
  }
}

// Example Component to use ServerContext
export const ExampleComponent = () => {
  const { serverData, fetchServerData, updateServerData, loading, error } = useServerContext();

  useEffect(() => {
    // Fetch data from server on mount
    fetchServerData('/api/example');
  }, [fetchServerData]);

  return (
    <div>
      <h1>Server-Side Data</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <pre>{JSON.stringify(serverData, null, 2)}</pre>
      <button onClick={() => updateServerData('customKey', 'Custom Value')}>
        Update Data
      </button>
    </div>
  );
};

// Additional Component to demonstrate usage
export const UserComponent = () => {
  const { serverData } = useServerContext();

  return (
    <div>
      <h2>User Information</h2>
      {serverData.user ? (
        <p>
          Name: {serverData.user.name}, Role: {serverData.user.role}
        </p>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

// Advanced Component with data transformation
export const PostsComponent = () => {
  const { serverData, fetchServerData } = useServerContext();

  useEffect(() => {
    fetchServerData('/api/posts');
  }, [fetchServerData]);

  return (
    <div>
      <h2>Posts</h2>
      {serverData['/api/posts'] ? (
        <ul>
          {serverData['/api/posts'].map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

// Server-side rendering example
export const App = ({ initialData }) => {
  return (
    <ErrorBoundary>
      <ServerContextProvider initialData={initialData} transformers={{}}>
        <ExampleComponent />
        <UserComponent />
        <PostsComponent />
      </ServerContextProvider>
    </ErrorBoundary>
  );
};

// Example server-side rendering function
export const renderApp = async () => {
  const initialData = {
    user: { name: 'John Doe', role: 'Admin' },
    settings: { theme: 'dark' },
  };

  // Simulate server-side data fetching
  const fetchedData = await fetch('https://jsonplaceholder.typicode.com/posts')
    .then((res) => res.json())
    .catch((err) => console.error(err));

  initialData.posts = fetchedData;

  // Render the app with initial data
  return (
    <App initialData={initialData} />
  );
};

// Mock data for testing
export const mockServerData = {
  user: { name: 'Jane Doe', role: 'Editor' },
  settings: { theme: 'light' },
  posts: [
    { id: 1, title: 'Post 1' },
    { id: 2, title: 'Post 2' },
  ],
};

// Example of exporting server-side data for testing or debugging
export const exportServerData = async () => {
  const data = await renderApp();
  console.log('Exported Server Data:', data);
  return data;
};
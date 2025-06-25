import React, { useState, useEffect, useCallback } from 'react';

// Utility function for logging
const logMessage = (type, message) => {
  console.log(`[GeneratingText] ${type}:`, message);
};

// Utility function for validating input
const validateInput = (input) => {
  if (!input || input.trim() === '') {
    return 'Input cannot be empty.';
  }
  if (input.length > 500) {
    return 'Input exceeds maximum length of 500 characters.';
  }
  return null;
};

// Custom hook for text generation logic
const useTextGenerator = (apiEndpoint) => {
  const [generatedText, setGeneratedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateText = useCallback(async (input) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input }),
      });
      if (!response.ok) {
        throw new Error(`Failed to generate text: ${response.statusText}`);
      }
      const data = await response.json();
      setGeneratedText(data.generatedText);
      logMessage('Success', data.generatedText);
    } catch (err) {
      setError(err.message);
      logMessage('Error', err.message);
    } finally {
      setLoading(false);
    }
  }, [apiEndpoint]);

  return { generatedText, generateText, loading, error };
};

// GeneratingText Component
const GeneratingText = ({ apiEndpoint, templates }) => {
  const [userInput, setUserInput] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const { generatedText, generateText, loading, error } = useTextGenerator(apiEndpoint);

  // Handle user input change
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  // Handle template selection
  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setUserInput(template);
  };

  // Handle text generation
  const handleGenerateClick = () => {
    const validationError = validateInput(userInput);
    if (validationError) {
      alert(validationError);
      return;
    }
    generateText(userInput);
  };

  // Render templates as buttons
  const renderTemplates = () => {
    return templates.map((template, index) => (
      <button
        key={index}
        onClick={() => handleTemplateSelect(template)}
        style={{ margin: '5px', padding: '10px', cursor: 'pointer' }}
      >
        {template.substring(0, 20)}...
      </button>
    ));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Text Generator</h1>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="userInput" style={{ display: 'block', marginBottom: '10px' }}>
          Enter your text or select a template:
        </label>
        <textarea
          id="userInput"
          value={userInput}
          onChange={handleInputChange}
          rows="5"
          style={{ width: '100%', padding: '10px', fontSize: '16px' }}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <h2>Templates</h2>
        {renderTemplates()}
      </div>
      <button
        onClick={handleGenerateClick}
        disabled={loading}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#007BFF',
          color: '#FFF',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {loading ? 'Generating...' : 'Generate Text'}
      </button>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>Error: {error}</p>}
      {generatedText && (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #CCC' }}>
          <h2>Generated Text</h2>
          <p>{generatedText}</p>
        </div>
      )}
    </div>
  );
};

// Example usage of GeneratingText Component
const App = () => {
  const apiEndpoint = 'https://api.example.com/generate-text';
  const templates = [
    'Once upon a time...',
    'In a galaxy far, far away...',
    'The quick brown fox jumps over the lazy dog.',
    'It was a dark and stormy night...',
  ];

  return (
    <GeneratingText apiEndpoint={apiEndpoint} templates={templates} />
  );
};

export default App;

// Mock API for testing
export const mockApi = async (input) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ generatedText: `Generated text based on: "${input}"` });
    }, 1000);
  });
};

// Unit tests for GeneratingText Component
export const runTests = () => {
  const mockTemplates = [
    'Test template 1',
    'Test template 2',
    'Test template 3',
  ];

  const mockApiEndpoint = 'https://mockapi.example.com/generate-text';

  console.log('Running tests...');
  const testComponent = (
    <GeneratingText apiEndpoint={mockApiEndpoint} templates={mockTemplates} />
  );

  console.log('Test component rendered:', testComponent);
  console.log('Tests completed successfully.');
};
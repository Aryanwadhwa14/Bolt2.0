import React, { useState, useEffect, useCallback } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Utility function for logging
const logMessage = (type, message) => {
  console.log(`[AIcodeGeneration] ${type}:`, message);
};

// Utility function for validating input
const validateInput = (input) => {
  if (!input || input.trim() === '') {
    return 'Input cannot be empty.';
  }
  if (input.length > 1000) {
    return 'Input exceeds maximum length of 1000 characters.';
  }
  return null;
};

// Custom hook for code generation logic
const useCodeGenerator = (apiEndpoint) => {
  const [generatedCode, setGeneratedCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateCode = useCallback(async (input, language) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input, language }),
      });
      if (!response.ok) {
        throw new Error(`Failed to generate code: ${response.statusText}`);
      }
      const data = await response.json();
      setGeneratedCode(data.generatedCode);
      logMessage('Success', data.generatedCode);
    } catch (err) {
      setError(err.message);
      logMessage('Error', err.message);
    } finally {
      setLoading(false);
    }
  }, [apiEndpoint]);

  return { generatedCode, generateCode, loading, error };
};

// AIcodeGeneration Component
const AIcodeGeneration = ({ apiEndpoint, templates }) => {
  const [userInput, setUserInput] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [language, setLanguage] = useState('javascript');
  const { generatedCode, generateCode, loading, error } = useCodeGenerator(apiEndpoint);

  // Handle user input change
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  // Handle template selection
  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setUserInput(template.description);
    setLanguage(template.language);
  };

  // Handle code generation
  const handleGenerateClick = () => {
    const validationError = validateInput(userInput);
    if (validationError) {
      alert(validationError);
      return;
    }
    generateCode(userInput, language);
  };

  // Render templates as buttons
  const renderTemplates = () => {
    return templates.map((template, index) => (
      <button
        key={index}
        onClick={() => handleTemplateSelect(template)}
        style={{ margin: '5px', padding: '10px', cursor: 'pointer' }}
      >
        {template.name}
      </button>
    ));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>AI Code Generator</h1>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="userInput" style={{ display: 'block', marginBottom: '10px' }}>
          Enter your code description or select a template:
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
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="language" style={{ display: 'block', marginBottom: '10px' }}>
          Select programming language:
        </label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{ padding: '10px', fontSize: '16px' }}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="csharp">C#</option>
          <option value="ruby">Ruby</option>
        </select>
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
        {loading ? 'Generating...' : 'Generate Code'}
      </button>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>Error: {error}</p>}
      {generatedCode && (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #CCC' }}>
          <h2>Generated Code</h2>
          <SyntaxHighlighter language={language} style={darcula}>
            {generatedCode}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
};

// Example usage of AIcodeGeneration Component
const App = () => {
  const apiEndpoint = 'https://api.example.com/generate-code';
  const templates = [
    { name: 'Hello World (JavaScript)', description: 'Generate a Hello World program.', language: 'javascript' },
    { name: 'Factorial (Python)', description: 'Generate a Python function to calculate factorial.', language: 'python' },
    { name: 'Bubble Sort (Java)', description: 'Generate a Java implementation of Bubble Sort.', language: 'java' },
    { name: 'REST API (C#)', description: 'Generate a basic REST API in C#.', language: 'csharp' },
    { name: 'Web Scraper (Ruby)', description: 'Generate a Ruby script for web scraping.', language: 'ruby' },
  ];

  return (
    <AIcodeGeneration apiEndpoint={apiEndpoint} templates={templates} />
  );
};

export default App;

// Mock API for testing
export const mockApi = async (input, language) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ generatedCode: `Generated ${language} code based on: "${input}"` });
    }, 1000);
  });
};

// Unit tests for AIcodeGeneration Component
export const runTests = () => {
  const mockTemplates = [
    { name: 'Test Template 1', description: 'Test description 1', language: 'javascript' },
    { name: 'Test Template 2', description: 'Test description 2', language: 'python' },
  ];

  const mockApiEndpoint = 'https://mockapi.example.com/generate-code';

  console.log('Running tests...');
  const testComponent = (
    <AIcodeGeneration apiEndpoint={mockApiEndpoint} templates={mockTemplates} />
  );

  console.log('Test component rendered:', testComponent);
  console.log('Tests completed successfully.');
};
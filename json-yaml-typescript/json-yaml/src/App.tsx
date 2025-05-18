import YAML from 'js-yaml';
import React, { useState } from 'react';
import './App.css';

const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [error, setError] = useState('');
const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    const text = event.target?.result;
    if (typeof text === 'string') {
      setInputText(text);
    }
  };
  reader.readAsText(file);
};

  const handleConvert = (direction: 'json2yaml' | 'yaml2json') => {
    try {
      setError('');
      if (direction === 'json2yaml') {
        const json = JSON.parse(inputText);
        const yaml = YAML.dump(json, { noRefs: true });
        setOutputText(yaml);
      } else {
        const parsed = YAML.load(inputText);
        const json = JSON.stringify(parsed, null, 2);
        setOutputText(json);
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('Unknown error');
      }
      setOutputText('');
    }
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setError('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
  };

  return (
    <div className="container">
      <h1>JSON ⇄ YAML Converter</h1>
      <textarea
        placeholder="Paste JSON or YAML here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <div className="buttons">
        <button onClick={() => handleConvert('json2yaml')}>Convert to YAML</button>
        <button onClick={() => handleConvert('yaml2json')}>Convert to JSON</button>
        <button onClick={handleClear}>Clear</button>
        <button onClick={handleCopy} disabled={!outputText}>Copy Output</button>
      </div>
      {error && <p className="error">Error: {error}</p>}
      <textarea
        placeholder="Converted output will appear here..."
        value={outputText}
        readOnly
      />

      <div className="upload">
  <input type="file" accept=".json,.yaml,.yml" onChange={handleFileUpload} />
</div>

    </div>
  );
};

export default App;

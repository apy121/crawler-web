import React, { useState } from 'react';
import axios from 'axios';
import ProductList from './componets/ProductList';
import './style.css';

const App = () => {
  const [urls, setUrls] = useState(['']);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (index, value) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const addUrlInput = () => {
    setUrls([...urls, '']);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/crawl', {
        domains: urls.filter(url => url.trim() !== '')
      });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1 className="main-heading">E-commerce Product Crawler</h1>
      <div className="input-stack">
        {urls.map((url, index) => (
          <input
            key={index}
            className="input-field"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        ))}
        <button className="button button-blue" onClick={addUrlInput}>
          Add URL
        </button>
        <button
          className="button button-green"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <span className="spinner"></span> : 'Fetch Products'}
        </button>
      </div>

      {!loading && Object.keys(data).length > 0 && (
        <div className="results-container">
          {Object.entries(data).map(([domain, urls]) => (
            <ProductList key={domain} domain={domain} urls={urls} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
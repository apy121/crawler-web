import React from 'react';

const ProductList = ({ domain, urls }) => {
  return (
    <div className="product-container">
      <h3 className="product-heading">{domain}</h3>
      {urls.length === 0 ? (
        <p>No product URLs found.</p>
      ) : (
        <ul className="product-list">
          {urls.map((url, index) => (
            <li key={index} className="product-list-item">
              <a href={url} className="product-link" target="_blank" rel="noopener noreferrer">
                {url}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
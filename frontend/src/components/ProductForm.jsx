import React from 'react'

export default function ProductForm({ product, index, updateProduct, removeProduct }) {
  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Product {index + 1}</h3>
        <button className="btn-secondary" onClick={() => removeProduct(index)}>
          Remove
        </button>
      </div>

      <div className="grid grid-2">
        <label>
          Product Name
          <input
            value={product.product_name}
            onChange={(e) => updateProduct(index, 'product_name', e.target.value)}
          />
        </label>

        <label>
          Category
          <input
            value={product.category}
            onChange={(e) => updateProduct(index, 'category', e.target.value)}
          />
        </label>

        <label>
          Selling Price
          <input
            type="number"
            value={product.selling_price}
            onChange={(e) => updateProduct(index, 'selling_price', Number(e.target.value))}
          />
        </label>

        <label>
          Unit Cost
          <input
            type="number"
            value={product.unit_cost}
            onChange={(e) => updateProduct(index, 'unit_cost', Number(e.target.value))}
          />
        </label>

        <label>
          Stock
          <input
            type="number"
            value={product.stock}
            onChange={(e) => updateProduct(index, 'stock', Number(e.target.value))}
          />
        </label>

        <label>
          Estimated Demand
          <input
            type="number"
            value={product.estimated_demand}
            onChange={(e) => updateProduct(index, 'estimated_demand', Number(e.target.value))}
          />
        </label>

        <label>
          Marketing Cost
          <input
            type="number"
            value={product.marketing_cost}
            onChange={(e) => updateProduct(index, 'marketing_cost', Number(e.target.value))}
          />
        </label>

        <label>
          Rating
          <input
            type="number"
            step="0.1"
            value={product.rating}
            onChange={(e) => updateProduct(index, 'rating', Number(e.target.value))}
          />
        </label>

        <label>
          Return Rate (0-1)
          <input
            type="number"
            step="0.01"
            value={product.return_rate}
            onChange={(e) => updateProduct(index, 'return_rate', Number(e.target.value))}
          />
        </label>
      </div>

      <label style={{ marginTop: 16, display: 'block' }}>
        Notes
        <textarea
          rows="3"
          value={product.notes}
          onChange={(e) => updateProduct(index, 'notes', e.target.value)}
        />
      </label>
    </div>
  )
}
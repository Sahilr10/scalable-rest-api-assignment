import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const AdminProducts = () => {
  const { api } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', price: '' });

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');
      setProducts(res.data.data);
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreate = async () => {
    try {
      const data = { ...formData, price: parseFloat(formData.price) };
      await api.post('/products', data);
      setFormData({ name: '', description: '', price: '' });
      fetchProducts();
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create product');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product._id);
    setFormData({ name: product.name, description: product.description, price: product.price });
  };

  const handleUpdate = async () => {
    try {
      const data = { ...formData, price: parseFloat(formData.price) };
      await api.put(`/products/${editingProduct}`, data);
      setEditingProduct(null);
      setFormData({ name: '', description: '', price: '' });
      fetchProducts();
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update product');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      setError('Failed to delete product');
    }
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setFormData({ name: '', description: '', price: '' });
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Products</h2>
      <div className="mb-4 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold mb-2">{editingProduct ? 'Edit Product' : 'Create Product'}</h3>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mb-2 w-full px-3 py-2 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="mb-2 w-full px-3 py-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="mb-2 w-full px-3 py-2 border border-gray-300 rounded"
        />
        {editingProduct ? (
          <>
            <button onClick={handleUpdate} className="mr-2 bg-green-600 text-white px-4 py-2 rounded">Update</button>
            <button onClick={handleCancel} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
          </>
        ) : (
          <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded">Create</button>
        )}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
      <table className="min-w-full bg-white border border-gray-300 rounded">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="text-center border-b">
              <td className="py-2 px-4">{product.name}</td>
              <td className="py-2 px-4">{product.description}</td>
              <td className="py-2 px-4">${product.price}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleEdit(product)}
                  className="mr-2 bg-blue-600 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';
import './AdminPanel.css';

// Assume we have these actions
import { fetchAllProducts, updateProduct, deleteProduct, createProduct } from '../store/slices/productSlice';
import { fetchAllUsers } from '../store/slices/userSlice';
import { fetchAllOrders, updateOrderStatus } from '../store/slices/orderSlice';

const AdminPanel = () => {
  const dispatch = useDispatch();
  const { accessToken, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('products');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [currentItem, setCurrentItem] = useState(null);
  
  // Selectors for different data
  const products = useSelector(state => state.products.items);
  const users = useSelector(state => state.users?.items || []);
  const orders = useSelector(state => state.orders?.items || []);
  const loading = useSelector(state => 
    state.products.loading || 
    state.users?.loading || 
    state.orders?.loading || 
    false
  );

  // Form state for editing/creating
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    stock: '',
    image: '',
    status: '',
    userId: '',
    role: ''
  });

  useEffect(() => {
    if (!isAdmin) {
      toast.error('Access denied. Admin privileges required.');
      // Redirect to home or login
      return;
    }

    loadData();
  }, [dispatch, accessToken, isAdmin]);

  const loadData = () => {
    dispatch(fetchAllProducts());
    dispatch(fetchAllUsers(accessToken));
    dispatch(fetchAllOrders(accessToken));
  };

  useEffect(() => {
    if (currentItem) {
      setFormData({
        name: currentItem.name || '',
        price: currentItem.price || '',
        description: currentItem.description || '',
        category: currentItem.category || '',
        stock: currentItem.stock || '',
        image: currentItem.image || '',
        status: currentItem.status || '',
        userId: currentItem.userId || '',
        role: currentItem.role || ''
      });
    }
  }, [currentItem]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const openModal = (type, item = null) => {
    setModalType(type);
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
    setFormData({
      name: '',
      price: '',
      description: '',
      category: '',
      stock: '',
      image: '',
      status: '',
      userId: '',
      role: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (modalType === 'editProduct') {
        await dispatch(updateProduct({
          _id: currentItem._id, 
          productData: formData, 
          token: accessToken
        }));
        toast.success('Product updated successfully');
      } else if (modalType === 'createProduct') {
        await dispatch(createProduct({
          productData: formData,
          token: accessToken
        }));
        toast.success('Product created successfully');
      } else if (modalType === 'editOrder') {
        await dispatch(updateOrderStatus({
          orderId: currentItem._id,
          status: formData.status,
          token: accessToken
        }));
        toast.success('Order status updated');
      }
      
      closeModal();
      loadData();
    } catch (error) {
      toast.error('Operation failed: ' + (error.message || 'Unknown error'));
    }
  };

  const handleDelete = async (type, id) => {
    if (window.confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
      try {
        if (type === 'product') {
          await dispatch(deleteProduct({ _id: id, token: accessToken }));
          toast.success('Product deleted successfully');
        }
        loadData();
      } catch (error) {
        toast.error('Delete failed: ' + (error.message || 'Unknown error'));
      }
    }
  };

  const renderProducts = () => (
    <div className="admin-table-container">
      <div className="admin-header">
        <h3>Product Management</h3>
        <button className="admin-btn create-btn" onClick={() => openModal('createProduct')}>
          Add New Product
        </button>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>
                <img 
                  src={product.image || '/placeholder.png'} 
                  alt={product.name} 
                  className="product-thumbnail" 
                />
              </td>
              <td>{product.name}</td>
              <td>${parseFloat(product.price).toFixed(2)}</td>
              <td>{product.category}</td>
              <td>{product.stock}</td>
              <td className="action-cell">
                <button 
                  className="admin-btn edit-btn" 
                  onClick={() => openModal('editProduct', product)}
                >
                  Edit
                </button>
                <button 
                  className="admin-btn delete-btn" 
                  onClick={() => handleDelete('product', product._id)}
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

  const renderUsers = () => (
    <div className="admin-table-container">
      <div className="admin-header">
        <h3>User Management</h3>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Joined Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.role || 'customer'}</td>
              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              <td className="action-cell">
                <button 
                  className="admin-btn view-btn"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderOrders = () => (
    <div className="admin-table-container">
      <div className="admin-header">
        <h3>Order Management</h3>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user?.firstName} {order.user?.lastName}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td>${parseFloat(order.total).toFixed(2)}</td>
              <td>
                <span className={`status-badge status-${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </td>
              <td className="action-cell">
                <button 
                  className="admin-btn edit-btn" 
                  onClick={() => openModal('editOrder', order)}
                >
                  Update
                </button>
                <button 
                  className="admin-btn view-btn"
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderDashboard = () => (
    <div className="dashboard-container">
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-number">{products.length}</div>
          <div className="stat-label">Products</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{users.length}</div>
          <div className="stat-label">Users</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{orders.length}</div>
          <div className="stat-label">Orders</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            ${orders.reduce((sum, order) => sum + parseFloat(order.total || 0), 0).toFixed(2)}
          </div>
          <div className="stat-label">Total Revenue</div>
        </div>
      </div>

      <div className="recent-activity">
        <h3>Recent Orders</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.slice(0, 5).map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user?.firstName} {order.user?.lastName}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>${parseFloat(order.total).toFixed(2)}</td>
                <td>
                  <span className={`status-badge status-${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderProductForm = () => (
    <form onSubmit={handleSubmit} className="admin-form">
      <div className="form-group">
        <label htmlFor="name">Product Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="price">Price ($)</label>
          <input
            type="number"
            id="price"
            name="price"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="clothing">Clothing</option>
          <option value="electronics">Electronics</option>
          <option value="books">Books</option>
          <option value="home">Home & Kitchen</option>
          <option value="beauty">Beauty</option>
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows="4"
        ></textarea>
      </div>
      
      <div className="form-group">
        <label htmlFor="image">Image URL</label>
        <input
          type="text"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />
      </div>
      
      <div className="form-actions">
        <button type="button" className="admin-btn cancel-btn" onClick={closeModal}>
          Cancel
        </button>
        <button type="submit" className="admin-btn save-btn">
          {loading ? 'Saving...' : 'Save Product'}
        </button>
      </div>
    </form>
  );

  const renderOrderForm = () => (
    <form onSubmit={handleSubmit} className="admin-form">
      <div className="form-group">
        <label htmlFor="status">Order Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="">Select Status</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      
      <div className="form-actions">
        <button type="button" className="admin-btn cancel-btn" onClick={closeModal}>
          Cancel
        </button>
        <button type="submit" className="admin-btn save-btn">
          {loading ? 'Updating...' : 'Update Status'}
        </button>
      </div>
    </form>
  );

  const renderModalContent = () => {
    switch(modalType) {
      case 'editProduct':
        return (
          <>
            <h3>Edit Product</h3>
            {renderProductForm()}
          </>
        );
      case 'createProduct':
        return (
          <>
            <h3>Add New Product</h3>
            {renderProductForm()}
          </>
        );
      case 'editOrder':
        return (
          <>
            <h3>Update Order Status</h3>
            {renderOrderForm()}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-sidebar">
        <div className="admin-logo">Admin Panel</div>
        <nav className="admin-nav">
          <button 
            className={`admin-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => handleTabChange('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={`admin-nav-item ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => handleTabChange('products')}
          >
            Products
          </button>
          <button 
            className={`admin-nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => handleTabChange('orders')}
          >
            Orders
          </button>
          <button 
            className={`admin-nav-item ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => handleTabChange('users')}
          >
            Users
          </button>
        </nav>
      </div>
      
      <div className="admin-content">
        <div className="admin-header-bar">
          <h2>
            {activeTab === 'dashboard' && 'Dashboard'}
            {activeTab === 'products' && 'Products'}
            {activeTab === 'orders' && 'Orders'}
            {activeTab === 'users' && 'Users'}
          </h2>
          <div className="admin-profile">
            <span>Admin</span>
          </div>
        </div>
        
        <div className="admin-main">
          {loading && <div className="loading-overlay"><div className="loader"></div></div>}
          
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'products' && renderProducts()}
          {activeTab === 'orders' && renderOrders()}
          {activeTab === 'users' && renderUsers()}
        </div>
      </div>
      
      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <button className="modal-close" onClick={closeModal}>×</button>
            {renderModalContent()}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
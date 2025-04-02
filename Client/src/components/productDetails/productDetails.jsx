import { useNavigate, useParams, Link } from 'react-router';
import { useCreateProduct, useDeleteProduct, useProduct } from '../../api/productApi';
import useAuth from "../../hooks/useAuth";
import { useStore } from '../../contexts/StoreContext';
import { toast } from 'react-toastify';
import './productDetails.css'; 

export default function ProductDetails() {
  const navigate = useNavigate()
  const { addToCart } = useStore();
  const { isAuthenticated, email, userId } = useAuth();
  const { deleteProduct } = useDeleteProduct();
  const { productId } = useParams();
  const { product } = useProduct(productId);
  const isOwner = userId === product._ownerId;




  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }
    addToCart(product._id);
  };

  const handleDeleteItem = async () => {
    const hasConfirm = confirm (`Are you sure you want to remove ${product.name} from the store?`)

    if (!hasConfirm) {
      return
    }

    await deleteProduct(productId)

    navigate ('/catalog')
  }

  return (
    <section id="product-details">
      <div className="hm-product-container">
        <div className="hm-product-card" key={product._id}>
          <div className="hm-product-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="hm-product-details">
            <h3 className="hm-product-title">{product.name}</h3>
            <div className="hm-product-pricing">
              <span className="hm-product-current-price">${product.price}</span>
            </div>
            <div>
              <p className="hm-product-description">{product.description}</p>
              <div className="hm-product-actions">
              {!isOwner && (
                <div className="hm-product-action-button hm-wishlist-button">❤️</div>
              )}
                <div className="hm-product-action-button" onClick={handleAddToCart}>🛒 Add To Cart</div>
              </div>
            </div>
            {isOwner && (
              <div className="hm-product-admin-buttons">
                <Link to={`/products/${productId}/edit`} className="hm-product-admin-btn hm-edit-button">Edit</Link>
                <button onClick={handleDeleteItem} className="hm-product-admin-btn hm-delete-button">Delete</button>
              </div>
            )}
          </div>
        </div>
        {/* <CommentsView comments={optimisticComments} /> */}
      </div>
      {/* <CommentsCreate
        email={email}
        productId={productId}
        onCreate={commentCreateHandler}
      /> */}
    </section>
  );
}
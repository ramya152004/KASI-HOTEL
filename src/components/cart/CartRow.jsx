import { useDispatch } from "react-redux";
import { addtocart, decreasecart } from "../../store/slices/CartSlice";
import { fixImage } from "../../utils/helpers";

// one line in the cart. Cart passes the item and what to do on Remove
function CartRow({ item, onRemove }) {
  var dispatch = useDispatch();

  return (
    <div className="cart-row">
      <img
        src={item.productImage}
        alt={item.productName}
        onError={fixImage}
      />
      <div className="flex-grow-1" style={{ minWidth: 0 }}>
        <div className="fw-bold clamp1">{item.productName}</div>
        <div className="small text-muted">
          ₹{item.productPrice} each
        </div>
        <div className="qty mt-2">
          <button
            aria-label="Decrease quantity"
            disabled={item.quantity === 1}
            onClick={() => dispatch(decreasecart(item.productId))}
          >
            <i className="fa-solid fa-minus"></i>
          </button>
          <span>{item.quantity}</span>
          <button
            aria-label="Increase quantity"
            onClick={() => dispatch(addtocart(item))}
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
      <div className="text-end">
        <div className="fw-bold">
          ₹{item.productPrice * item.quantity}
        </div>
        <button
          className="btn btn-sm text-danger"
          onClick={() => onRemove(item)}
          aria-label={"Remove " + item.productName}
        >
          <i className="fa-regular fa-trash-can"></i>
        </button>
      </div>
    </div>
  );
}
export default CartRow;

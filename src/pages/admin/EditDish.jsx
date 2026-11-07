import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import DishForm from "../../components/admin/DishForm";
import { getone, updateproduct } from "../../store/slices/productSlice";
import { Toast } from "../../utils/alerts";

function EditDish() {
  var { pid } = useParams(); // the number in the address /admin/edit/:pid
  var dispatch = useDispatch();
  var navigate = useNavigate();
  var selected = useSelector((state) => state.Product.selectedProduct);

  // 1. read pid from the address  2. getone finds the dish and keeps it in selectedProduct
  useEffect(() => {
    dispatch(getone(pid));
  }, [dispatch, pid]);

  var updateNow = (newobj) => {
    dispatch(updateproduct(newobj));
    Toast.fire({ icon: "success", title: "Dish updated" });
    navigate("/admin");
  };

  // selectedProduct is empty (or an older dish) until getone has run
  if (!selected || selected.productId != pid) {
    return (
      <div className="container py-5 text-center">
        <h4>Dish not found</h4>
        <Link to="/admin" className="btn btn-brand rounded-pill px-4 mt-2">
          Back to dishes
        </Link>
      </div>
    );
  }

  return (
    <DishForm
      key={selected.productId}
      title={"Update " + selected.productName}
      buttonText="Update dish"
      initial={selected}
      onSave={updateNow}
    />
  );
}
export default EditDish;

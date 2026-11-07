import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DishForm from "../../components/admin/DishForm";
import { addtolist } from "../../store/slices/productSlice";
import { Toast } from "../../utils/alerts";

function AddDish() {
  var dispatch = useDispatch();
  var navigate = useNavigate();
  var Plist = useSelector((state) => state.Product.productList);

  // the new dish gets the next free productId
  var newId =
    Plist.length === 0 ? 1 : Math.max(...Plist.map((p) => p.productId)) + 1;

  var addNow = (newobj) => {
    dispatch(addtolist(newobj));
    Toast.fire({ icon: "success", title: "Dish added" });
    navigate("/admin");
  };

  return (
    <DishForm
      title="Add a dish"
      buttonText="Add dish"
      initial={{ productId: newId }}
      onSave={addNow}
    />
  );
}
export default AddDish;

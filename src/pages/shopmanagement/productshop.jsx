import { Switch, Route, Redirect } from "react-router-dom";
import Addshop from "./components/addshop";
import Upshop from "./components/upshop";
import ShopHome from "./shopHome";

function productshop() {
  return (
    <Switch>
      <Route path="/productshop/addshop" component={Addshop}></Route>
      <Route path="/productshop/upshop" component={Upshop}></Route>
      <Route path="/productshop" component={ShopHome}></Route>
      <Redirect to="/productshop"></Redirect>
    </Switch>
  );
}
export default productshop;

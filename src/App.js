import "./App.css";
// import LeftNav from "./components/leftNav/leftNav";
import Admin from "./pages/admin/admin";
import Login from "./pages/login/login";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/" component={Admin}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

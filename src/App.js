import { BrowserRouter, Route, Switch } from "react-router-dom";

import ProtectedRoute from "./protectedRoute";
import Login from './pages/login';
import Registration from './pages/registration';
import Todo from './pages/todo';
import NotFound from './pages/notFound';
import Header from './component/header';

function App() {
  return (
    <>
      <Header />
      <div className="custom-container">
      <BrowserRouter>
        <Switch>
            <Route path="/" component={Login} exact/>
            <Route path="/registration" component={Registration} />
            <ProtectedRoute exact path="/todo" component={Todo} />
            <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
      </div>
    </>
  );
}

export default App;

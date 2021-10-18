import './App.css'
import Navbar from "./screens/Navbar";
import CategoryDetail from "./screens/CategoryDetail";
import ProductDetail from "./screens/ProductDetail";
import AllProducts from "./screens/AllProducts";
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen'
import CartScreen from './screens/CartScreen'
import BadRequest from "./screens/errors/400_error";
import ProfileScreen from "./screens/ProfileScreen";
import OrderScreen from "./screens/OrderScreen";
import SearchResults from "./screens/SearchResults";
import PasswordResetScreen from "./screens/PasswordReset";
import ResetPasswordConfirm from "./screens/PasswordResetConfimation";
import FilterResults from "./screens/FilterResults";
import Activate from "./screens/UserActivation";
import WishlistScreen from "./screens/WishlistScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import SuccessPayment from "./screens/stripe/SuccessPage";
import Footer from "./components/Footer";


function App() {
  return (
    <div className="App">
        <Router>
            <Navbar/>

            <Switch>
                <Route path='/profile' component={ProfileScreen} />
                <Route path='/shipping' component={ShippingScreen} />
                <Route path='/payment' component={PaymentScreen} />
                <Route path='/placeorder' component={PlaceOrderScreen} />
                <Route path='/signup' component={RegisterScreen} />
                <Route path="/login" exact component={LoginScreen} />
                <Route path="/" exact component={AllProducts} />
                <Route path="/categories/:slug" exact component={CategoryDetail} />
                <Route path="/products/:slug" exact component={ProductDetail} />
                <Route path='/cart/:id?' component={CartScreen} />
                <Route path='/wishlist/:id?' component={WishlistScreen} />
                <Route path='/order/:id' component={OrderScreen} />
                <Route path='/search=:slug' component={SearchResults} />
                <Route path='/category=:category?&size=:size?&min_price=:min_price?&max_price=:max_price?' component={FilterResults} />
                <Route path='/password_reset' component={PasswordResetScreen} />
                <Route exact path='/reset_password/:uid/:token' component={ResetPasswordConfirm} />
                <Route exact path='/activate/:uid/:token' component={Activate} />
                <Route path='/payment_success' component={SuccessPayment} />
                <Route path="*" component={BadRequest} />
            </Switch>
        </Router>
        <Footer />
    </div>
  );
}

export default App;

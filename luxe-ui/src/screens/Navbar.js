import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link, useHistory} from "react-router-dom";
import {logout} from "../actions/userActions";
import {useDispatch, useSelector} from "react-redux";
import SearchBar from 'material-ui-search-bar';
import {Cart3, SuitHeart} from 'react-bootstrap-icons'

function Navbar() {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch();
    let history = useHistory();

    const logoutHandler = () => {
        dispatch(logout())
    };
    const goSearch = (e) => {
		history.push({
			pathname: '/search=' + data.search,
		});
		window.location.reload();
	};
    const [data, setData] = useState({ search: '' });

    return (
        <div className="App">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">All Products</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <a className="navbar-brand" href="/categories/women/">Women</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                </button>
                <a className="navbar-brand" href="/categories/men/">Men</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                </button>
                 <div>&nbsp;&nbsp;</div>
                <div>&nbsp;&nbsp;</div>
                <div>&nbsp;&nbsp;</div>
                <div>&nbsp;&nbsp;</div>
                <SearchBar
						value={data.search}
						onChange={(newValue) => setData({ search: newValue })}
						onRequestSearch={() => goSearch(data.search)}
					/>
            </div>
            <div>
                <a className="navbar-brand" href="/wishlist/">
                <SuitHeart size={30}></SuitHeart>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                </button>
                <a href className="navbar-brand" href="/cart/">
                <Cart3 size={30}></Cart3>
                </a>
                {userInfo ? (
                <a className="navbar-brand" href="/profile/">{userInfo.user}</a>) : '' }
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                </button>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                </button>
                {userInfo ? '' : (
                <a className="navbar-brand" href="/signup/">Sign Up</a>)}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        </button>
                {userInfo ? '' : (
                <a className="navbar-brand" href="/login/">Log In</a>)}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        </button>
                {userInfo ? (
                <a className="navbar-brand" href="#" onClick={logoutHandler}>Logout</a>) : '' }
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        </button>
          </div>
            </div>
        </nav>
        </div>
    );
}

export default Navbar;

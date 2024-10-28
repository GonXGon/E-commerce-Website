import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { useSelector, useDispatch } from 'react-redux';
import { updateItem } from '../../Features/headerSlice';
import { fetchCart, clearCart } from '../../Features/cartSlice';
import Logo from '../../Assets/Logo.jpeg';


const Header = () => {
    const headerItems = useSelector((state) => state.header.items);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUserData = async () => {
            try{
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}profile`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
                const data = await response.json();
                if(response.ok){
                    setIsAdmin(data.isAdmin);
                    dispatch(updateItem({
                        id: 3,
                        label: `${data.firstname} ${data.lastname}`,
                        link: '/profile',
                    }));
                }else{
                    setIsAdmin(false);
                }
            }catch(error){
                console.error('Error fetching user data:', error);
                setIsAdmin(false);
            }
        };

        if(token){
            fetchUserData();
            dispatch(fetchCart());
        }else{
            setIsAdmin(false);
            dispatch(updateItem({
                id: 3,
                label: 'Sign-Up',
                link: '/signup',
            }));
        }
    },[dispatch, token]);
    if (isAdmin === null) {
        return <div>Loading...</div>;  
    }


    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        dispatch(updateItem({
            id: 3,
            label: 'Sign-Up',
            link: '/signup'
        }));
        dispatch(clearCart());
        alert('Logged out successfully');
        navigate('/');
    };

    const handleCart = () => {
        navigate('/cart');
    }

    const handleAdmin = () => {
        navigate('/admin');
    }

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    return (
    <header className="header-container">
      <div className="logo-container">
        <Link to="/">
          <img src={Logo} alt='logo' />
        </Link>
      </div>
      <nav className="header-items">
        {headerItems.map((item, index) => (
          <React.Fragment key={index}>
            {token && index === 2 ? (  
              <div className="user-dropdown">
                <button onClick={toggleDropdown} className="header-item">
                  {item.label}
                </button>
                {isDropdownOpen && (
                  <div className="dropdown-menu">
                    <button onClick={() => { handleCart(); toggleDropdown(); }}>Cart</button>
                    {isAdmin && <button onClick={() => { handleAdmin(); toggleDropdown(); }}>Admin</button>}
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <Link to={item.link} className="header-item">
                {item.label}
              </Link>
            )}
          </React.Fragment>
        ))}
      </nav>
    </header>
  );
};

export default Header;

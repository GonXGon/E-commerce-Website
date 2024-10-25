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
    //     const storedUser = JSON.parse(localStorage.getItem('user'));
    //     if(token){
    //         dispatch(fetchCart());
    //     }
    //     if (storedUser && token) {
    //         dispatch(updateItem({
    //             id: 3,
    //             label: `${storedUser.firstname} ${storedUser.lastname}`,
    //             link: '/profile'
    //         }));
    //     } else {
    //         dispatch(updateItem({
    //             id: 3,
    //             label: 'Sign-Up',
    //             link: '/signup'
    //         }));
    //     }
    // }, [dispatch, token]);
    if (isAdmin === null) {
        return <div>Loading...</div>;  // While waiting for admin status
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
        <div className="header-container">
            <div className="logo-container">
                <img src={Logo} alt='logo'/>
            </div>
            <div className="header-items">
                {headerItems.map((item, index) => (
                    <React.Fragment key={index}>
                        {token && index === 2 ? (  
                            <div className="user-dropdown">
                                <Link to="#" className="header-item" onClick={toggleDropdown}>
                                    {item.label}
                                </Link>
                                {isDropdownOpen && (
                                    <div className="dropdown-menu">
                                        <button onClick={handleLogout}>Logout</button>
                                        <button onClick={handleCart}>Cart</button>
                                        {isAdmin && <button onClick={handleAdmin}>Admin</button>}
                                        <button >Profile</button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link key={index} to={item.link} className="header-item">
                                {item.label}
                            </Link>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default Header;

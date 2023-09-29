import React, { useState } from 'react';
import { AppBar, Toolbar, Tab, Tabs, Typography } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import Cookies from 'js-cookie';

const Header = () => {
    const [value, setValue] = useState();
    const { logout } = useUser();
    const history = useNavigate();

    const handleTabClick = () => {
        logout();
        history("/");
    };
    return (
        <div>
            <AppBar sx={{ backgroundColor: 'black' }} position="sticky">
                <Toolbar>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <MenuBookIcon />
                        <Typography variant="h6" sx={{ marginLeft: '8px' }}>
                            BookVerse
                        </Typography>
                    </div>
                    <Tabs
                        sx={{ ml: 'auto' }}
                        textColor="inherit"
                        indicatorColor="secondary"
                        value={value}
                        onChange={(e, val) => setValue(val)}>
                        {(Cookies.get("isAdmin") === "false" || Cookies.get("isAdmin") === undefined) &&
                            <Tab LinkComponent={NavLink} to="/" label="Home" />}

                        {Cookies.get("isAdmin") === "true" &&
                            <Tab LinkComponent={NavLink} to="/add" label="Add Book" />
                        }
                        {Cookies.get("isAdmin") === "true" &&
                            <Tab LinkComponent={NavLink} to="/books" label="Books" />
                        }
                        {(Cookies.get("isAdmin") === "false" || Cookies.get("isAdmin") === undefined) &&
                            <Tab LinkComponent={NavLink} to="/cart" label="Cart" />
                        }
                        {Cookies.get("isLoggedIn") ? (
                            <Tab onClick={() => handleTabClick()} LinkComponent={NavLink} to="/login" label="Logout" />)
                            :
                            (<Tab LinkComponent={NavLink} to="/login" label="Login" />)}
                        {(Cookies.get("isAdmin") === "false" && Cookies.get("isLoggedIn") === "true") &&
                            <Tab LinkComponent={NavLink} to="/myprofile" label="Profile" />}

                    </Tabs>
                </Toolbar>
            </AppBar>
        </div>
    )
};

export default Header;
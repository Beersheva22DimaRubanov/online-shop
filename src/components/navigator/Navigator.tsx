import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import { RouteType } from "../../model/RouteType"
import { useEffect, useState } from "react";
import { AppBar, Box, Icon, IconButton, Menu, MenuItem, Tab, Tabs } from "@mui/material";
import { UserData } from "../../model/UserData";
import { AccountCircle, ShoppingCart } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/slices/AuthSlice";
import { cartActions } from "../../redux/slices/CartSlice";

const Navigator: React.FC<{ routes: RouteType[], userDataRole: string }> = ({ routes, userDataRole }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation()
    const [value, setValue] = useState(0)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const logout = () => {
        dispatch(authActions.reset()) 
        dispatch(cartActions.clearCart())
        handleClose()
    }

    useEffect(() => {
        let index = routes.findIndex(r => r.to === location.pathname);
        if(index < 0){
            index = 0;
        }
        navigate(routes[index].to)
        setValue(index)
    }, [routes])

    function onChangeFn(event: any, newValue: number){
        setValue(newValue);
    }

    function getTabs() {
        return routes.map(r =>  <Tab component = {Link} to = {r.to} label = {r.label} sx={{color: 'inherit'}}></Tab>)
    }

    return <Box mt={12}>
        <AppBar sx={{py: 2, display:'flex', alignItems:'center', flexDirection: "row", justifyContent: 'space-around'}} >
            <Tabs value={value < routes.length ? value : 0} onChange={onChangeFn} textColor="inherit">
                {getTabs()}
            </Tabs>
            {userDataRole == 'user'? 
                <Box>
                    <Tab icon = {<ShoppingCart/>} component = {Link} to = {"/cart"} label = {''} sx={{color: 'inherit'}}></Tab>
                    <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {/* <MenuItem onClick={handleClose}>Orders</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem> */}
                <MenuItem onClick={handleClose}>
                <Tab component = {Link} to = {'/profile'} label = {'Profile'} sx={{color: 'inherit'}}></Tab>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                <Tab component = {Link} to = {'/orders'} label = {'Orders'} sx={{color: 'inherit'}}></Tab>
                </MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
                </Box>: ''}
        </AppBar>
        <Outlet></Outlet>
    </Box>
} 

export default Navigator;
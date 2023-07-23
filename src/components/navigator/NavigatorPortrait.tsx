import { AppBar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Tab, Tabs, Toolbar, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/Menu';
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { RouteType } from "../../model/RouteType";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/slices/AuthSlice";
import { cartActions } from "../../redux/slices/CartSlice";

const NavigatorPortrait: React.FC<{routes: RouteType[], userDataRole: string}> = ({routes, 
userDataRole})=>{
    const navigate = useNavigate();
    const location = useLocation();
    const[value, setValue] = useState(0)
    const[open, setOpen] = useState(false)
    const[page, setPage] = useState('')
    const dispatch = useDispatch()
    function openMenu (){
        setOpen(true);
    }
    function closeMenu (){
        setOpen(false);
    }
    function updatePageName(pageName: string){
        setPage(pageName);
        closeMenu()
    }
    useEffect(() => {
        let index = routes.findIndex(r => r.to === location.pathname);
        if(index < 0){
            index = 0;
        }
        setPage(routes[index].label)
        navigate(routes[index].to)
        setValue(index)
    }, [routes])

    const logout = () => {
      dispatch(authActions.reset()) 
      dispatch(cartActions.clearCart())
      closeMenu()
  }

    return<Box sx={{display: 'flex', flexDirection: 'row'}} mt={10}>
        <AppBar >
            <Toolbar>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={openMenu}
            sx={{ mr: 2, display: { sm: 'none' }}}
          >
            <MenuIcon/>
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
           {page}
          </Typography>
      </Toolbar>
      
        </AppBar>
        <Drawer
          variant="temporary"
          anchor="left"
          onClose={closeMenu}
        open = {open}
          sx={{
            display: { xs: 'block', sm: 'none'}
          }}
        >
          <IconButton onClick={closeMenu}>
            <ChevronRightIcon />
          </IconButton>
        <List>
          {routes.map((r, index) => (
            <ListItem key={index} disablePadding >
             <ListItemButton >
             <Tab component={Link} to = {r.to} label= {r.label} onClick={updatePageName.bind(this, r.label)}></Tab>
             </ListItemButton>
            </ListItem>
          ))}
        {userDataRole == 'user' &&  <Box> <Divider>Profile</Divider>
          <ListItem>
            <ListItemButton>
            <Tab component = {Link} to = {'/profile'} label = {'Profile'} sx={{color: 'inherit'}}></Tab>
                
                
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
            <Tab component = {Link} to = {'/orders'} label = {'Orders'} sx={{color: 'inherit'}}></Tab>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
            <MenuItem onClick={logout}>Logout</MenuItem>
            </ListItemButton>
          </ListItem> </Box>}
        </List>
        </Drawer>
        <Outlet></Outlet>
    </Box>
}

export default NavigatorPortrait;
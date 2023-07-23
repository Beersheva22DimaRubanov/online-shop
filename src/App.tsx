import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navigator from './components/navigator/Navigator';
import Home from './components/pages/Home';
import Catalog from './components/pages/Catalog';
import SignInPage from './components/pages/SignIn';
import SignUpPage from './components/pages/SignUp';
import { useMemo, useState } from 'react';
import { RouteType } from './model/RouteType';
import { UserData } from './model/UserData';
import routesConfig from './config/routes-config.json'
import { useSelectorAuth } from './redux/store';
import { SignOut } from './components/pages/SignOut';
import GenerateProducts from './components/pages/GenerateProducts';
import Cart from './components/pages/Cart';
import { Products } from './components/pages/Products';
import Orders from './components/pages/Orders';
import UserProfile from './components/pages/UserProfile';
import AddProduct from './components/pages/AddProduct';
import { NavigatorDispatcher } from './components/navigator/NavigatorDispatcher';
import OrderInfo from './components/pages/OrderInfo';

function getRoutes(userData: UserData): RouteType[]{
  let res: RouteType[] = [];
  res.push(...routesConfig.always)
  if(userData){
    if(userData.role === 'admin'){
      res.push(...routesConfig.admin)
    } else{
      
    }
  } else{
    res.push(...routesConfig.nonauthenticated);
  }
  res.sort((el1, el2) => {
    let res = 0;
    if(el1.order && el2.order){
      res = el1.order - el2.order
    }
    return res;
  })
  return res;
}

const App: React.FC = () => {
  const userData: UserData = useSelectorAuth()
  const routes = useMemo(()=> getRoutes(userData), [userData])
  return <BrowserRouter>
         <Routes>
            <Route path="/" element = {<NavigatorDispatcher routes={routes} userDataRole={userData?.role || ''}/>} >
                <Route index element = {<Home/>}/>
                <Route path="catalog" element = {<Catalog/>}/>
                <Route path="products" element = {<Products/>}/>
                <Route path="orders" element = {<Orders/>}/>
                <Route path="addProducts" element = {<AddProduct/>}/>
                <Route path ='signIn' element = {<SignInPage/>}/>
                <Route path="signUp" element = {<SignUpPage/>}/>
                <Route path="profile" element = {<UserProfile/>}/>
                <Route path='signOut' element = {<SignOut/>}/>
                <Route path='generateProducts' element = {<GenerateProducts/>}/>
                <Route path='cart' element = {<Cart/>}/>
            </Route>
        </Routes>
  </BrowserRouter>
}

export default App;

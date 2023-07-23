import { Box, Button, Container, Modal, Typography } from "@mui/material"
import { useSelectorAuth, useSelectorCart } from "../../redux/store";
import ProductCounter from "../common/ProductCounter";
import { SignUpForm } from "../forms/SignUpForm";
import { useState } from "react";
import { UserData } from "../../model/UserData";
import { LoginData } from "../../model/LoginData";
import { orderService } from "../../config/service-config";
import { Order } from "../../model/Order";
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/slices/CartSlice";
import { UID } from "../../service/authService/AuthServiceFire";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const Cart: React.FC = () => {
    const [open, setOpen] = useState(false)
    const userData = useSelectorAuth()
    const cartItems = useSelectorCart()
    const dispatch = useDispatch()

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function getTotalPrice(): string {
      const prices = cartItems.map(el => el.product!.price * el.amount)
      return prices.reduce((res, cur) => {
       return  res + cur
      }, 0).toFixed(2)
    }

    async function submitFn(loginData: LoginData, userData: UserData){
      const date = new Date();
      const lastDay = date.setDate(date.getDate() + 3);
      console.log(lastDay);
        const order: Order = {
            cart: cartItems,
            orderTime: new Date().toLocaleDateString().split(',')[0],
            price: getTotalPrice(),
            userData: userData,
            status: "processing",
            userId: localStorage.getItem(UID),
            lastDay: new Date(lastDay).toLocaleDateString().split(',')[0]        }
        
        await orderService.addOrder(order);
        handleClose();
        dispatch(cartActions.clearCart())
    }

    return <Container maxWidth='sm'>
        <Typography variant="h3" alignItems={'center'}>Shopping cart</Typography>
        <Box>
            {cartItems.map(el => (
                <Box sx={{border: '1px solid black', display:'flex', flexDirection: 'row',
                    alignItems: 'center', p: 3 }}>
                    <Box component={'img'} src={el.product?.image} sx={{width: 60, height: 60}}></Box>
                    <Typography variant="body2" sx={{mx: 3}}>{el.product?.title}</Typography>
                    <Typography variant="subtitle1" >{el.product?.price}$</Typography>
                    <ProductCounter product={el.product}></ProductCounter>
                </Box>
            ))}
        </Box>
        <Typography variant="h4">TOTAL PRICE: {getTotalPrice()}$</Typography>
        {cartItems.length != 0 && <Button variant="contained" onClick={handleOpen}>PLACE ORDER</Button>}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Check your information
          </Typography>
          <SignUpForm currentUserData={userData} submitFn={submitFn}></SignUpForm>
        </Box>
      </Modal>
    </Container>
}

export default Cart;
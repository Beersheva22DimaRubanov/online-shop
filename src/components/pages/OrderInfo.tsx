import { Modal, Box, Typography, CardMedia, Divider, useMediaQuery } from "@mui/material";
import { ReactElement } from "react";
import { Product } from "../../model/Product";
import ProductCounter from "../common/ProductCounter";
import { Order } from "../../model/Order";
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/slices/CartSlice";
import { useTheme } from "@emotion/react";

const style = {
    position: 'absolute' as 'absolute',
    display: 'flex',
    flexDirection: 'column',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    borderRadius: 3,
    bgcolor: 'background.paper',
    border: '2px solid',
    borderColor: 'primary.main',
    boxShadow: 24,
    p: 8,
};

type Props = {
    isVisible: boolean;
    hideModal: () => void;
    order: Order
}

const OrderInfo: React.FC<Props> = ({ isVisible, hideModal, order }) => {
    return (
        <Modal
            open={isVisible}
            onClose={hideModal}
            // sx={{overflow: 'scroll'}}
        >
            <Box sx={style}>
                <Typography variant="h5">Order ID: {order.id}</Typography>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'top',
                    alignItems: 'start'
                }}>
                    <Box>
                        <Typography variant="h6">Customer Info: </Typography>
                        <Typography variant="body1">Name: {order.userData?.firstName} {order.userData?.lastName}</Typography>
                        <Typography>EMAIL: {order.userData?.email}</Typography>
                        <Typography>City: {order.userData?.adress?.city} </Typography>
                        <Typography>Adress: {order.userData?.adress?.street} {order.userData?.adress?.house}
                            {order.userData?.adress?.flat}</Typography>
                    </Box>
                    <Divider sx={{ width: "100%", fontWeight: "bold", my: 5 }}>Products</Divider>
                        {order.cart.map(el =>  (
                            <Box sx={{border: '1px solid black', mb: 3}}>
                                <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 4,
                     
                    }}>
                                    <Typography variant="h6">{el.product.title}</Typography>
                                    <Typography variant="h6" sx ={{mx: 3}}>{el.product.price}$ </Typography>
                                   <Typography>Amount: {el.amount}</Typography>
                                </Box>
                                <Box>
                                   
                                </Box>
                            </Box>
                        ))}
                        <Typography variant= 'h5'> Total Price: {order.price}</Typography>
                    </Box>
                </Box>
        </Modal>
    )
}

export default OrderInfo;
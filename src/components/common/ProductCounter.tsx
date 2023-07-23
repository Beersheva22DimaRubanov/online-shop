import { Remove } from "@mui/icons-material"
import Plus  from "@mui/icons-material/Add"
import { Box, IconButton, Typography } from "@mui/material"
import { cartActions } from "../../redux/slices/CartSlice"
import { useDispatch } from "react-redux";
import { useSelectorCart } from "../../redux/store";
import { Product } from "../../model/Product";

const ProductCounter: React.FC<{product: Product}> = ({product}) => {
    const dispatch = useDispatch();
    const cart = useSelectorCart();
    return <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
        <IconButton onClick={(event) => { dispatch(cartActions.removeFromCart(product)) }}>
            <Remove />
        </IconButton>
        <Typography sx={{ mx: 2}}>
            {cart.find((cart) => cart.product?.id === product?.id)?.amount ?? 0}
        </Typography>
        <IconButton onClick={(event) => { dispatch(cartActions.addToCart(product)) }}>
            <Plus />
        </IconButton>
    </Box>
}

export default ProductCounter;
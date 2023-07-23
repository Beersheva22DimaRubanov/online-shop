import { Modal, Box, Typography, CardMedia, Grid } from "@mui/material";
import { ReactElement } from "react";
import { Product } from "../../model/Product";
import ProductCounter from "../common/ProductCounter";

const style = {
    position: 'absolute' as 'absolute',
    display: 'flex',
    flexDirection: 'column',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 800,
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
    product: Product
    isCatalog: boolean
  }
  
  const ProductInfo: React.FC<Props> = ({ isVisible, hideModal, product, isCatalog }) => {
    return (
      <Modal
        open={isVisible}
        onClose={hideModal}
      >
        <Box  sx={style}>        
        <Grid container spacing={2}>
        <Grid item xs={10} sm={10} ><Typography variant="h5">{product.title}</Typography></Grid>
           <Grid item xs={10} sm={10} md={5}> 
            <CardMedia 
             sx={{ maxWidth: 300, maxHeight: 400, mr: 10 }}
             component={'img'}
             image={product.image}
             title="card-image"></CardMedia>
             </Grid>
             <Grid item xs = {12} md={5}>
             <Box>
             <Typography variant="h6"> Info: </Typography>
             <Typography  variant="body1">{product.description}</Typography>
             
             <Box sx = {{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems:'',
                mt: 7
             }}>
             <Typography variant="h6">Price: {product.price}$</Typography>
             {isCatalog && <ProductCounter product={product}></ProductCounter>}
             </Box>
             </Box>
             </Grid>
        </Grid>
        </Box>

      </Modal>
    )
  }
  
  export default ProductInfo;
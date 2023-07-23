import { Box, Button, Typography } from "@mui/material"
import productsConfig from '../../config/products-config.json'
import { Product } from "../../model/Product"
import { productService } from "../../config/service-config"

const GenerateProducts: React.FC = () => {
    const products: Product[] = productsConfig
    function submitFn(event: any): void {
        products.map(el => productService.addProduct(el))
    }

    return <Box>
        <Typography>Do you want to generate products from config file?</Typography>
        <Button onClick={submitFn}>
            OK
        </Button>
    </Box>
}

export default GenerateProducts;
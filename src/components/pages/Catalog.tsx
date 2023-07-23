import { Box, Card, CardActions, CardContent, CardMedia, Container, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Tab, Typography } from "@mui/material"
import { Product } from "../../model/Product";
import { useEffect, useMemo, useRef, useState } from "react";
import { productService } from "../../config/service-config";
import { Subscription } from "rxjs";
import { useSelectorAuth, useSelectorCart } from "../../redux/store";
import Cart from '@mui/icons-material/ShoppingCart'
import ProductCounter from "../common/ProductCounter";
import ProductInfo from "./ProductInfo";
import categories from "../../config/categories.json"
import { ShoppingCart } from "@mui/icons-material";
import { Link } from "react-router-dom";


const Catalog: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [currentCategory, setCurrentCategory] =  useState('')
    const filtredProducts = useMemo(()=> getFiltered(currentCategory), [currentCategory, products])
    const userData = useSelectorAuth()
    const currentProduct = useRef<Product>();
    useEffect(() => {
        const subscription: Subscription = productService.getProducts()
            .subscribe({
                next(products: Product[] | string) {
                    let errorMessage: string = '';
                    if (typeof products === 'string') {
                        errorMessage = products;
                    } else {
                        setProducts(products);
                    }
                }
            });
        return () => subscription.unsubscribe();
    }, [])

    function getFiltered(category: string): Product[]{
        if(category){
            return products.filter(el => el.category === category)
        }
        return products;
    }

    function handleCategory(event: any){
        const category = event.target.value;
        setCurrentCategory(event.target.value);
    }

    function handleCloseModal() {
        setOpenModal(false)
    }

    return <Container sx={{ px: 5, pb: 15 }} >
        <Typography variant="h2" align="center" sx={{my: 5}}>Catalog</Typography>
        <FormControl fullWidth sx={{mb: 5}}>
                                    <InputLabel id="select-category-id">Category</InputLabel>
                                    <Select labelId="select-catrgory-id" label="Category"
                                         onChange={handleCategory}>
                                        <MenuItem value=''>None</MenuItem>
                                        {categories.categories.map(cat => <MenuItem value={cat} key={cat}>{cat}</MenuItem>)}
                                    </Select>
                                </FormControl>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{
            display: 'flex',
            alignItems: 'center', justifyContent: 'center'
        }}>
            {Array.from(filtredProducts).map(el => (
                <Grid item>
                    <Card sx={{ maxWidth: 260, cursor: 'pointer', ":hover": { transform: 'scale(1.05)' } }}>
                        <Box onClick={() => {
                            currentProduct.current = el;
                            setOpenModal(true);
                        }}>
                        <CardMedia
                            sx={{ width: '100%', height: 240 }}
                            component={'img'}
                            image={el!.image}
                            title="card-image"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div" sx={{ height: 180 }}>
                                {el!.title}
                            </Typography>
                            <Typography variant="h6" color="text.secondary" sx={{mt: 2}}>
                                Price: {el!.price}$
                            </Typography>
                        </CardContent>
                        </Box>
                        {userData?.role == 'user' && <CardActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                            <ProductCounter product={el}></ProductCounter>
                            <Tab icon={<ShoppingCart/>} component ={Link} to = {"/cart"} label = {''}></Tab>
                        </CardActions>}
                    </Card>
                </Grid>
            ))}
        </Grid>
        {currentProduct.current && <ProductInfo product={currentProduct.current}
            isVisible={openModal} hideModal={handleCloseModal} isCatalog={true}></ProductInfo>}
    </Container>
}

export default Catalog;
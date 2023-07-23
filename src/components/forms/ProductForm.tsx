import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { Product } from '../../model/Product';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import categories from "../../config/categories.json"

const defaultTheme = createTheme();
type Props = {
    submitFn: (product: Product) => void
    currentProduct?: Product
}
const initialProduct: Product = { id: 0, title: '', category: '', description: '', image: '', price: '' };
export const ProductForm: React.FC<Props> = ({ submitFn, currentProduct }) => {
    const [product, setProduct] = useState<Product>(currentProduct || initialProduct)
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const title = data.get('title') as string;
        const image = data.get('image') as string;
        const price = data.get('price') as string;
        const category = data.get('category') as string;
        const description = data.get('description') as string;
        submitFn(product)
    };

    function handleTitle(event: any) {
        const title = event.target.value;
        const productCopy = { ...product };
        productCopy.title = title;
        setProduct(productCopy);
    }

    function handlePrice(event: any) {
        const price = event.target.value;
        const productCopy = { ...product };
        productCopy.price = price;
        setProduct(productCopy);
    }

    function handleImage(event: any) {
        const image = event.target.value;
        const productCopy = { ...product };
        productCopy.image = image;
        setProduct(productCopy);
    }

    function handleCategory(event: any) {
        const category = event.target.value;
        const productCopy = { ...product };
        productCopy.category = category;
        setProduct(productCopy);
    }

    function handleDescription(event: any) {
        const description = event.target.value;
        const productCopy = { ...product };
        productCopy.description = description;
        setProduct(productCopy);
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main">
                <CssBaseline />
                <Box
                    sx={{
                        my: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Product Info
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{
                        mt: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    onChange={handleTitle}
                                    autoComplete="given-name"
                                    name="title"
                                    required
                                    value={product?.title}
                                    fullWidth
                                    id="title"
                                    label="Product Title"
                                    autoFocus
                                    multiline
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {/* <TextField
                                    onChange={handleCategory}
                                    required
                                    fullWidth
                                    value={product?.category}
                                    id="category"
                                    label="Category"
                                    name="category"
                                /> */}
                                <FormControl fullWidth required>
                                    <InputLabel id="select-category-id">Category</InputLabel>
                                    <Select labelId="select-catrgory-id" label="Category"
                                        value={currentProduct?.category} onChange={handleCategory}>
                                        <MenuItem value=''>None</MenuItem>
                                        {categories.categories.map(cat => <MenuItem value={cat} key={cat}>{cat}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={handlePrice}
                                    required
                                    fullWidth
                                    value={product?.price}
                                    id="price"
                                    label="Price"
                                    name="price"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    onChange={handleImage}
                                    required
                                    fullWidth
                                    value={product?.image}
                                    id="image"
                                    label="Image link"
                                    name="image"
                                />
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <TextField
                                    onChange={handleDescription}
                                    required
                                    fullWidth
                                    value={product?.description}
                                    id="description"
                                    label="Description"
                                    name="description"
                                    multiline
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 7 }}
                        >
                            Submit
                        </Button>

                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default ProductForm;

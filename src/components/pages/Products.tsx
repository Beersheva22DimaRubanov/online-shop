import { Box, Container, Modal } from "@mui/material"
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams, gridClasses } from "@mui/x-data-grid"
import { useState, useEffect, useRef } from "react";
import { Subscription } from "rxjs";
import { productService } from "../../config/service-config";
import { Product } from "../../model/Product";
import { useSelectorAuth } from "../../redux/store";
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import ProductForm from "../forms/ProductForm";
import ProductInfo from "./ProductInfo";
import { Visibility } from "@mui/icons-material";
import { Confirm } from "../common/Confirm";
import { useSelectorProducts } from "../../config/hooks";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const Products: React.FC = () => {
    const userData = useSelectorAuth()
    const currentProduct = useRef<Product | undefined>();
    const [openEdit, setFlEdit] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const title = useRef('');
    const content = useRef('');
    const confirmFn = useRef<any>(null);
    const [openConfirm, setOpenConfirm] = useState(false);
    const products = useSelectorProducts();

  
    function getColumns() {
        let columns: GridColDef[] = [
            {
                field: 'id', headerName: 'ID', flex: 0.3, headerClassName: 'data-grid-header',
                align: 'center', headerAlign: 'center'
            },

            {
                field: 'title', headerName: "Title", flex: 0.8, headerClassName: 'data-grid-header',
                align: 'center', headerAlign: 'center',
            },
            {
                field: 'category', headerName: 'Category', flex: 0.5, headerClassName: 'data-grid-header',
                align: 'center', headerAlign: 'center',
            },
            {
                field: 'price', headerName: 'Price', flex: 0.4, headerClassName: 'data-grid-header',
                align: 'center', headerAlign: 'center'
            },

        ]
        if (userData?.role == 'admin') {
            columns.push({
                field: 'actions', headerName: 'ACTIONS', type: 'actions', flex: 0.8,
                getActions: (params: GridRowParams) => [
                    <GridActionsCellItem onClick={() => {
                        currentProduct.current = params.row;
                        deleteProduct()
                    }} icon={<DeleteIcon />} label="Delete" />,
                    <GridActionsCellItem onClick={() => {
                        currentProduct.current = params.row;
                        setFlEdit(true);
                    }} icon={<EditIcon />} label='Edit' />,
                    <GridActionsCellItem onClick={() => {
                        currentProduct.current = params.row;
                       setOpenModal(true);
                    }} icon={<Visibility />} label='Edit' />
                ]
            })
        }
        return columns;
    }
    async function updateProduct(product: Product) {
        if (currentProduct.current != product) {
            await productService.updateProduct(product)
        }
        setFlEdit(false)
    }

    async function deleteProduct() {
        setOpenConfirm(true);
        title.current = "Remove product?";
        content.current = 'You realy want to delete this product?'
        confirmFn.current = actualRemove
    }

    async function actualRemove(isOk: boolean) {
        let errorMessage: string = '';
        if (isOk) {
            try {
                await productService.deleteProduct(currentProduct.current!.id)
            } catch (error: any) {
                errorMessage = error;
            }
        }
        
        setOpenConfirm(false);
    }

    function handleCloseModal() {
        setOpenModal(false)
    }

    return <Container sx={{ height: 700, width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <DataGrid
            getRowHeight={() => 'auto'}
            sx={{
                [`& .${gridClasses.cell}`]: {
                    py: 3,
                },
            }}
            rows={products}
            columns={getColumns()}
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 10,
                    },
                },
            }}
            pageSizeOptions={[10]}
            disableRowSelectionOnClick
        />
        <Modal
            open={openEdit}
            onClose={() => setFlEdit(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <ProductForm submitFn={updateProduct} currentProduct={currentProduct.current} />
            </Box>
        </Modal>
        <Confirm confirmFn={confirmFn.current} open={openConfirm}
            title={title.current} content={content.current}></Confirm>
        {currentProduct.current && <ProductInfo hideModal={handleCloseModal} isVisible={openModal}
            product={currentProduct.current} isCatalog={false}></ProductInfo>}
    </Container>

}
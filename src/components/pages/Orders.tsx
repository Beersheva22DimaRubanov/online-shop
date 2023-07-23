import { Delete, Edit, Visibility } from "@mui/icons-material";
import { Container, Modal, Box } from "@mui/material";
import { GridColDef, GridRowParams, GridActionsCellItem, DataGrid, gridClasses } from "@mui/x-data-grid";
import { useState, useRef, useEffect } from "react";
import { orderService, productService } from "../../config/service-config";
import { Product } from "../../model/Product";
import { useSelectorAuth } from "../../redux/store";
import ProductForm from "../forms/ProductForm";
import ProductInfo from "./ProductInfo";
import { Order } from "../../model/Order";
import { Subscription } from "rxjs";
import OrderInfo from "./OrderInfo";
import { UID } from "../../service/authService/AuthServiceFire";
import { useNavigate } from "react-router-dom";
import { Confirm } from "../common/Confirm";
import { useSelectorOrders } from "../../config/hooks";


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

const Orders: React.FC = () => {
    // const [orders, setOrders] = useState<Order[]>([]);
    const userData = useSelectorAuth()
    const navigate = useNavigate()
    const currentOrder = useRef<Order | undefined>();
    const [openEdit, setFlEdit] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const title = useRef('');
    const content = useRef('');
    const confirmFn = useRef<any>(null);
    const [openConfirm, setOpenConfirm] = useState(false);
    const orders = useSelectorOrders()

    function getColumns() {
        let columns: GridColDef[] = [
            {
                field: 'id', headerName: 'ID', flex: 0.3, headerClassName: 'data-grid-header',
                align: 'center', headerAlign: 'center'
            },

            {
                field: 'orderTime', headerName: "Order Time", flex: 0.8, headerClassName: 'data-grid-header',
                align: 'center', headerAlign: 'center',
            },

            {
                field: 'status', headerName: 'Status', flex: 0.4, headerClassName: 'data-grid-header',
                align: 'center', headerAlign: 'center'
            },
            {
                field: 'lastDay', headerName: 'Last Day', flex: 0.4, headerClassName: 'data-grid-header',
                align: 'center', headerAlign: 'center'
            }

        ]
        {
            userData?.role == 'admin' && columns.push({
                field: 'actions', headerName: 'ACTIONS', type: 'actions', flex: 0.8,
                getActions: (params: GridRowParams) => [
                    <GridActionsCellItem onClick={() => {
                        currentOrder.current = params.row;
                        deleteOrder()

                    }} icon={<Delete />} label="Delete" />,
                    <GridActionsCellItem onClick={() => {
                        currentOrder.current = params.row;
                        setFlEdit(true);
                        updateOrder()
                    }} icon={<Edit />} label='Edit' />,
                    <GridActionsCellItem onClick={() => {
                        currentOrder.current = params.row;
                        setOpenModal(true);
                    }} icon={<Visibility />} label='Edit' />
                ]
            })
        }
        {
            userData?.role == 'user' && columns.push({
                field: 'actions', headerName: 'ACTIONS', type: 'actions', flex: 0.8,
                getActions: (params: GridRowParams) => [
                    <GridActionsCellItem onClick={() => {
                        currentOrder.current = params.row;
                        deleteOrder()

                    }} icon={<Delete />} label="Delete" />,
                    <GridActionsCellItem onClick={() => {
                        currentOrder.current = params.row;
                        setOpenModal(true);
                    }} icon={<Visibility />} label='Edit' />
                ]
            })
        }
        return columns;
    }

    async function updateOrder() {
        if (currentOrder.current) {
            if (currentOrder.current.status === 'delivery') {
                currentOrder.current.status = "deliveried"
            }
            if (currentOrder.current.status === 'processing') {
                currentOrder.current.status = "delivery"
            }

            await orderService.updateOrder(currentOrder.current)
        }
        setFlEdit(false)
    }

    async function deleteOrder() {
        setOpenConfirm(true);
        title.current = "Remove order?";
        content.current = 'You realy want to delete this order?'
        confirmFn.current = actualRemove
    }

    async function actualRemove(isOk: boolean) {
        let errorMessage: string = '';
        if (isOk) {
            try {
                await orderService.deleteOrder(currentOrder.current?.id)
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
            rows={orders}
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
    
        <Confirm confirmFn={confirmFn.current} open={openConfirm}
            title={title.current} content={content.current}></Confirm>
        {currentOrder.current && <OrderInfo hideModal={handleCloseModal} isVisible={openModal}
            order={currentOrder.current}></OrderInfo>}
    </Container>

}

export default Orders;
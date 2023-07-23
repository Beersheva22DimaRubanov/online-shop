import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { authActions } from "../../redux/slices/AuthSlice";
import { cartActions } from "../../redux/slices/CartSlice";

export const SignOut: React.FC = () => {
    const dispatch = useDispatch();

    return <div> 
        <p className = 'component-logo'>Sign out component</p>
        <div style={{display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: 'center'}}>
            <p style={{fontSize: '2em'}}>Are yre want to sign out?</p>
            <button style={{padding: '1em 1.75em', fontSize: '1em'}} onClick={() =>{
                dispatch(authActions.reset()) 
                dispatch(cartActions.clearCart())}}>Ok</button>
        </div>
</div>
}
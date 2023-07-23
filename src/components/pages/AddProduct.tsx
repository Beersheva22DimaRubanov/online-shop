import { productService } from "../../config/service-config";
import { Product } from "../../model/Product";
import ProductForm from "../forms/ProductForm";

const AddProduct: React.FC = () => {
  function submitFn(product: Product){
    try{
      productService.addProduct(product)
    } catch (error: any){

    }
  }

  return <ProductForm submitFn={submitFn}></ProductForm>
}

export default AddProduct;
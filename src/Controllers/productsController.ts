import { Controller, ErrorResponse, ErrorTypes, RequestInterface, ResponseInterface } from "../types";

class productsController{

 getProducts:Controller= async(httpreq?:RequestInterface):Promise<ResponseInterface>=>{ 

    let httpres:ResponseInterface={
        status:200    //default to be overwritten below
    };

    const {id}=httpreq?.params || {};
    const {limit} = httpreq?.query || {}

    if(id){
        try {
            //get based on param
            httpres.body= `These are all the products with params: ${id}`;
            httpres.status=200;
            return httpres;
        } catch (error) {
           throw new ErrorResponse(`Can't get product due to: ${error.message}`,error.type);
        }
    }

    if(limit){
        try {
            //get based on query
            httpres.body= `These are all the products with queries: ${limit}`;
            httpres.status=200;
            return httpres;
        } catch (error) {
            throw new ErrorResponse(`Can't get products due to: ${error.message}`,error.type);
        }
    }

    try {
        //get all
        httpres.body= 'These are all the products';
        httpres.status=200;
        return httpres;
    } catch (error) {
        throw new ErrorResponse(`Can't get products due to: ${error.message}`,ErrorTypes.RESOURCE_NOT_FOUND);
    }
   
}

}

export default new productsController;

import { Request } from "express"
import { RequestInterface } from "../types"


export default function adaptRequest (req:Request):RequestInterface {
  
 let httpreq :RequestInterface;

 httpreq={
  path: req.path,
  method: req.method,
  params: req.params,
  query: req.query,
  body: req.body,
  session: req.session.id

 }

 return httpreq;
}

const express = require("express")
const ProductManager = require('./ProductManager')
const paths = require("path")
const PORT = 8080


const productmanager = () => {
    try {
        const pathBase = paths.join(__dirname, 'db.json')
        const manager = new ProductManager(pathBase)
        const app = express()
        app.get("/products",async (req,res) =>{
            bool = req.query.hasOwnProperty("limit")
            const numero = parseInt(req.query.limit,10)
        
        
            if(!isNaN(numero) && bool ){
                allProducts = await manager.getProducts()
                if(allProducts.products.length >= numero ){
                    
                    return res.send(allProducts.products.slice(0, numero))
                    
                }else{
                    return res.send((await manager.getProducts()))
                }
               
            }return
            
        })
        


        app.get("/products/:pid",async (req,res) =>{
          
          const id = parseInt(req.params.pid,10)
          if(!isNaN(id)){
            const product = await manager.getProductById(id)
            if (product !== undefined){
                res.send((product))
            }else{
                return res.send((await manager.getProducts()))
            }
            
          }

        })

        app.listen(PORT,()=>{
            console.log("runing")
        })
    } catch (error) {
        console.log(error)
    }
}

productmanager()



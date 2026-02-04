import{Schema,model} from 'mongoose'
//product schema
const productSchema=new Schema(
    {
        productName:{
            type:String,
            requried:[true,"product name is required"],
            minLength:[3,"minimum length is 3 chars"],
            maxLength:[10,"maximum length is 10 chars"],
        },
        brand:{
            type:String,
            minLength:[1,"minimum length is 1 chars"],
            maxLength:[10,"maximum length is 10 chars"],
        },
        price:{
            type:Number,
            required:[true,"price is requried"]
        }
    },
    {
        strict:"throw",
        timestamps:true,
        versionKey:false
    }
)
//create user model with that schema
export const ProductModel=model("product",productSchema)
import{Schema,model} from 'mongoose'
/*const cartSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'product', //name of product model
    }
})*/
const cartSchema=new Schema({
    product:{
        type:Schema.Types.ObjectId,
        ref:'product'
    },
    quantity:{
        type:Schema.Types.ObjectId,
        ref:'product'
    },
})
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "email  required"],
        unique: [true,"duplicate user"]//not a validator it is a helper we cant customize like validators
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    cart: {
        type: [cartSchema],
    },
    quantity:{
        type:[cartSchema]
    }
},
{
    strict:"throw",
    timestamps:true,
    versionKey:false
}
)

export const UserModel = model("user", userSchema)
import Order from "../models/order.js";
import Product from "../models/Product.js";

/* place order  */
export const placeOrderCod = async(req,res) => {
    try {
        const { userId, items, address } = req.body;
        if (!address || items.length === 0) {
            res.json({success:false,message:"Invalid data"})
        }
        // calculate amount using items
        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity
        }, 0);
        // add tax charge 2%
        amount += Math.floor(amount * 0.02);
        await Order.create({
            userId,items,amount,address,paymentType:"COD"
        })
        return res.json({ success:true,message:"order placed successfully"})
    } catch (error) {
        console.log(error.message);
        res.json({ success:false,message:error.message})
    }
}
/* get orders by userId */
export const getUserOrders = async(req,res) => {
    try {
        const { userId } = req.body;
        const orders = await Order.find({ userId, $or: [{ paymentType: "COD" }, { isPaid: true }] }).populate("item.product address").sort({ createdAt: -1 });
        res.json({ success:true,orders})
    } catch (error) {
        console.log(error.message);
        res.json({ success:false,message:error.message})
    }
}
/* get All orders (for seller or admin) */
export const getAllOrders = async(req,res) => {
    try {
        
        const orders = await Order.find({ $or: [{ paymentType: "COD" }, { isPaid: true }] }).populate("item.product address").sort({ createdAt: -1 })
        res.json({ success:true,orders})
    } catch (error) {
        console.log(error.message);
        res.json({ success:false,message:error.message})
    }
}
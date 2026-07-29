const Cart = require("../model/Cart");


// Add product to cart
exports.addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        let cartItem = await Cart.findOne({
            user: userId,
            product: productId
        });

        if(cartItem){
            cartItem.quantity += quantity;
            await cartItem.save();

            return res.status(200).json({
                message:"Cart updated",
                cartItem
            });
        }


        const newCart = new Cart({
            user:userId,
            product:productId,
            quantity
        });


        await newCart.save();

        res.status(201).json({
            message:"Product added to cart",
            newCart
        });


    } catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};



// Get Cart
exports.getCart = async(req,res)=>{
    try{

        const cart = await Cart.find({
            user:req.params.userId
        }).populate("product");


        res.status(200).json(cart);


    }catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};



// Update Quantity
exports.updateCart = async(req,res)=>{
    try{

        const {quantity}=req.body;


        const cart = await Cart.findByIdAndUpdate(
            req.params.cartItemId,
            {quantity},
            {new:true}
        );


        res.status(200).json(cart);


    }catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};



// Remove Item
exports.removeFromCart = async(req,res)=>{
    try{

        await Cart.findByIdAndDelete(
            req.params.cartItemId
        );


        res.status(200).json({
            message:"Item removed"
        });


    }catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};



// Clear Cart
exports.clearCart = async(req,res)=>{
    try{

        await Cart.deleteMany({
            user:req.params.userId
        });


        res.status(200).json({
            message:"Cart cleared"
        });


    }catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};
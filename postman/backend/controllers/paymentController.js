const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});


// Create Razorpay Order
const processPayment = async (req, res) => {
    try {

        const options = {
            amount: Number(req.body.amount) * 100,
            currency: "INR",
            receipt: "receipt_order_" + Date.now(),
        };

        const order = await razorpay.orders.create(options);

        res.status(200).json({
            success: true,
            order,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};


// Verify Payment
const verifyPayment = async (req, res) => {
    try {

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        } = req.body;

        const body =
            razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        const isAuthentic =
            expectedSignature === razorpay_signature;

        if (isAuthentic) {

            return res.status(200).json({
                success: true,
                message: "Payment Verified Successfully",
            });

        }

        res.status(400).json({
            success: false,
            message: "Payment Verification Failed",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};


// Get Razorpay Key
const getPaymentKey = async (req, res) => {

    res.status(200).json({
        success: true,
        key: process.env.RAZORPAY_KEY_ID,
    });

};


module.exports = {
    processPayment,
    verifyPayment,
    getPaymentKey,
};
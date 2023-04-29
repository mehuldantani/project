const asyncHandler = (fn) => async (req,resp,next) => {
    try {
        await fn(req,resp,next)
    } catch (error) {
        resp.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = asyncHandler

//explanation
// const asyncHandler = () => {};
// const asyncHandler = (func) => {};
// const asyncHandler = (func) => () => {};
// const asyncHandler = (func) => async () => {};

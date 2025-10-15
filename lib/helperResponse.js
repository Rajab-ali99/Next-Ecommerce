const { NextResponse } = require("next/server")

export async function response(statusCode, success, message, data = {}) {
    return NextResponse.json({ statusCode, success, message, data })
}

export async function Error(error, customMessage) {
    // Duplicate keys Error
    if (error.code === 11000) {
        const keys = Object.keys(error.keyPattern).join(", ");
        error.message = `Duplicate Keys : ${keys}. These feilds must be unique.`
    }

      let errorOBJ = {}
    if (process.env.NODE_ENV === "development") {
        errorOBJ = {
            message: error.message,
            error
        }
    }else{
        errorOBJ = {
            message: customMessage || 'Internal Server Error'
        }
    }
    return NextResponse.json({ statusCode: error.code, success: false, ...errorOBJ })
}
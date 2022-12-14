const Auth = (req, res, next) => {
    console.log('Masuk Auth Dulu Y')
    if(req.headers.authorization !== 'admin'){
        return res.status(401).send({
            isError: true,
            message: 'User Unauthorized',
            data: null
        })
    }

    next()
}

module.exports = Auth
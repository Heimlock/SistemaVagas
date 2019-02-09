const   jwt         =   require('jsonwebtoken');
const   db          =   require('../firebaseConfig.js');
const   secretKey   =   require('../secretKey.js');

const   validateToken   =  async ( req, res, next ) => {
    let token   =   req.headers['authorization'];

    //  No Token on Request
    if(!token)
        return  res.status(401).send({ auth:false, message:"No Token Provided" });
    //  Not a Valid Request
    if(token.split(' ')[0] != 'Bearer')
        return  res.status(401).send({ auth:false, message:"Invalid Token" });

    jwt.verify(token.split(' ')[1], secretKey, async (error, decoded) => {
        if(error)   return res.status(500).send({auth:false, message:'Failed to Decode'});

        //  Request All Users to Find Who is Calling
        let data    =   await db.collection('users').get();
        let user    =   data.docs.find(user => user.id === decoded.id)

        if (user)
            next()
        else
            return res.status(401).send({auth:false, message:'Failed to authenticate token'});
    });
}

module.exports  =   validateToken;
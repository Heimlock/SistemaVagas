const   jwt         =   require('jsonwebtoken');
const   secretKey   =   require('../../config/secretKey.js');

module.exports  =   routes  =>  {
    //  Connection to Firebase Collection
    const   db = routes.config.firebaseConfig.collection('users');

    routes.post('/login', async (req, res) => {
        try {
            let data    =   await db.get();
            let filteredUser = data.docs.find(
                doc => {
                    let user    =   doc.data();
                    return ( user.email == req.body.email && user.password == req.body.password );
            });

            if(filteredUser)
            {
                filteredUser=   extractUser(filteredUser);
                let id      =   filteredUser.id;
                let token   =   await jwt.sign({id}, secretKey);
                res.status(200).send({auth: true, token: token, user: filteredUser});
            }
            else
                return res.status(404).send({auth: false, message:'Not a Valid Email|Password'});
        } catch (error) {
            return  res.status(500).send(error);
        }
    });
    
     //  Ajust Data Output to Fit the User Model
     extractUser = user => {
        let v = user.data();
        // console.log(v);
        
        return {
            id: user.id,
            name:v.name,
            email:v.email,
            password: v.password,
            createTime: user.createTime.toDate(),
            updateTime: user.updateTime.toDate(),
            readTime: user.readTime.toDate()
        }
    }
}
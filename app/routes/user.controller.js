
//  Dependencies
const   userModel   =   require('../../modules/user.js');
const { check, validationResult } = require('express-validator/check');

//  Variables
let collectionUsers = [];

//  Rotas
module.exports = routes => {
    
    //  Retorna Todos os Usuários
    routes.get('/users', (req, res) => {
        res.send(collectionUsers);
    });

    //  Retorna um Dado Usuário
    routes.get('/users/:id', (req, res) => {
        var id  =   req.params.id;
        var user=   collectionUsers.find( 
            (element) =>{
                if( element.id == id )
                    return element;
            }
        );
        if(user) res.send(user);
        else     res.status(500).send("User not found");
    });

    //  Inclui um Novo Usuário
    routes.post('/users', [
        check('name').isLength({ min: 5 }),
        check('email').isEmail(),
        check('password').isLength({ min: 5 })
    ], (req, res) => {
        if (!validationResult(req).isEmpty()) {
          return res.status(422).json({ errors: validationResult(req).array() });
        }
        try {
            //  Parser da Requesição
            let user = new userModel.User(
                req.body.id,
                req.body.name,
                req.body.email,
                req.body.password
            );

            //  Inclui no DB
            collectionUsers.push(user);

            //  Envia a Resposta à Requesição
            res.send(user);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    // //  Atualiza um Usuario
    // routes.put('/users/:id', (req, res) => {
    //     collectionUsers.forEach((user, index) => {
    //         if (user.id == req.params.id) {                
    //             try {
    //                 user.name       =   req.body.name,
    //                 user.email      =   req.body.email,
    //                 user.password   =   req.body.password

    //                 collectionUsers[index] = user
    //                 res.send(user)
    //             }
    //             catch (error) { return res.status(500).send(error) }
    //         }
    //     })
    //     res.status(404).send('User not found')
    // })
    
    //  Remove um dado Usuário
    routes.delete('/users/:id', (req, res) => {
        try{
            collectionUsers.forEach((user, index) => {
                if(user.id == req.params.id){
                    collectionUsers.splice(index, 1)
                    return res.send()
                }
            })
        }
        catch(error)
            { return res.status(500).send(error) }
    })
    
}
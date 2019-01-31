
//  User Controller

//  Dependencies
const userModel = require('../../modules/user.js');
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
        var id = req.params.id;
        let user = collectionUsers.find(
            user => user.id == id
        );
        if (user) res.send(user);
        else res.status(500).send("User not found");
    });

    //  Inclui um Novo Usuário
    routes.post('/users', [
            check('name').isLength({
                min: 5
            }),
            check('email').isEmail(),
            check('password').isLength({
                min: 5
            })
        ],
        (req, res) => {
            if (!validationResult(req).isEmpty()) {
                return res.status(422).json({
                    errors: validationResult(req).array()
                });
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

    //  Atualiza um Usuario
    routes.put('/users/:id', [
            check('name').isLength({
                min: 5
            }),
            check('email').isEmail(),
            check('password').isLength({
                min: 5
            })
        ],
        (req, res) => {
            if (!validationResult(req).isEmpty()) {
                return res.status(422).json({
                    errors: validationResult(req).array()
                });
            }
            let userIndex = collectionUsers.findIndex(user => user.id == req.params.id)

            // console.log(`Index ${userIndex}`);
            if (userIndex == -1)
                res.status(404).send('User not found')

            try {
                collectionUsers[userIndex].name = req.body.name,
                    collectionUsers[userIndex].email = req.body.email,
                    collectionUsers[userIndex].password = req.body.password
                res.send(collectionUsers[userIndex])
            } catch (error) {
                return res.status(500).send(error)
            }
        })

    //  Remove um dado Usuário
    routes.delete('/users/:id', (req, res) => {
        try {
            let userIndex = collectionUsers.findIndex(user => user.id == req.params.id)
            if (userIndex < 0)
                res.status(404).send('User not found')
            collectionUsers.splice(userIndex, 1)
            return res.status(200).send(`User #${req.params.id} was Deleted`)
        } catch (error) {
            return res.status(500).send(error)
        }
    })

}
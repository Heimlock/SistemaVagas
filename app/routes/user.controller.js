
//  User Controller

//  Dependencies
const { check, validationResult } = require('express-validator/check');

//  Rotas
module.exports = routes => {
    //  Connection to Firebase Collection
    const   db = routes.config.firebaseConfig.collection('users');

    //  Retorna Todos os Usuários
    routes.get('/users', async (req, res) => {
        try {
            await db.get().then( ref => {
                let users    =   [];

                ref.forEach(doc => {
                    users.push(extractUser(doc));
                });
                return res.status(200).send(users);
            }).catch( err => {
                return res.status(404).send(`Failed to Fetch Users - ${err}`)
            });
        } catch (error) {
            return res.status(500).send(error);
        }
    });

    //  Retorna um Dado Usuário
    routes.get('/users/:id', async (req, res) => {
        var id = req.params.id;
        try
        {
            await db.doc(id).get().then(doc => {
                return res.status(200).send(extractUser(doc));
              }).catch( err => {
                return res.status(418).send(`Failed to Fetch User #${id} - ${err}`)
            });
        } catch (error) {
            return res.status(500).send(error);
        }
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
        async (req, res) => {
            if (!validationResult(req).isEmpty()) {
                return res.status(422).json({
                    errors: validationResult(req).array()
                });
            }
            try {
                await db.add(req.body).then( ref => {
                    res.status(200).send(`User #${ref.id} (${req.body.name}) was Added`);
                }).catch( err => {
                    return res.status(404).send(`Failed to Add User (${req.body.name}) - ${err}`)
                });
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
        async (req, res) => {
            if (!validationResult(req).isEmpty()) {
                return res.status(422).json({
                    errors: validationResult(req).array()
                });
            }
            try {
                await db.doc(req.params.id).update(req.body).then(() => {
                    res.send(`User #${req.params.id} was Updated`);
                  }).catch( err => {
                    return res.status(404).send(`Failed to Update User #${req.params.id} - ${err}`)
                });
            } catch (error) {
                return res.status(500).send(error)
            }
        })

    //  Remove um dado Usuário
    routes.delete('/users/:id', async (req, res) => {
        try {
            await db.doc(req.params.id).delete().then( () => {
                return res.status(200).send(`User #${req.params.id} was Deleted`)
            }).catch( err => {
                return res.status(404).send(`Failed to Delete User #${req.params.id} - ${err}`)
            });
        } catch (error) {
            return res.status(500).send(error)
        }
    })

        //  Ajust Data Output to Fit the User Model
        extractUser = user => {
            let v = user.data();
            // console.log(v);
            
            return {
                id: user.id,
                name:v.name,
                email:v.email,
                // password: v.password,
                createTime: user.createTime.toDate(),
                updateTime: user.updateTime.toDate(),
                readTime: user.readTime.toDate()
            }
        }
}

//  Class
const   userModel   =   require('../modules/user.js');
const   jobModel    =   require('../modules/job.js');

//  Variables
let collectionUsers = [];
let collectionJobs  = [];

//  Rotas
module.exports = routes => {
    //  Verificar se Server está Funcionando
    routes.get('/', (req, res) => {
        res.send('Ok');
    });

    //  Retorna Todos os Usuários
    routes.get('/users', (req, res) => {
        res.send(collectionUsers);
    });

    //  Inclui um Novo Usuário
    routes.post('/users', (req, res) => {
        try {
            //  Parser da Requesição
            let user = new userModel.User(
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

    //  Retorna todos os Jobs
    routes.get('/jobs', (req, res) => {
        res.send(collectionJobs);
    });

    //  Inclui um novo Job
    routes.post('/jobs', (req, res) =>{
        try {
            //  Parser da Requesição
            let job = new jobModel.Job(
                req.body.name,
                req.body.salary,
                req.body.description,
                req.body.skills,
                req.body.area,
                req.body.differentials,
                req.body.isPcd,
                req.body.isActive
            );

            //  Inclui no DB
            collectionJobs.push(job);

            //  Envia a Resposta à Requesição
            res.send(job);
        } catch (error) {
            res.status(500).send(error);
        }
    });
}

//  Dependencies
const   jobModel    =   require('../../modules/job.js');
const { check, validationResult } = require('express-validator/check');

//  Variables
let collectionJobs  = [];

//  Rotas
module.exports = routes => {
    
    //  Retorna todos os Jobs
    routes.get('/jobs', (req, res) => {
        res.send(collectionJobs);
    });

    //  Inclui um novo Job
    routes.post('/jobs', [check('name').isLength({ min: 5 })], (req, res) =>{
        try {
            //  Parser da Requesição
            let job = new jobModel.Job(
                req.body.id,
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

    //  Update um dado Job
    routes.put('/jobs/:id', [check('name').isLength({ min: 5 })], (req, res) => {
        collectionJobs.forEach((job, index) => {
            if (job.id == req.params.id) {                
                try {
                    job.name         =  req.body.name,
                    job.salary       =  req.body.salary,
                    job.description  =  req.body.description,
                    job.skills       =  req.body.skills,
                    job.differentials=  req.body.differentials,
                    job.isPcd        =  req.body.isPcd,
                    job.isActive     =  req.body.isActive

                    collectionJobs[index] = job
                    res.send(job)
                }
                catch (error) { return res.status(500).send(error) }
            }
        })
        res.status(404).send('Job not found')
    })

    //  Deleta um dado Job
    routes.delete('/jobs/:id', (req, res) => {
        try{
            collectionJobs.forEach((job, index) => {
                if(job.id == req.params.id){
                    collectionJobs.splice(index, 1)
                    return res.send()
                }
            })
        }
        catch(error)
            { return res.status(500).send(error) }
    })
}
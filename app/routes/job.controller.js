
//  Job Controller

//  Dependencies
const jobModel = require('../../modules/job.js');
const { check, validationResult } = require('express-validator/check');

//  Variables
let collectionJobs = [];

//  Rotas
module.exports = routes => {

    //  Connection to Firebase Collection
    const   db = routes.config.firebaseConfig.collection('jobs');

    //  Retorna todos os Jobs
    routes.get('/jobs', async (req, res) => {
        try {
            let docs    =   await db.get(); //  Recupera dados do Banco
            let jobs    =   [];

            docs.forEach(doc => {
                jobs.push(extractJob(doc));
            });

            return res.status(200).send(jobs);
        } catch (error) {
            return res.status(500).send(error);
        }
    });

    // Retorna um dado Job
    routes.get('/jobs/:id', async (req, res) => {
        var id = req.params.id;
        try
        {
            let job = await  db.doc(id).get();
            
            if(job.exists) //  Verify if its a Valid Response
                return res.status(200).send(extractJob(job));
            else
                return res.status(404).send('Job not Found!');
        } catch (error) {
            return res.status(500).send(error);
        }
    });

    //  Inclui um novo Job
    routes.post('/jobs', [check('name').isLength({ min: 5 })], async (req, res) => {
        if (!validationResult(req).isEmpty()) {
            return res.status(422).json({
                errors: validationResult(req).array()
            });
        }
        try {
            // await db.doc().set(req.body);
            // return res.status(200).send(`Job Added Successfully`);
            await db.add(req.body).then( ref => {
                res.status(200).send(`Job #${ref.id} was Added`);
            });
        } catch (error) {
            res.status(500).send(error);
        }
    });

    //  Update um dado Job
    routes.put('/jobs/:id', [check('name').isLength({ min: 5 })], async (req, res) => {
        if (!validationResult(req).isEmpty()) {
            return res.status(422).json({
                errors: validationResult(req).array()
            });
        }
        try {
            let job =   await db.doc(req.params.id).update(req.body);   //  Retorns if it was Updated or not (Boolean)

            if(job.exists)
                return res.send(`Job #${req.params.id} was Updated`);
            else
                return res.status(404).send(`Job Not Found`);
        } catch (error) {
            return res.status(500).send(error)
        }
        res.status(404).send('Job not found')
    })

    //  Deleta um dado Job
    routes.delete('/jobs/:id', async (req, res) => {
        try {
            let job =   await db.doc(req.params.id).delete();
            if (job.exists)
                return res.status(200).send(`Job #${req.params.id} was Deleted`)
            else
                return res.status(404).send('Job not found')
        } catch (error) {
            return res.status(500).send(error)
        }
    })

    //  Ajust Data Output to Fit the Job Model
    extractJob = job => {
        let v = job.data();
        // console.log(v);
        
        return {
            id: job.id,
            name:v.name,
            salary:v.salary,
            description: v.description,
            skills: v.skills,
            area: v.area,
            differentials: v.differentials,
            isPcd: v.isPcd,
            isActive: v.isActive,
            createTime: job.createTime.toDate(),
            updateTime: job.updateTime.toDate(),
            readTime: job.readTime.toDate()
        }
    }
}
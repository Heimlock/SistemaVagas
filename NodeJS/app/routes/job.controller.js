
//  Job Controller

//  Dependencies
const { check, validationResult }   =   require('express-validator/check');
const validateToken                 =   require('../../config/security/tokenValidator.js');

//  Rotas
module.exports = routes => {

    //  Connection to Firebase Collection
    const   db = routes.config.firebaseConfig.collection('jobs');

    //  Retorna todos os Jobs
    routes.get('/jobs',
        // validateToken,
        async (req, res) => {
        try {
            await db.get().then( ref => {
                let jobs    =   [];

                ref.forEach(doc => {
                    jobs.push(extractJob(doc));
                });
                return res.status(200).send(jobs);
            }).catch( err => {
                return res.status(404).send(`Failed to Fetch Jobs - ${err}`)
            });
        } catch (error) {
            return res.status(500).send(error);
        }
    });

    // Retorna um dado Job
    routes.get('/jobs/:id', 
        // validateToken, 
        async (req, res) => {
        var id = req.params.id;
        try
        {
            await db.doc(id).get().then(doc => {
                return res.status(200).send(extractJob(doc));
              }).catch( err => {
                return res.status(404).send(`Failed to Fetch Job #${id} - ${err}`)
            });
        } catch (error) {
            return res.status(500).send(error);
        }
    });

    //  Inclui um novo Job
    routes.post('/jobs', 
        // [check('name').isLength({ min: 5 }), validateToken], 
        async (req, res) => {
        // if (!validationResult(req).isEmpty()) {
        //     return res.status(422).json({
        //         errors: validationResult(req).array()
        //     });
        // }
        try
        {
            await db.add(req.body).then( ref => {
                res.status(200).send(`Job #${ref.id} (${req.body.name}) was Added`);
            }).catch( err => {
                return res.status(404).send(`Failed to Add Job (${req.body.name}) - ${err}`)
            });
        } catch (error) {
            res.status(500).send(error);
        }
    });

    //  Update um dado Job
    routes.put('/jobs/:id', 
        // [check('name').isLength({ min: 5 }), validateToken], 
        async (req, res) => {
        // if (!validationResult(req).isEmpty()) {
        //     return res.status(422).json({
        //         errors: validationResult(req).array()
        //     });
        // }
        try
        {
            await db.doc(req.params.id).update(req.body).then(() => {
                res.send(`Job #${req.params.id} was Updated`);
              }).catch( err => {
                return res.status(404).send(`Failed to Update Job #${req.params.id} - ${err}`)
            });
        } catch (error) {
            res.status(500).send(error)
        }
    })

    //  Deleta um dado Job
    routes.delete('/jobs/:id', 
        // validateToken, 
        async (req, res) => {
        try
        {
            await db.doc(req.params.id).delete().then( () => {
                return res.status(200).send(`Job #${req.params.id} was Deleted`)
            }).catch( err => {
                return res.status(404).send(`Failed to Delete Job #${req.params.id} - ${err}`)
            });
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
            isActive: v.isActive/*,
            createTime: job.createTime.toDate(),
            updateTime: job.updateTime.toDate(),
            readTime: job.readTime.toDate()*/
        }
    }
}
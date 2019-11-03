const express = require('express')

const server = express()

server.use(express.json())

const projects = []


/* 
POST /projects: A rota deve receber id e title dentro do corpo e 
cadastrar um novo projeto dentro de um array no seguinte formato: 
{
     id: "1", 
     title: 'Novo projeto', 
     tasks: [] 
};
Certifique-se de enviar tanto o ID quanto o título do projeto no formato string com aspas duplas.
*/

function checkProjectExists (req, res, next){
    const { id } = req.params;
    const project = projects.find(p => p.id == id)

    if (!project) {
        return res.status(400).json({ error: 'Project not found' });
    }

    return next();
}

/**
 * Middleware que dá log no número de requisições
 */
function logRequests(req, res, next) {

    console.count("Número de requisições");

    return next();
}

server.use(logRequests);

server.post('/projects', (req, res) => {
    const { id, title, tasks } = req.body

    projects.push(id, title, tasks)

    return res.send(projects)

})

/*
 GET /projects: Rota que lista todos projetos e suas tarefas;
 */

server.get('/projects', (req, res) => {
    const { id, title, tasks } = req.body

    return res.send({
        "id": id, 
        "title": title, 
        "tasks": tasks
    })
})

// PUT / projects /: id: A rota deve alterar apenas o título do projeto com o id presente nos parâmetros da rota;

server.put('/projects/:id', (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(p => p.id == id);

    project.title = title;

    return res.json(project);
    
})


server.delete('/projects/:id', checkProjectExists, (req, res) => {
    const { id } = req.params;

    const projectIndex = projects.findIndex(p => p.id == id);

    projects.splice(projectIndex, 1);

    return res.send();
});


server.listen(8080, err => {
    console.log('server is running')
})
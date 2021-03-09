const minionsRouter = require('express').Router();

module.exports = minionsRouter;

const {
    addToDatabase,
    getAllFromDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    getFromDatabaseById
} = require('./db');

minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minion', id);
    if(minion){
        req.minion = minion;
        next();
    } else {
        res.status(404).send();
    }
});

minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
});

minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
  });

minionsRouter.put('/:minionId', (req, res, next) => {
    const updatedMinion = updateInstanceInDatabase('minions', req.minion);
    res.send(updatedMinion);
});

minionsRouter.delete('/:minionId', (req, res, next) => {
    const minionDeleted = deleteFromDatabasebyId('minions', req.params.minionId);
    
    if(minionDeleted) {
        res.status(204).send(console.log('Minion has been deleted!'));
    } else {
        res.status(500).send();
    }
})

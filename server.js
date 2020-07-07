// ---- EXPRESS JS - Framework
let express = require('express'),
    app = express();
// ------------------------
// RESOURCE UTILISATEUR
// ------------------------
// --- Base de donnees
let mongoose = require('mongoose');

let database  = mongoose.connect("mongodb://localhost/demo",{
    promiseLibrary: require('bluebird'),
    useNewUrlParser: true
});

// --- Definition du models
//--- Module dependencies
const Schema	 	= mongoose.Schema;

//------------------------------------------- Resources Schema
let UtilisateurSchema = new Schema({
    nom      : String,
    login		: String,
    mdp     : String
});

mongoose.model('Utilisateur', UtilisateurSchema);

app.get('/utilisateur',(req, res)=>{
	let Utilisateur = mongoose.model('Utilisateur')
	Utilisateur.find({}).then((result)=>{
            res.status(200).json(result)
        },(err)=>{
            res.status(400).json(err)
        })
})


// --- CRUD ...

app.post('/utilisateur',(req, res)=>{
	let Utilisateur = mongoose.model('Utilisateur');
	let unUtilisateur = new Utilisateur(req.body);
        unUtilisateur.save().then((result)=>{
            res.status(200).json(unUtilisateur)
        },(err)=>{
            res.status(400).json(err)
        })
})

// ------------------------
// START SERVER
// ------------------------
app.listen(3000,function(){
    console.info('HTTP server started on port 3000');
});









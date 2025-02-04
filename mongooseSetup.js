require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// 📌 Définition du Schéma
const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: Number,
    favoriteFoods: [String]
});

const Person = mongoose.model('Person', personSchema);

// 📌 Créer et Sauvegarder une Personne
const createAndSavePerson = (done) => {
    const person = new Person({
        name: "Alice",
        age: 25,
        favoriteFoods: ["Pizza", "Pasta"]
    });

    person.save((err, data) => {
        if (err) return console.error(err);
        console.log("✅ Personne enregistrée :", data);
        done(null, data);
    });
};

// 📌 Créer plusieurs personnes avec Model.create()
const createManyPeople = (arrayOfPeople, done) => {
    Person.create(arrayOfPeople, (err, data) => {
        if (err) return console.error(err);
        console.log("✅ Personnes ajoutées :", data);
        done(null, data);
    });
};

// 📌 Trouver toutes les personnes ayant un nom donné
const findPeopleByName = (name, done) => {
    Person.find({ name }, (err, data) => {
        if (err) return console.error(err);
        console.log("✅ Personnes trouvées :", data);
        done(null, data);
    });
};

// 📌 Trouver une seule personne par son plat préféré
const findOneByFood = (food, done) => {
    Person.findOne({ favoriteFoods: food }, (err, data) => {
        if (err) return console.error(err);
        console.log("✅ Personne trouvée :", data);
        done(null, data);
    });
};

// 📌 Trouver une personne par ID
const findPersonById = (personId, done) => {
    Person.findById(personId, (err, data) => {
        if (err) return console.error(err);
        console.log("✅ Personne trouvée :", data);
        done(null, data);
    });
};

// 📌 Mettre à jour une personne en ajoutant "Hamburger" aux plats préférés
const findEditThenSave = (personId, done) => {
    Person.findById(personId, (err, person) => {
        if (err) return console.error(err);
        person.favoriteFoods.push("Hamburger");
        person.save((err, updatedPerson) => {
            if (err) return console.error(err);
            console.log("✅ Mise à jour réussie :", updatedPerson);
            done(null, updatedPerson);
        });
    });
};

// 📌 Mettre à jour une personne (fixer son âge à 20 ans)
const findAndUpdate = (personName, done) => {
    Person.findOneAndUpdate(
        { name: personName },
        { age: 20 },
        { new: true },
        (err, updatedPerson) => {
            if (err) return console.error(err);
            console.log("✅ Mise à jour réussie :", updatedPerson);
            done(null, updatedPerson);
        }
    );
};

// 📌 Supprimer une personne par ID
const removeById = (personId, done) => {
    Person.findByIdAndRemove(personId, (err, deletedPerson) => {
        if (err) return console.error(err);
        console.log("✅ Personne supprimée :", deletedPerson);
        done(null, deletedPerson);
    });
};

// 📌 Supprimer plusieurs personnes par nom
const removeManyPeople = (name, done) => {
    Person.deleteMany({ name }, (err, result) => {
        if (err) return console.error(err);
        console.log("✅ Personnes supprimées :", result);
        done(null, result);
    });
};

// 📌 Requête avec tri, limite et sélection
const queryChain = (done) => {
    Person.find({ favoriteFoods: "Burrito" })
        .sort({ name: 1 }) // Tri par nom (ascendant)
        .limit(2) // Limite à 2 résultats
        .select("-age") // Masque l'âge
        .exec((err, data) => {
            if (err) return console.error(err);
            console.log("✅ Résultat de la requête :", data);
            done(null, data);
        });
};

// Exports pour les tests
module.exports = {
    createAndSavePerson,
    createManyPeople,
    findPeopleByName,
    findOneByFood,
    findPersonById,
    findEditThenSave,
    findAndUpdate,
    removeById,
    removeManyPeople,
    queryChain
};
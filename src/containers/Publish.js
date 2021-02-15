import axios from "axios";

const Publish = () => {
    return (
        <div className="publish">
            <div>
                <h2>Vends ton article</h2>
                <form action="">
                    <div>
                        <input type="file" />
                        <p>Titre</p>
                        <input
                            type="text"
                            placeholder="ex: Chemise Sézane verte"
                        />
                        <p>Décris ton article</p>
                        <input
                            type="text"
                            placeholder="porté quelquefois, taille correctement"
                        />
                        <p>Marque</p>
                        <input type="text" placeholder="ex: Zara" />
                        <p>Taille</p>
                        <input type="text" placeholder="ex: L/40/12" />
                        <p>Couleur</p>
                        <input type="text" placeholder="ex: Fushia" />
                        <p>État</p>
                        <input
                            type="text"
                            placeholder="ex: Neuf avec étiquette"
                        />
                        <p>Lieu</p>
                        <input type="text" placeholder="ex: Paris" />
                        <div>
                            <p>Prix</p>
                            <input type="text" placeholder="ex: 10,00 €" />
                            <input type="checkbox" />
                            <span>Je suis intéressé(e) par les échanges</span>
                        </div>
                    </div>
                    <div>
                        <button>Ajouter</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Publish;

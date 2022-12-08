import '../styles/searchInput.css';
import { Component } from "react";

import { getGitHubService } from "../App";

// Composant qui gère la recherche
export default class SearchInput extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    changeSearch = (e) => {
        // Ce morceau de code sert à attendre que l'utilisateur ait fini de taper avant d'appeler l'API

        // A chaque appel de la fonction, on récupère le temps actuel
        this.timeLastChange = new Date();

        // Puis une seconde plus tard, on vérifie s'il n'y a pas eu de nouveaux changements entre temps
        setTimeout(() => {
            var now = new Date();
            if (now - this.timeLastChange > 1000) {
                var newSearch = e.target.value;
                this.searchUsers(newSearch);
            }
        }, 1000);
    }

    // On récupère une instance du service puis on lui demande d'appeler l'API
    searchUsers = (searchWord) => {
        getGitHubService().getUsers(searchWord).then((res) => {

            // Quand on a reçu la nouvelle liste, on la fait rementer au composant App
            this.props.changeListUsers(res.users, res.numResults);
        });
    }

    render() {
        return (
            <input
                id="search"
                type="text"
                className="search"
                placeholder="Search input"
                onChange={this.changeSearch}
            ></input>
        );
    }
}
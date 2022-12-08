import './styles/App.css';
import { Component } from "react";

import GitHubService from './services/gitHubService.js';

import SearchInput from './components/searchInput.js';
import EditBar from './components/editBar.js';
import CardsContainer from './components/cardsContainer.js';

// Morceau de code pour pouvoir utiliser la même instance du service dans tout le code
var gitHubService;
export function getGitHubService() {
  if (!gitHubService)
    gitHubService = new GitHubService();
  return gitHubService;
}

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      listUsers: [],
      numResults: 0,
      numSelection: 0,
      message: "No result ...",
      editMode: false
    }
  }

  // Fonction pour mettre à jour la liste des users (au passage on met à jour le message et le nombre de résultats)
  changeListUsers = (newListUsers, newNumResults) => {
    this.setState({
      listUsers: newListUsers,
      numResults: newNumResults,
      message: this.getMessage(newListUsers, newNumResults)
    });
  }

  // Fonction pour "calculer" le message à afficher
  getMessage = (newListUsers, newNumResults) => {
    var message;
    // Si on a pas de résultas
    if (!newListUsers || !newListUsers.length) {
      message = "No result ...";
    // Si l'API nous a renvoyée qu'une partie des résultats
    } else if (newNumResults > newListUsers.length) {
      message = "There are " + newNumResults + " results but only " + newListUsers.length + " are displayed !";
    }
    return message;
  };

  //--------------Selection for edition--------------

  // Fonction appelée lorsque l'on ouvre ou ferme le mode édition
  changeEditMode = (bool) => {
    this.setState({ editMode: bool });
  }

  // Fonction appelée lorsque l'on (dé)coche une carte. On récupère l'index du user dans la liste et l'état de la checkbox
  changeSelection = (index, isSelected) => {
    // On ne fait une modification que si la sélection est différente
    if (!this.state.listUsers[index].isSelected === isSelected) {
      this.state.listUsers[index].isSelected = isSelected;

      // En fonction, on actualise le nombre d'éléments sélectionnés
      if (isSelected) this.setState({ numSelection: this.state.numSelection + 1 });
      else this.setState({ numSelection: this.state.numSelection - 1 });
    }
    // On retourne le nouvel état du user
    return this.state.listUsers[index];
  }

  // Fonction appelée lorsque l'on veut (dé)cocher toutes les cartes
  selectAllUsers = (isSelected) => {
    // On gère tous les users un par un
    var newListUsers = this.state.listUsers.map((_, index) =>
      this.changeSelection(index, isSelected)
    );

    // En fonction, on actualise le nombre d'éléments sélectionnés
    if (isSelected) this.setState({ numSelection: this.state.listUsers.length });
    else this.setState({ numSelection: 0 });

    // On actualise la liste des users
    this.setState({ listUsers: newListUsers });
  }

  //--------------Edition--------------

  // Fonction appelée lorsque l'on souhaite supprimer tous les users sélectionnés
  onDeleteUsers = () => {
    // On filtre que les users non sélectionnés
    var newListUsers = this.state.listUsers.filter((user) => !user.isSelected);

    // On actualise la liste des users
    this.changeListUsers(newListUsers, this.state.numResults);

    // On décoche tout
    this.selectAllUsers(false);
  }

  onDuplicateUsers = () => {
    var newListUsers = this.state.listUsers;
    //On parcourt la liste à l'envers pour ne pas altérer les index des users non encore parcourus
    for (var i = this.state.listUsers.length - 1; i >= 0; i--) {

      // Si un user est sélectionné, on insère le même user dans la nouvelle liste
      // L'utilisation du JSON est une petite manipulation pour copier tout l'objet et non seulement sa référence
      if (this.state.listUsers[i].isSelected) newListUsers.splice(i, 0, JSON.parse(JSON.stringify(this.state.listUsers[i])));
    }
    // On actualise la liste des users
    this.changeListUsers(newListUsers, this.state.numResults);

    // On décoche tout
    this.selectAllUsers(false);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="headerTop">
            <div>
              <div>Github Search</div>
            </div>
          </div>
          <SearchInput changeListUsers={this.changeListUsers} />
          <EditBar
            selectAllUsers={this.selectAllUsers}
            numSelection={this.state.numSelection}
            onDelete={this.onDeleteUsers}
            onDuplicate={this.onDuplicateUsers}
            changeEditMode={this.changeEditMode}
          />
          <div>{this.state.message}</div>
        </header>

        <CardsContainer
          editMode={this.state.editMode}
          listUsers={this.state.listUsers}
          changeSelection={this.changeSelection}
          numResults={this.state.numResults}
        />

      </div>
    );
  }

}
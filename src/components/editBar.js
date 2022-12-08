import '../styles/editBar.css';
import { Component } from "react";

import { FaTrashAlt, FaClone } from "react-icons/fa";

// Composant qui gère l'édition des users
export default class EditBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayEdition: false,
        }
    }

    // Activation ou désactivation du mode édition en fonction du bool en argument
    openEditBar = (bool) => {
        // On fait remonter l'information au composant App
        if (this.props.changeEditMode) this.props.changeEditMode(bool);
        // On change l'état pour informer le composant actuel d'ouvrir le panneau d'édition
        this.setState({ displayEdition: bool });
    }

    // Fonction qui demande au composant App de (dé)sélectionner tous les utilisateurs
    selectAllUsers = (e) => {
        if (this.props.selectAllUsers) this.props.selectAllUsers(e.target.checked);
    }

    // Fonction qui demande au composant App de dupliquer les utilisateurs sélectionnés
    onDuplicate = () => {
        if (this.props.onDuplicate) this.props.onDuplicate();
    }

    // Fonction qui demande au composant App de supprimer les utilisateurs sélectionnés
    onDelete = () => {
        if (this.props.onDelete) this.props.onDelete();
    }

    render() {
        // A chaque render, on a besoin de récupérer le numéro de user sélectionnés
        this.state.numSelection = this.props.numSelection ? this.props.numSelection : 0;

        
        var element;
        if (this.state.displayEdition) {
            // Quand le mode édition est ouvert, on affiche tout le panneau
            (
                element =
                <div>
                    <div className='openEditBar'>
                        <div onClick={() => this.openEditBar(false)}>Close edition</div>
                    </div>
                    <div className="editBar">
                        <div className="selectAll">
                            <input type="checkbox" onChange={this.selectAllUsers}></input>
                            <label>{this.state.numSelection} elements selected</label>
                        </div>
                        <div className='editOptions'>
                            <FaClone onClick={this.onDuplicate} />
                            <FaTrashAlt onClick={this.onDelete} />
                        </div>
                    </div>
                </div>
            )
        } else {
            // Quand le mode édition n'est pas ouvert, on affiche que le "bouton" d'ouverture
            (
                element =
                <div className='openEditBar'>
                    <div onClick={() => this.openEditBar(true)}>Open edition</div>
                </div>
            )
        }


        return (
            <div className='allEditBar'>
                {element}
            </div>
        );

    }
}
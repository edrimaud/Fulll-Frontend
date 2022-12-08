import '../styles/userCard.css';
import { Component } from "react";


export default class UserCard extends Component {
    // On ouvre le profil GitHub du user
    openProfile = (url) => {
        window.open(url, "_blank");
    }

    // On fait remonter au composant parent l'information qu'on a (dé)sélectionné le user
    onChangeSelection = (e) => {
        if (this.props.changeSelection) this.props.changeSelection(e.target.checked);
        this.setState();
    }

    render() {
        // A chaque render, on a besoin de s'assurer d'avoir ces 5 variables à jour
        this.state = {
            userId: this.props.user?.id ? this.props.user.id : "",
            userLogin: this.props.user?.login ? this.props.user.login : "",
            profileURL: this.props.user?.url ? this.props.user.url : "",
            avatarURL: this.props.user?.avatarURL ? this.props.user.avatarURL : "",
            isSelected: this.props.user.isSelected ? this.props.user.isSelected : false
        };

        // On n'affiche la checkbox que si le mode édition est ouvert
        var checkbox;
        if (this.props.editMode) {
            checkbox = <input type="checkbox" checked={this.state.isSelected} onChange={this.onChangeSelection} ></input>
        }

        return (
            <div className="card">
                <div className="checkbox">
                    { checkbox }
                </div>
                <div className="avatar">
                    <img src={this.state.avatarURL} alt={this.state.userLogin} />
                </div>
                <div>
                    <div>{this.state.userId}</div>
                    <div>{this.state.userLogin}</div>
                </div>
                <button type="button" onClick={() => this.openProfile(this.state.profileURL)}>
                    View profile
                </button>
            </div>
        )
    }
}
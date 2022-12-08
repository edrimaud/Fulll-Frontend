import '../styles/cardsContainer.css';
import { Component } from "react";

import UserCard from "./userCard.js";

export default class CardsContainer extends Component {

    changeSelection = (index, isSelected) => {
        if (this.props.changeSelection) this.props.changeSelection(index, isSelected);
    }

    render() {
        this.state = {
            listUsers: this.props.listUsers ? this.props.listUsers : [],
            numResults: this.props.numResults ? this.props.numResults : 0,
            editMode : this.props.editMode ? this.props.editMode : false
        };

        return (
                <div className="cardsContainer">
                    {this.state.listUsers.map((user, index) => (
                        <UserCard
                            key={"card" + index}
                            user={user}
                            editMode={this.state.editMode}
                            changeSelection={(isSelected) =>
                                this.changeSelection(index, isSelected)
                            }
                        />
                    ))}
                </div>
        );
    }
}
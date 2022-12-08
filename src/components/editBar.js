import '../styles/editBar.css';
import { Component } from "react";

import { FaTrashAlt, FaClone } from "react-icons/fa";

export default class EditBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayEdition: false,
        }
    }

    openEditBar = (bool) => {
        if (this.props.changeEditMode) this.props.changeEditMode(bool);
        this.setState({ displayEdition: bool });
    }

    selectAllUsers = (e) => {
        if (this.props.selectAllUsers) this.props.selectAllUsers(e.target.checked);
    }

    onDuplicate = () => {
        if (this.props.onDuplicate) this.props.onDuplicate();
    }

    onDelete = () => {
        if (this.props.onDelete) this.props.onDelete();
    }

    render() {
        this.state.numSelection = this.props.numSelection ? this.props.numSelection : 0;

        var element;

        if (this.state.displayEdition) {
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
import '../styles/searchInput.css';
import { Component } from "react";

import { getGitHubService } from "../App";

export default class SearchInput extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    changeSearch = (e) => {
        this.timeLastChange = new Date();

        setTimeout(() => {
            var now = new Date();
            if (now - this.timeLastChange > 1000) {
                var newSearch = e.target.value;
                this.searchUsers(newSearch);
            }
        }, 1000);
    }

    searchUsers = (searchWord) => {
        getGitHubService().getUsers(searchWord).then((res) => {
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
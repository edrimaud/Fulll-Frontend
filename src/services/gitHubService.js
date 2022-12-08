export default class GitHubService {
    constructor() {
        this.users = []
    }

    getUsers = (searchWord) => {
        if (!searchWord) {
            this.users = [];
            return new Promise ((resolve) => {resolve({
                users: [],
                numResults: 0
            })});
        }
        return fetch(`https://api.github.com/search/users?q=${searchWord}`)
        .then((response) => response.json())
        .then((jsonResponse) => {
            this.users = jsonResponse.items ? jsonResponse.items.map(function(resUser) {
                return {
                    id: resUser.id,
                    login: resUser.login,
                    avatarURL: resUser.avatar_url,
                    url: resUser.html_url,
                    isSelected: false
                };
            }) : [];
            return {
                users: this.users,
                numResults: jsonResponse.total_count
            }
        });
    }
}
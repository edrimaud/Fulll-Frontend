export default class GitHubService {
    constructor() {
        this.users = []
    }

    getUsers = (searchWord) => {
        // Si le mot clé n'est pas valide, on renvoie une liste vide
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
                return { // On ne récupère que les éléments qui nous intéressent
                    id: resUser.id,
                    login: resUser.login,
                    avatarURL: resUser.avatar_url,
                    url: resUser.html_url,
                    isSelected: false
                };
            }) : []; // Si le format de réponse n'est pas valide, on renvoie une liste vide
            return {
                users: this.users,
                numResults: jsonResponse.total_count // L'API ne renvoie que 30 users au maximum, donc on récupère le nombre total de user trouvé dans la base
            }
        });
    }
}
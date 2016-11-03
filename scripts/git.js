jQuery.githubUser = function(username, callback) {
    jQuery.getJSON('https://api.github.com/users/' + username + '/repos?callback=?', callback)
}

jQuery.fn.loadRepositories = function(username) {
    this.html("<span>Querying GitHub for " + username + "'s repositories...</span>");



    var target = this;
    $.githubUser(username, function(data) {
        var repos = data.data; // JSON Parsing
        sortByName(repos);

        var list = $('<div class="list"/>');
        target.empty().append(list);
        $(repos).each(function() {
            if (this.name != (username.toLowerCase() + '.github.com')) {
                var time = fixTime(this.updated_at);
                list.append('<div class="name"><b><a href="' + (this.homepage ? this.homepage : this.html_url) + '">' + this.name + '</a></b></div>');
                list.append('<div class="language"><em>' + (this.language ? ('(' + this.language + ')') : '') + '</em></div>');
                list.append('<div class="description">' + this.description + '</div>');
                list.append('<div class="update">' + time + '</div><div class="cls"></div>');
            }
        });
    });

    function fixTime(t) {
        return t.slice(0, -10);
    }

    function sortByName(repos) {
        repos.sort(function(a, b) {
            return a.name - b.name;
        });
    }
};
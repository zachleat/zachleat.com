---
title: Navigate directly to a GitHub Issue
tags:
  - note
note-tags:
  - Git
  - Command Line
---
At Filament Group when we do new feature or bug fix branch, our workflow is to create a new branch and name it using the GitHub issue number. A bug fix for Issue #3214 would be live in a branch named `3214` (e.g. `git branch -B 3214`).

Sometimes I’ll want a shortcut to navigate directly to this issue on the GitHub web site. I added this function to my `.zshrc` (`.bash_profile` if you bash) to do just that. Now I can type `ghissue` in my project’s terminal window and the issue will open in my web browser.

1. Find the current branch name (holds the issue number)
2. Finds the `origin` github repository (should work with `git:` or `https` urls). If you use another `remote` name, you’ll want to change this.
3. Pieces those two together to make the GitHub issue url.

```bash
function ghissue() {
    if [ -z "$1" ]
        then branch=$(git rev-parse --abbrev-ref HEAD)
    else
        branch="$1"
    fi

    repo=$(git remote get-url origin | sed 's/git@//' | sed 's/github.com:/github.com\//' | sed 's/\.git//')
    url="https://${repo}/issues/${branch}"
    open $url
}
```

### Usage

```
ghissue
```

Go directly to a specific issue (not the current branch name):

```
ghissue 3214
```

Very special thanks to [John Bender](http://johnbender.us/) who supplied the `repo` line.

Related via [Jeff Lembeck](https://twitter.com/jefflembeck): [Hub](https://github.com/github/hub) from GitHub, a command-line tool that makes git easier to use with GitHub.

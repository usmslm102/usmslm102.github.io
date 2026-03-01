---
title: "Git - Cheat Sheet"
description: "What is git? Git is a free and open source distributed version control system designed to..."
pubDate: "2019-12-10"
updatedDate: "2019-12-12"
---

##What is git?

> Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.

**Basic Commands:**

1. Initialize local git repository
       `> git init`

2. check files to commits and branch name
`> git status` 

3. add files to staging area.
`> git add FileName.txt` 

4. add all modified and new files to staging area
`> git add --all`

5. add all files of directory to staging area
`> git add folder/`

6. Commit changes to local repository
`> git commit -m "Message to commit"`

7. history of commits
`> git log` -- 

8. Get help for any command
`> git help <Command>`

9. set global user name
`> git config --global user.name "Name"`

10. Show un-staged differences since last commit
`> git diff` 

11. View staged differences
`> git diff --staged` 

12. Un-stage files and HEAD Refers to last commit
`> git reset HEAD FileName`

13. Blow away all changes since last commit
`> git checkout -- FileName`

14. SKIP STAGING AND COMMIT and Add changes from all tracked files. this Doesn’t add new (untracked) files
`> git commit -a -m "Modify readme"`

15. Reset into staging and Move to commit before ‘HEAD’
`> git reset --soft HEAD^` 

16. Add to the last commit with new commit message 
`> git commit --amend -m "New Message"`

17. Undo last commit and all changes
`> git reset --hard HEAD^`

18. Undo last 2 commits and all changes
`> git reset --hard HEAD^^`

19. ADDING A REMOTE
`> git remote add <name>origin <address>https://giturl` 

20. show remote repositories
`> git remote -v`

21. To push to remotes
`> git push -u <name>origin <branch>master` 

22. Remove remote
`> git remote rm <name>` 

23. Clone remote repository
`> git clone <address>https://giturl`

24. Create branch
`> git branch <BrancName>`  

25. create and checkout branch
`> git checkout -b <BrancName>`

26. list available branches
`> git branch`

27. list remote available branches
`> git branch -r` 

28. Switching between branches
`> git checkout <branch name>`

29. merge 2 branches
`> git merge <branch name>`

30. Delete branch
`> git branch -d <branch name>`

31. Force delete branch
`> git branch -D <branch name>`

32. get remote changes
`> git pull`

    > * get the remote changes to local remote branch
          `> git fetch`
   
    > * merge local remote branch changes to local master branch `> git merge <local branch>` 

33. shows branches alignments
`> git remote show origin`

34. remove remote branch
`> git push origin :<branch name>`
 
35. To clean up deleted remote branches
`> git remote prune origin`

36. List all tags
`> git tag`

37. Create tag
`> git tag -a <Tag Name> -m "Tag message"`

38. Push new tags to remote
`> git push --tags`

39. Revert to existing tag.
`> git checkout <tag name>`


This article was originally published at my blog [git-cheat-sheet](https://usamaansari.com/git-cheat-sheet-2/)

Please feel free to mention your favorite git commands in comments ❤ 👇

# README
[<img src="https://open.autocode.com/static/images/open.svg?" width="192">](https://open.autocode.com/)

This is a simple Discord bot which allows users to create and save bookmarks to messages.

## Functionality
The bot was created in and is currently hosted for free on Autocode - press the above button to see it there. Autocode provides a persistent dictionary which can fit 1024 entries as part of its utility library, which is where the bookmarks are stored with the mapping `user_id: [{bookmark1}, {bookmark2}, ...]`. Obviously this wouldn't work on a large scale but with only a single server and each user being limited to ten entries, it works just fine. As an additional note, if the bot ever does grow beyond a single server, the bot *does* create cross-server, cross-channel links; that is, if you have it installed on a private server you can click on a link to a message on another server and you'll be automatically transferred there.

## Create a bookmark
In contrast to most other bookmark bots out there, this one allows users to create a bookmark by accessing a message's context menu, and choosing `Apps` -> `Add bookmark`. This is especially useful because the bot is intended for a roleplaying server - I wanted to avoid slash commands and reactions cluttering up channels meant for purely RP.

## Commands
In contrast, manipulating and accessing the bookmarks is totally fine to happen within a channel explicitly for that purpose so I created the following commands:
* `/list`                - Lists all bookmarks associated with the user.
* `/rename <bookmark #>` - Allows users to change the title of a specific bookmark.
* `/delete <bookmark #>` - Allows users to delete a specific bookmark. Bookmark list resizes to account for the gap.
* `/clear`               - Deletes all bookmarks associated with the user.


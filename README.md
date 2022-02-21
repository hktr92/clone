# clone

this cli app helps you clone git repositories

## usage

cloning a repository (e.g. https://github.com/hktr92/clone):

    clone hktr92/clone

    # to clone from gitlab
    clone --from=gitlab hktr92/clone


this will clone with default settings:
- `prefer_ssh` set to `true`
- will use `ssh` if `clone config git.username` === `hktr92`
- `--from` is `github` or `gh`

to view a configuration value, use:

    clone config <key>

to set a config value, use:

    clone config <key> <value>

list of available config keys:
- `general.prefer_ssh`: boolean
- `general.default_from`: one of `github|gitlab|bitbucket` or `gh|gl|bb`
- `general.git_username`: string
- `from.<source>`: object of `{ domain: "example.com" }`


## contributing
you'll need `deno`, it can be downloaded from here: https://deno.land

the project is written in typescript, so ensure that you define types accordingly.

the main file is `mod.ts`, you can either run it:

    deno run mod.ts

or compile it:

    deno compile mod.ts clone


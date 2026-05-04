# Bowie Language Support for VS Code

VS Code extension for the [Bowie](https://github.com/bowie-lang/bowie) programming language (`.bow` files).

## Features

- **Syntax highlighting** — full grammar support for Bowie source files
- **Autocompletion** — built-in functions, keywords, and document-local identifiers
- **Hover docs** — signature and description for every built-in on hover
- **Signature help** — parameter hints while typing function calls
- **Snippets** — common patterns ready to expand
- **Strict formatter** — deterministic document formatting via VS Code's `Format Document`, configurable from `bowie.json > format`

## Snippets

| Prefix   | Description                  |
| -------- | ---------------------------- |
| `let`    | Variable declaration         |
| `fn`     | Named function               |
| `afn`    | Anonymous function           |
| `if`     | If statement                 |
| `ife`    | If-else statement            |
| `while`  | While loop                   |
| `for`    | For-in loop                  |
| `server` | HTTP server boilerplate      |
| `route`  | HTTP route handler           |
| `jres`   | JSON response hash           |
| `je`     | `json_encode`                |
| `jd`     | `json_decode`                |
| `pl`     | `println`                    |
| `env`    | Read env variable w/ default |
| `rf`     | Read file                    |
| `wf`     | Write file                   |
| `hash`   | Hash map literal             |
| `arr`    | Array literal                |
| `assert` | Assert expression            |

## Configuration

| Setting                  | Default   | Description                          |
| ------------------------ | --------- | ------------------------------------ |
| `bowie.interpreter.path` | `"bowie"` | Path to the Bowie interpreter binary |

## Installation

1. Clone the extension repository

```sh
git clone https://github.com/bowie-lang/vscode-extension
cd vscode-extension
```

2. Copy the extension to the VS Code extensions directory

```sh
cp -r vscode-extension ~/.vscode/extensions/bowie-lang.bowie-1.0.0
```

## Requirements

Install the Bowie interpreter and ensure it is on your `PATH` (or set `bowie.interpreter.path`).

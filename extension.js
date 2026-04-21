const vscode = require("vscode");

/* All built-in functions with their signatures and doc strings */
const BUILTINS = [
  /* I/O */
  {
    name: "print",
    sig: "print(...values)",
    doc: "Print values to stdout without a newline.",
  },
  {
    name: "println",
    sig: "println(...values)",
    doc: "Print values to stdout followed by a newline.",
  },
  {
    name: "eprint",
    sig: "eprint(...values)",
    doc: "Print values to stderr followed by a newline.",
  },
  {
    name: "printf",
    sig: "printf(fmt, ...values)",
    doc: "C-style formatted output to stdout (e.g. printf(\"x=%d\\n\", 42)).",
  },
  {
    name: "sprintf",
    sig: "sprintf(fmt, ...values)",
    doc: "C-style formatting; returns a string (e.g. sprintf(\"%s: %d\", \"n\", 7)).",
  },
  {
    name: "input",
    sig: "input(prompt?)",
    doc: "Read a line from stdin. Optional prompt is printed first.",
  },

  /* Type conversion */
  {
    name: "str",
    sig: "str(value)",
    doc: "Convert value to its string representation.",
  },
  { name: "int", sig: "int(value)", doc: "Convert value to integer." },
  { name: "float", sig: "float(value)", doc: "Convert value to float." },
  { name: "bool", sig: "bool(value)", doc: "Convert value to boolean." },
  {
    name: "type",
    sig: "type(value)",
    doc: "Return the type name of value as a string.",
  },
  {
    name: "is_null",
    sig: "is_null(value)",
    doc: "Return true if value is null.",
  },

  /* Collections */
  {
    name: "len",
    sig: "len(value)",
    doc: "Return the length of a string, array, or hash.",
  },
  {
    name: "push",
    sig: "push(array, value)",
    doc: "Append value to the end of array (mutates in place).",
  },
  {
    name: "pop",
    sig: "pop(array)",
    doc: "Remove and return the last element of array.",
  },
  {
    name: "keys",
    sig: "keys(hash)",
    doc: "Return an array of all keys in hash.",
  },
  {
    name: "values",
    sig: "values(hash)",
    doc: "Return an array of all values in hash.",
  },
  {
    name: "range",
    sig: "range(stop) | range(start, stop, step?)",
    doc: "Return an integer array [start..stop).",
  },
  {
    name: "slice",
    sig: "slice(array|string, start, end?)",
    doc: "Return a sub-array or substring from start to end.",
  },
  {
    name: "index_of",
    sig: "index_of(array|string, value)",
    doc: "Return the first index of value, or -1 if not found.",
  },
  {
    name: "lookup",
    sig: "lookup(value, key, expected)",
    doc: "Recursively look up key in nested values and return the first matching expected value or null.",
  },

  /* String */
  {
    name: "split",
    sig: "split(str, delimiter)",
    doc: "Split string by delimiter and return an array.",
  },
  {
    name: "join",
    sig: "join(array, delimiter)",
    doc: "Join array elements into a string with delimiter.",
  },
  {
    name: "trim",
    sig: "trim(str)",
    doc: "Remove leading and trailing whitespace.",
  },
  { name: "upper", sig: "upper(str)", doc: "Convert string to uppercase." },
  { name: "lower", sig: "lower(str)", doc: "Convert string to lowercase." },
  {
    name: "contains",
    sig: "contains(str|array, value)",
    doc: "Return true if str contains substring or array contains value.",
  },
  {
    name: "replace",
    sig: "replace(str, old, new)",
    doc: "Replace all occurrences of old with new in str.",
  },
  {
    name: "starts_with",
    sig: "starts_with(str, prefix)",
    doc: "Return true if str starts with prefix.",
  },
  {
    name: "ends_with",
    sig: "ends_with(str, suffix)",
    doc: "Return true if str ends with suffix.",
  },

  /* Math */
  {
    name: "floor",
    sig: "floor(n)",
    doc: "Return the largest integer less than or equal to n.",
  },
  {
    name: "ceil",
    sig: "ceil(n)",
    doc: "Return the smallest integer greater than or equal to n.",
  },
  { name: "abs", sig: "abs(n)", doc: "Return the absolute value of n." },
  { name: "sqrt", sig: "sqrt(n)", doc: "Return the square root of n." },
  {
    name: "pow",
    sig: "pow(base, exp)",
    doc: "Return base raised to the power exp.",
  },
  {
    name: "max",
    sig: "max(a, b) | max(array)",
    doc: "Return the larger of two values, or the maximum of an array.",
  },
  {
    name: "min",
    sig: "min(a, b) | min(array)",
    doc: "Return the smaller of two values, or the minimum of an array.",
  },

  /* Environment */
  {
    name: "env",
    sig: "env(key)",
    doc: "Get environment variable by key. Returns null if not set.",
  },
  {
    name: "env_or",
    sig: "env_or(key, default)",
    doc: "Get environment variable, falling back to default.",
  },

  /* File I/O */
  {
    name: "read_file",
    sig: "read_file(path)",
    doc: "Read entire file as a string.",
  },
  {
    name: "write_file",
    sig: "write_file(path, content)",
    doc: "Write string to file, overwriting existing content.",
  },
  {
    name: "append_file",
    sig: "append_file(path, content)",
    doc: "Append string to file.",
  },

  /* JSON */
  {
    name: "json_encode",
    sig: "json_encode(value, pretty?)",
    doc: "Encode value to a JSON string. Pass true for pretty printing.",
  },
  {
    name: "json_decode",
    sig: "json_decode(str)",
    doc: "Decode a JSON string into a Bowie value.",
  },

  /* HTTP */
  {
    name: "fetch",
    sig: "fetch(url, options?)",
    doc: "Perform an HTTP request. options may include method, headers, and body.",
  },
  {
    name: "create_server",
    sig: "create_server(port, on_listen?)",
    doc: "Create a new HTTP server on the given port. Optional on_listen is called once when listening (like Express app.listen); if omitted, a default message is printed.",
  },
  {
    name: "route",
    sig: "route(server, method, path, handler)",
    doc: "Register a route handler.\nHandler: fn(req) → {status, body, headers?}",
  },
  {
    name: "serve",
    sig: "serve(server)",
    doc: "Start the HTTP server event loop (blocking).",
  },

  /* Misc */
  {
    name: "assert",
    sig: "assert(condition, message?)",
    doc: "Abort with an error if condition is falsy.",
  },
  {
    name: "exit",
    sig: "exit(code?)",
    doc: "Exit the process with the given code (default 0).",
  },
];

const KEYWORDS = [
  "let",
  "const",
  "fn",
  "return",
  "if",
  "else",
  "while",
  "for",
  "in",
  "import",
  "export",
  "as",
  "use",
  "break",
  "continue",
  "async",
  "await",
  "try",
  "catch",
  "finally",
  "throw",
  "true",
  "false",
  "null",
];

/* Build a set of word completions from the current document */
function wordCompletions(document, position) {
  const text = document.getText();
  const words = new Set(text.match(/\b[a-zA-Z_][a-zA-Z0-9_]*\b/g) || []);
  const curWord = document.getText(document.getWordRangeAtPosition(position));
  words.delete(curWord);

  return Array.from(words)
    .filter((w) => !KEYWORDS.includes(w) && !BUILTINS.some((b) => b.name === w))
    .map((w) => {
      const item = new vscode.CompletionItem(
        w,
        vscode.CompletionItemKind.Variable,
      );
      item.sortText = "9" + w; /* sort after builtins */
      return item;
    });
}

function activate(context) {
  /* ---- Completion provider ---- */
  const completionProvider = vscode.languages.registerCompletionItemProvider(
    "bowie",
    {
      provideCompletionItems(document, position) {
        const items = [];

        /* Built-in functions */
        for (const b of BUILTINS) {
          const item = new vscode.CompletionItem(
            b.name,
            vscode.CompletionItemKind.Function,
          );
          item.detail = b.sig;
          item.documentation = new vscode.MarkdownString(
            "```\n" + b.sig + "\n```\n\n" + b.doc,
          );
          item.insertText = new vscode.SnippetString(b.name + "($0)");
          item.sortText = "1" + b.name;
          items.push(item);
        }

        /* Keywords */
        for (const kw of KEYWORDS) {
          const item = new vscode.CompletionItem(
            kw,
            vscode.CompletionItemKind.Keyword,
          );
          item.sortText = "2" + kw;
          items.push(item);
        }

        /* Document words */
        items.push(...wordCompletions(document, position));

        return items;
      },
    },
    /* trigger characters */
  );

  /* ---- Hover provider — show signature on hover over a builtin ---- */
  const hoverProvider = vscode.languages.registerHoverProvider("bowie", {
    provideHover(document, position) {
      const range = document.getWordRangeAtPosition(position);
      if (!range) return null;
      const word = document.getText(range);
      const builtin = BUILTINS.find((b) => b.name === word);
      if (!builtin) return null;
      const md = new vscode.MarkdownString();
      md.appendCodeblock(builtin.sig, "bowie");
      md.appendMarkdown("\n" + builtin.doc);
      return new vscode.Hover(md, range);
    },
  });

  /* ---- Signature help — show param hints inside () ---- */
  const sigHelpProvider = vscode.languages.registerSignatureHelpProvider(
    "bowie",
    {
      provideSignatureHelp(document, position) {
        /* Walk backwards to find the function name before '(' */
        const lineText = document.lineAt(position).text;
        const before = lineText.substring(0, position.character);
        const match = before.match(/([a-zA-Z_][a-zA-Z0-9_]*)\s*\([^)]*$/);
        if (!match) return null;

        const fnName = match[1];
        const builtin = BUILTINS.find((b) => b.name === fnName);
        if (!builtin) return null;

        /* Count commas to determine active parameter */
        const argsStr = before.slice(before.lastIndexOf("(") + 1);
        const activeParam = (argsStr.match(/,/g) || []).length;

        /* Extract parameter labels from signature */
        const sigMatch = builtin.sig.match(/\(([^)]*)\)/);
        const paramStrs = sigMatch
          ? sigMatch[1].split(",").map((p) => p.trim())
          : [];

        const sig = new vscode.SignatureInformation(
          builtin.sig,
          new vscode.MarkdownString(builtin.doc),
        );
        sig.parameters = paramStrs.map(
          (p) => new vscode.ParameterInformation(p),
        );

        const help = new vscode.SignatureHelp();
        help.signatures = [sig];
        help.activeSignature = 0;
        help.activeParameter = Math.min(activeParam, paramStrs.length - 1);
        return help;
      },
    },
    "(",
    ",",
  );

  context.subscriptions.push(
    completionProvider,
    hoverProvider,
    sigHelpProvider,
  );
}

function deactivate() {}

module.exports = { activate, deactivate };

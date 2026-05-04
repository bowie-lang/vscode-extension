#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage: ./install.sh [--cursor] [--vscode]

Installs the Bowie extension for selected editors.

Options:
  --cursor   Install to Cursor extensions directory
  --vscode   Install to VS Code extensions directory
  -h, --help Show this help message

Examples:
  ./install.sh --vscode
  ./install.sh --cursor --vscode
EOF
}

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
EXTENSION_ID="bowie-lang.bowie-1.0.0"
INSTALL_CURSOR=false
INSTALL_VSCODE=false

while [[ $# -gt 0 ]]; do
  case "$1" in
    --cursor)
      INSTALL_CURSOR=true
      ;;
    --vscode)
      INSTALL_VSCODE=true
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown option: $1"
      echo
      usage
      exit 1
      ;;
  esac
  shift
done

if [[ "$INSTALL_CURSOR" == false && "$INSTALL_VSCODE" == false ]]; then
  echo "Please provide at least one target: --cursor and/or --vscode"
  echo
  usage
  exit 1
fi

install_to_target() {
  local target_base="$1"
  local target_path="${target_base}/${EXTENSION_ID}"

  mkdir -p "$target_base"
  rm -rf "$target_path"
  cp -R "$SCRIPT_DIR" "$target_path"
  rm -f "${target_path}/install.sh"

  echo "Installed to: $target_path"
}

if [[ "$INSTALL_VSCODE" == true ]]; then
  install_to_target "$HOME/.vscode/extensions"
fi

if [[ "$INSTALL_CURSOR" == true ]]; then
  install_to_target "$HOME/.cursor/extensions"
fi

echo "Done."

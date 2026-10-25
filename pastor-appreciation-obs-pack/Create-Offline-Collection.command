#!/bin/zsh
set -e
cd -- "${0:A:h}"
/usr/bin/env python3 make-offline-collection.py
read -r '?Press Return to close.'

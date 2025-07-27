#!/bin/bash

# Script to copy canvas apps efficiently without reading content
SOURCE_DIR="/home/varaprad/cc-linux/Canvas Apps"
DEST_DIR="canvas-apps"

echo "Copying canvas apps from '$SOURCE_DIR' to '$DEST_DIR'..."

# Copy all .md files from Canvas Apps directory
if [ -d "$SOURCE_DIR" ]; then
    find "$SOURCE_DIR" -name "*.md" -exec cp {} "$DEST_DIR/" \;
    echo "✓ Copied all canvas apps"
    
    # Show what was copied
    echo "Files copied:"
    ls -1 "$DEST_DIR/"
else
    echo "❌ Source directory not found: $SOURCE_DIR"
fi
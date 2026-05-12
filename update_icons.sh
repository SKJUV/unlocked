#!/bin/bash

ICON_SOURCE="/home/skjuve/.gemini/antigravity/brain/fa1eb8fd-fa50-4c26-b484-0c819cea8fb1/unlocked_app_icon_1778603755460.png"
RES_DIR="/home/skjuve/Téléchargements/dev202/unlocked/android/app/src/main/res"

# Define sizes
declare -A SIZES
SIZES["mipmap-mdpi"]=48
SIZES["mipmap-hdpi"]=72
SIZES["mipmap-xhdpi"]=96
SIZES["mipmap-xxhdpi"]=144
SIZES["mipmap-xxxhdpi"]=192

for DIR in "${!SIZES[@]}"; do
    SIZE=${SIZES[$DIR]}
    echo "Processing $DIR ($SIZE x $SIZE)..."
    magick "$ICON_SOURCE" -resize "${SIZE}x${SIZE}" "$RES_DIR/$DIR/ic_launcher.png"
    magick "$ICON_SOURCE" -resize "${SIZE}x${SIZE}" "$RES_DIR/$DIR/ic_launcher_round.png"
done

echo "App icons updated successfully!"

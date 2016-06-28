# responsive-images
A native JavaScript function for responsive images.

## What it does
1. The script targets all images with a `data-src` attribute.
2. The `data-src` attribute contains the image's src e.g. `http://www.example.com/images/img.jpg`.
3. The script calculates the image's width, by checking the image's width and then its parent's width, and rounds the value up the nearest match from a sizes array e.g. `[100, 300, 600, 900, 1200, 1600, 1800]`.
4. It then updates the image's src to include a sub-directory using the matched size e.g. `http://www.example.com/images/300x/img.jpg`.

## Installation
1. Paste the minified version of the script before the `</body>` element.

## Requirements
1. The script does not create the resizes, each image's resizes must be created beforehand and placed within the relevant size directories.

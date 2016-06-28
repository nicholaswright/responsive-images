/**
 * responsiveImages [c]2016, @n_cholas, OmCore Ltd. MIT/GPL
 *
 * https://github.com/nicholaswright/responsive-images.git
 */
(function responsiveImages() {

    var that = this,
        sizes = [100, 300, 600, 900, 1200, 1600, 1800],
        largestSize = 1800,
        
        // This attributed is populated with the image's existing widths. e.g. "50 70 90" It allows 
        // JavaScript to know if the required size for the image has been generated or not. If it 
        // has then it can update the image's src to target the file. If not then the image's src 
        // must target a script to generate the new size.
        responsiveAttr = 'data-src',
        responsiveImages = [];
    
    var setResponsiveImages = function() {
        responsiveImages = [];
        var images = document.getElementsByTagName('img');
        for (var a = 0; a < images.length; a++) {
            var image = images[a];
            
            // Only target images with the responsive sizes attribute
            var src = image.getAttribute(responsiveAttr);
            if (typeof src == 'string') {
                responsiveImages.push(image);
            }
        }
    }
    
    var replaceImages = function() {
        for (var a = 0; a < responsiveImages.length; a++) {
            
            var image = responsiveImages[a],
                src = image.getAttribute(responsiveAttr),
                newSrc = false,
                closestWidth = largestSize,
                imgWidth = 0;
                
            // Check if the element has a width attribute.
            var w = image.getAttribute('width');
            if (w) {
                imgWidth = parseInt(w);
            }
            
            // Loop through the element's ancestors, getting the width of the first with a width.
            // This caters for images within inline elements. For example, take <div><a><img>, the 
            // <a> element has no width, but <div> does.
            var parent = image;
            while (!imgWidth) {
                parent = parent.parentElement;
                if (parent) {
                    imgWidth = parent.clientWidth;
                } else {
                    break;
                }
            }
            
            // Findest the nearest size 
            if (imgWidth) {
                for (var i = 0; i < sizes.length; i++) {
                    var size = sizes[i];
                    if (imgWidth > size) {
                        continue;
                    } else {
                        closestWidth = size;
                        break;
                    }
                }
            }
            
            // If the image's full size has been detected as zero it's likely that
            // the image isn't visible, such as an image in a hidden carousel slide.
            if (
                closestWidth == 0
                && image.offsetParent === null // Double checks that the image isn't visible.
            ) {
                // do nothing
                
            } else {
                var array = src.split('/'),
                    fileName = array.pop();
                    
                array.push(closestWidth + 'x');
                array.push(fileName);
                newSrc = array.join('/');
                
                // Prevents additional calls to responsiveImages from multiple applications
                image.removeAttribute(responsiveAttr);
                image.removeAttribute('style'); // Removes top padding
                image.setAttribute('src', newSrc);
                
                // Remove width & height attributes
                if (image.style.width) {
                    image.style.width = '';
                }
                if (image.style.height) {
                    image.style.height = '';
                }
            }
        }
    }
    
    setResponsiveImages();
    replaceImages();
    
    // Images aren't replaced by replaceImage if (image.offsetParent === null) which is the case for
    // some images such as those in hidden slides on a carousel. Running the script in an interval
    // will replace the images the moment they become visible.  
    var interval = setInterval(function() {
        setResponsiveImages();
        // Finish the interval once all responsive images have been replaced.
        if (!responsiveImages.length) {
            clearInterval(interval);
        } else {
            replaceImages();
        }
    }, 500);
    
})();
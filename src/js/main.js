// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import Alert from 'bootstrap/js/dist/alert'

// or, specify which plugins you need:
import { Tooltip, Toast, Popover } from 'bootstrap'







$(document).ready(function() {
    var images = []; // Array of uploaded images

     //Delete image
     function deleteImage(index) {
        images.splice(index, 1);
        renderImages();
    }

    
    function renderImages() {
        var container = document.getElementById('image-container');
        container.innerHTML = ''; // clean the container
    
        images.forEach(function(image, index) {
            var div = document.createElement('div');
            var img = document.createElement('img');
            var button = document.createElement('button');
            var icon = document.createElement('i');
    
            img.src = image;
            img.style.width = '100px';
            img.style.height = '100px';
    
            icon.classList.add('bi', 'bi-trash3');
    
            button.appendChild(icon);
            button.onclick = function() {
                deleteImage(index);
            };
    
            div.appendChild(img);
            div.appendChild(button);
    
            container.appendChild(div);
        });
    }
    


  
    //Add image function
    function addImage(inputFile) {
        if (inputFile.files && inputFile.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                images.push(e.target.result);
                renderImages();
            };
            reader.readAsDataURL(inputFile.files[0]);
        }
    }



    // Event handler for input file change
    $("#file-1").change(function(evt) {
        addImage(this);
    });

 
    // Generate PDF with all images
    $('#test').click(function() {
        var pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        var imgWidth = 210; //Image width in mm (A4 size)

        // Function to add image to PDF
        function addImageToPDF(index) {
            var img = new Image();
            img.onload = function() {
                var imgHeight = img.height * imgWidth / img.width; // Calculate proportional height
                pdf.addImage(images[index], 'JPEG', 0, 0, imgWidth, imgHeight);

                // If it's not the last image, add a new page for the next one
                if (index < images.length - 1) {
                    pdf.addPage();
                    addImageToPDF(index + 1); // Call recursively to add next image
                } else {
                    pdf.save('screenshot.pdf'); // Save the PDF after adding all the images
                }
            };
            img.crossOrigin = "Anonymous"; // Allow cross-domain image access
            img.src = images[index];
        }

        // Start the process by adding the first image
        if (images.length > 0) {
            addImageToPDF(0);
        }
    });
});

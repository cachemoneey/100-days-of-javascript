(function (){
    var preTag = document.getElementById("donut")

    // Angles, Radius and Contants
    var A =  1
    var B = 1

    var R1 = 1
    var R2 = 2

    var K1 = 150
    var K2 = 5

    // Function to render ASCII frame
    function renderAsciiFrame(){
        var b = [] // Array to stay acii chars
        var z = [] // Array to store depth values

        var width = 280 // width of frame
        var height = 160 // height of frame

        A += 0.07 // Increment angle a
        B += 0.03 // Increment angle b

        // sin and cosine of angles
        var cA = Math.cos(A)
        var sA = Math.sin(A)
        var cB = Math.cos(B)
        var sB = Math.sin(B)

        // Initialize arrays with default angles
        for(var k = 0; k < width * height; k++){
            // Set default ascii char
            b[k] = k % width == width - 1 ? '\n' : ' ';
            // Set default depth
            z[k] = 0
        }

        // Generate the ascii frame
        for(var j = 0; j < 6.28; j += 0.07){
            var ct = Math.cos(j) // cosine of j
            var st = Math.sin(j) // sin of j

            for(var i = 0; i < 6.28; i += 0.02){
                var sp = Math.sin(i); // sin of i
                var cp = Math.cos(i) // cosine of i

                var h = ct + 2 // height calculation
                var D = 1 / (sp * h * sA + st * cA + 5) // distance calculation
                var t = sp * h * cA - st * sA; // temporary calculation

                 // Calculate cordinates of ascii char
                 var x = Math.floor(width / 2 + (width / 4) * D * (cp * h * cB - t * sB));
                 var y = Math.floor(height / 2 + (height / 4) * D * (cp * h * sB + t * cB));

                // Calculate the index in the array
                var o = x + width * y
                // Calculate the ascii char index
                var N = Math.floor(8 * ((st * sA - sp * ct * cA) * cB - sp * ct * sA - st * cA - cp * ct * sB))

                // Update ascii char and depth if conditions are met
                if(y < height && y >= 0 && x >= 0 && x < width && D > z[o]){
                    z[o] = D
                    // Update ascii char based on the index
                    b[o] = '.,-~:;=!*#$@'[N > 0 ? N : 0];
                }
            }
        }

        // Update html element with the ascii frame
        preTag.innerHTML = b.join('')
    } 

    function startAsciiAnimation(){
        window.asciiIntervalId = setInterval(renderAsciiFrame, 50)
    }
    
    renderAsciiFrame()
    
    if(document.all){
        window.attachEvent("onload", startAsciiAnimation)
    } else {
        window.addEventListener("load", startAsciiAnimation, false)
    }
    
    window.addEventListener("resize", renderAsciiFrame)
})()

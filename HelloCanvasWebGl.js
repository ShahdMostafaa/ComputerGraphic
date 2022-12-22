function main()
{
    var canvas = document.getElementById ('Webgl');
    var gl = getWebGLContext(canvas);
    //var gl = canvas.getContext('Webgl'); Fail to render
    if(!gl)
    {
        console.log('Fail to render');
        return;
    } 
    gl.clearColor(0.75, 0.0, 0.25, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}

// HelloCanvas.js (c) 2012 matsuda
// function main() {
//     // Retrieve <canvas> element
//     var canvas = document.getElementById('Webgl');
  
//     // Get the rendering context for WebGL
//     var gl = getWebGLContext(canvas);
//     if (!gl) {
//       console.log('Failed to get the rendering context for WebGL');
//       return;
//     }
  
//     // Set clear color
//     gl.clearColor(0.0, 0.0, 0.0, 1.0);
  
//     // Clear <canvas>
//     gl.clear(gl.COLOR_BUFFER_BIT);
//   }
  
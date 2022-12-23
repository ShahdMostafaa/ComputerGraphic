var VSHADER_SOURCE = `
attribute vec4 a_position;
void main()
{
    gl_Position = a_position;
    gl_PointSize = 10.0;
}`;

var FSHADER_SOURCE = `
void main()
{
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}`;



// var VSHADER_SOURCE =
//   'attribute vec4 a_position;\n' +
//   'void main() {\n' +
//   '  gl_Position = a_position;\n' +
//   '  gl_PointSize = 10.0;\n' +
//   '}\n';

// // Fragment shader program
// var FSHADER_SOURCE =
//   'void main() {\n' +
//   '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
//   '}\n';

function main()
{
    var canvas = document.getElementById('Webgl');
    var gl = getWebGLContext (canvas);
        if (!gl)
        {
            console.log('fail to render');
        }

    if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE))
    {
        console.log('fail to initialize');
        return;
    }

    var position = gl.getAttribLocation(gl.program , 'a_position');
    if(position < 0) { 
        console.log('NotFound');
        return;
    }

    canvas.onmousedown = function(ev) {click(ev, gl, canvas, position);};

    gl.clearColor(0.25, 0.0, 0.75, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

//     canvas.onmousedown = function(ev){ click(ev, gl, canvas, position); };

//   // Specify the color for clearing <canvas>
//   gl.clearColor(0.0, 0.0, 0.0, 1.0);

//   // Clear <canvas>
//   gl.clear(gl.COLOR_BUFFER_BIT);
}

var gpoints = [];
function click(ev , gl , canvas , position)
{
    var x = ev.clientX;
    var y = ev.clientY;
    var rect = ev.target.getBoundingClientRect();
    x = ((x-rect.left) - canvas.width/2)/(canvas.width/2);
    y = (canvas.height/2 - (y-rect.top))/(canvas.height/2);

    // var x = ev.clientX; // x coordinate of a mouse pointer
    // var y = ev.clientY; // y coordinate of a mouse pointer
    // var rect = ev.target.getBoundingClientRect() ;
  
    // x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
    // y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

    gpoints.push(x);
    gpoints.push(y);
    gl.clear(gl.COLOR_BUFFER_BIT);

    var len = gpoints.length;
    for(var i = 0 ; i < len ; i+=2)
    {
        gl.vertexAttrib3f(position , gpoints[i], gpoints[i+1] ,0.0);
        gl.drawArrays(gl.POINTS ,0 ,1);
    }
}
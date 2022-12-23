// give position and size to a point 
var VSHADER_SOURCE = `
attribute vec4 a_position;
void main(){
    gl_Position = a_position;
    gl_PointSize = 10.0;
}`;
// give point a color
var FSHADER_SOURCE = `
void main(){
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}`;

function main()
{
    var canvas = document.getElementById('Webgl');
    var gl = getWebGLContext (canvas);
    if (!initShaders(gl, VSHADER_SOURCE,FSHADER_SOURCE))
    {
        console.log('fail to initialize');
        return;
    }

    var position = gl.getAttribLocation(gl.program , 'a_position');
    if(position < 0) { 
        console.log('NotFound');
        return;
    }

    gl.vertexAttrib3f(position, 0.0, 0.0, 0.0);

    gl.clearColor(0.25, 0.0, 0.75, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.points, 0 , 1);
}
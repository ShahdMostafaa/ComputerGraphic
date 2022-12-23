var VSHADER_SOURCE = `
attribute vec4 a_position;
attribute vec4 a_color;
varying vec4 v_Color;
void main()
{
    gl_Position = a_position;
    gl_PointSize = 10.0;
    v_Color = a_color;
}`;

var FSHADER_SOURCE = `
precision mediump float;
varying vec4 v_Color;
void main()
{
    gl_FragColor = v_Color;
}`;

function main()
{
    var canvas = document.getElementById('Webgl');
    if (!canvas) {
        console.log('Failed to get the get context for WebGL');
        return;
    }
    var gl = getWebGLContext(canvas);
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }
    if(!initShaders(gl , VSHADER_SOURCE , FSHADER_SOURCE )) {
        console.log('Failed to intialize shaders.');
        return;
    };
    var n = initVertexBuffers(gl);
    gl.clearColor(0.75, 0.0, 0.75, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.Points, 0 , n);
}

function initVertexBuffers(gl)
{
    var verticesColors = new Float32Array([
        -0.5,-0.5,    1.0,1.0,0.0,
        0.0,0.5,      0.0,1.0,1.0,
        0.5,-0.5,     1.0,1.0,1.0
    ]);

    var n = 3;

    var vertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER , vertexColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER , verticesColors, gl.STATIC_DRAW);

    var FSIZE = verticesColors.BYTES_PER_ELEMENT;

    var position = gl.getAttribLocation(gl.program , 'a_position');
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, FSIZE*5, 0);
    gl.enableVertexAttribArray(position);

    var color = gl.getAttribLocation(gl.program , 'a_color');
    gl.vertexAttribPointer(color, 3 , gl.FLOAT , false , FSIZE*5 , FSIZE*2);
    gl.enableVertexAttribArray(color);

    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    return n ;
}
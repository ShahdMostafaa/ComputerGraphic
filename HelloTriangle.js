var VSHADER_SOURCE = `
attribute vec4 a_position;
void main()
{
    gl_Position = a_position;
}`;

var FSHADER_SOURCE = `
void main()
{
    gl_FragColor = vec4(0.0,1.0,1.0,1.0);
}`;

function main()
{
    var canvas = document.getElementById('Webgl');
    var gl = getWebGLContext(canvas);
    if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE))
    {
        return;
    }
    var n = initVertexBuffers(gl);
    gl.clearColor(0.75, 0.0, 0.75, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES , 0 , n);
}

function initVertexBuffers(gl)
{
    var vertices = new Float32Array([
        -0.5,-0.5,  0.0,0.5,   0.5,-0.5
    ]);
    var n = 3;
    
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices , gl.STATIC_DRAW);
    var position = gl.getAttribLocation(gl.program , 'a_position');
    gl.vertexAttribPointer(position , 2 , gl.FLOAT , false , 0 , 0 );
    gl.enableVertexAttribArray(position);
    return n;
}
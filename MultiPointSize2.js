var VSHADER_SOURCE = `
attribute vec4 a_position;
attribute float a_pointsize;
void main()
{
    gl_Position = a_position;
    gl_PointSize = a_pointsize;
}`;

var FSHADER_SOURCE = `
void main()
{
    gl_FragColor = vec4(0.75, 0.0, 0.75, 1.0);
}`;

function main()
{
    var canvas = document.getElementById('Webgl');
    var gl = getWebGLContext(canvas);
    if(!initShaders(gl , VSHADER_SOURCE , FSHADER_SOURCE)) return;
    var n = initVertexBuffers(gl);
    if (n < 0) {
        console.log('Failed to set the positions of the vertices');
        return;
    }

    gl.clearColor(0.0,1.0,1.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.Pionts, 0 , n);
}

function initVertexBuffers(gl)
{
    var verticesSizes = new Float32Array([
        -0.5,-0.5,10.0,
        0.0,0.5,20.0,
        0.5,-0.5,30.0
    ]);
    
    var n = 3;

    var vertexSizeBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER , vertexSizeBuffer);
    gl.bufferData(gl.ARRAY_BUFFER , verticesSizes , gl.STATIC_DRAW);

    var Fsize = verticesSizes.BYTES_PER_ELEMENT;

    var position = gl.getAttribLocation(gl.program , 'a_position');
    gl.vertexAttribPointer(position , 2 , gl.FLOAT ,false, Fsize*3 , 0 );
    gl.enableVertexAttribArray(position);

    var size = gl.getAttribLocation(gl.program , 'a_pointsize');
    gl.vertexAttribPointer(size , 1 , gl.FLOAT ,false, Fsize*3 , Fsize*2);
    gl.enableVertexAttribArray(size);

    //gl.bindBuffer(gl.ARRAY_BUFFER , null);
    return n ;
}
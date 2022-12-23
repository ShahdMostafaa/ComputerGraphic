var VSHADER_SOURCE = `
attribute vec4 a_position;
attribute float a_pointsize;
void main(){
    gl_Position = a_position;
    gl_PointSize = a_pointsize;
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
    if (!initShaders(gl , VSHADER_SOURCE ,FSHADER_SOURCE)) {
        console.log('Failed to intialize shaders.');
        return;
    };
    
    var n = initVertexBuffers(gl);
    if (n < 0) {
        console.log('Failed to set the positions of the vertices');
        return;
    }

    gl.clearColor(0.75, 0.0, 0.75, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.Points , 0 , n);
}

function initVertexBuffers(gl)
{
    var vertices = new Float32Array([
        -0.5,-0.5,  0.0,0.5,   0.5,-0.5
    ]);

    var n = 3;

    var sizes = new Float32Array([
        10.0 , 30.0 , 20.0
    ]);

    var vertexBuffer = gl.createBuffer();
    var sizeBuffer = gl.createBuffer();

    // bind, set data, assign and enable these steps mustn't be seperated 
    gl.bindBuffer(gl.ARRAY_BUFFER , vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    var position = gl.getAttribLocation(gl.program , 'a_position');
    if(position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return -1;
    }
    gl.vertexAttribPointer(position , 2 , gl.FLOAT , false , 0 , 0);
    gl.enableVertexAttribArray(position);
    
    gl.bindBuffer(gl.ARRAY_BUFFER , sizeBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, sizes , gl.STATIC_DRAW);
    var pointsize = gl.getAttribLocation(gl.program , 'a_pointsize');
    if(pointsize < 0) {
        console.log('Failed to get the storage location of a_PointSize');
        return -1;
    }
    gl.vertexAttribPointer(pointsize , 1 , gl.FLOAT , false , 0 , 0);
    gl.enableVertexAttribArray(pointsize);

    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    return n ;
}
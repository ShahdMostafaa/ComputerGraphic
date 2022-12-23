var VSHADER_SOURCE = `
attribute vec4 a_position;
uniform mat4 u_matrix;
void main()
{
    gl_Position = u_matrix * a_position ;
}`;

var FSHADER_SOURCE = `
void main()
{
    gl_FragColor = vec4(0.0,1.0,1.0,1.0);
}`;

var angle = 90.0; 

function main()
{
    var canvas = document.getElementById('Webgl');
    var gl = getWebGLContext(canvas);
    if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE))
    {
        return;
    }
    var n = initVertexBuffers(gl);

    var radian = Math.PI * angle/180;
    var cB = Math.cos(radian); 
    var sB = Math.sin(radian);
    
    var rotatematrix = new Float32Array([
        cB , sB , 0.0 , 0.0 ,
       -sB , cB , 0.0 , 0.0 ,
        0.0 , 0.0 , 1.0 , 0.0 , 
        0.0 , 0.0 , 0.0 ,1.0
    ]);

    var matrix = gl.getUniformLocation(gl.program , 'u_matrix');
    if (!matrix) {
        console.log('Failed to get the storage location of u_xformMatrix');
        return;
      }
    gl.uniformMatrix4fv(matrix , false , rotatematrix);

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
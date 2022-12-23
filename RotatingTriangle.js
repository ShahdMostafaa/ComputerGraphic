var VSHADER_SOURCE = `
attribute vec4 a_position;
uniform mat4 u_xformMatrix;
void main()
{
    gl_Position = u_xformMatrix * a_position ; 
}`;

var FSHADER_SOURCE = `
void main()
{
    gl_FragColor = vec4(0.0,1.0,1.0,1.0);
}`;

var angleStep = 45.0;

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
    var matrix = gl.getUniformLocation(gl.program , 'u_xformMatrix');
    
    var currentAngle = 0.0;
    var modelMatrix = new Matrix4();

    var tick = function (){
        currentAngle = animate(currentAngle);
        draw (gl , n , currentAngle , modelMatrix , matrix);
        requestAnimationFrame(tick , canvas);
    };
    tick();
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

function draw (gl , n , currentAngle , modelMatrix , matrix)
{
    modelMatrix.setRotate(currentAngle, 0 , 0 , 1);
    gl.uniformMatrix4fv(matrix , false , modelMatrix.elements);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES , 0 , n);
}

var glast = Date.now();
function animate (angle)
{
    var now = Date.now();
    var elapsed = now-glast;
    glast = now ; 
    var newAngle = angle + (angleStep*elapsed)/1000.0;
    return newAngle %=360;
}
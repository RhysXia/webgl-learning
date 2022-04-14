import { createProgram, createShader } from '../utils/webgl';

export default (gl: WebGLRenderingContext) => {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  const VERTEX_SHADER = `
  attribute vec4 a_Position;
  uniform mat4 u_TransformMatrix;
  void main() {
    gl_Position = u_TransformMatrix * a_Position;
    gl_PointSize = 10.0;
  }
  `;

  const FRAGMENT_SHADER = `
  void main() {
    gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
  }
  `;

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);

  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);

  const program = createProgram(gl, vertexShader, fragmentShader);

  gl.useProgram(program);

  const positionBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  const positions = new Float32Array([-0.5, -0.5, 0.5, -0.5, -0.5, 0.5]);

  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

  const aPosition = gl.getAttribLocation(program, 'a_Position');

  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

  gl.enableVertexAttribArray(aPosition);

  const radian = (Math.PI * 30) / 180;

  const cosB = Math.cos(radian);
  const sinB = Math.sin(radian);

 
  const uTransformMatrix = new Float32Array([
    cosB, sinB, 0.0, 0.0,
    -sinB, cosB, 0.0, 0.0, 
    0.0, 0.0, 1.0, 0.0, 
    0.0, 0.0, 0.0, 1.0 
  ])

  const uTransformMatrixLoc = gl.getUniformLocation(program, 'u_TransformMatrix');

  gl.uniformMatrix4fv(uTransformMatrixLoc, false, uTransformMatrix);

  gl.drawArrays(gl.TRIANGLES, 0, 3);
};

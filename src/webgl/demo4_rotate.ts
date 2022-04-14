import { createProgram, createShader } from '../utils/webgl';

export default (gl: WebGLRenderingContext) => {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  const VERTEX_SHADER = `
  attribute vec4 a_Position;
  uniform float u_CosB, u_SinB;
  void main() {
    gl_Position.x = a_Position.x * u_CosB - a_Position.y * u_SinB;
    gl_Position.y = a_Position.x * u_SinB + a_Position.y * u_CosB;
    gl_Position.z = a_Position.z;
    gl_Position.w = 1.0;
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

  const radian = (Math.PI * 60) / 180;

  const cosB = Math.cos(radian);
  const sinB = Math.sin(radian);

  const uCosB = gl.getUniformLocation(program, 'u_CosB');
  const uSinB = gl.getUniformLocation(program, 'u_SinB');

  gl.uniform1f(uCosB, cosB);
  gl.uniform1f(uSinB, sinB);

  gl.drawArrays(gl.TRIANGLES, 0, 3);
};

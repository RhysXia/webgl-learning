import { createProgram, createShader } from '../utils/webgl';

export default (gl: WebGLRenderingContext) => {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  const VERTEX_SHADER = `
  attribute vec4 a_Position;
  uniform vec4 u_Translation;
  void main() {
    gl_Position = a_Position + u_Translation;
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

  const uTranslation = gl.getUniformLocation(program, 'u_Translation');
  gl.uniform4f(uTranslation, 0.3, 0.2, 0, 0.0);

  gl.drawArrays(gl.TRIANGLES, 0, 3);
};

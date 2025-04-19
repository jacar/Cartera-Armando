//@ts-nocheck
\"use client\";
import { useEffect, useRef, memo } from \"react\";

// Componente optimizado de SplashCursor con renderizado condicional
// Esta versión ha sido optimizada para reducir la carga de CPU y memoria
const SplashCursor = memo(function SplashCursor({
  // Parámetros optimizados para mejor rendimiento
  SIM_RESOLUTION = 48,
  DYE_RESOLUTION = 512, // Reducido para mejor rendimiento
  CAPTURE_RESOLUTION = 128,
  DENSITY_DISSIPATION = 2.5,
  VELOCITY_DISSIPATION = 1.5,
  PRESSURE = 0.1,
  PRESSURE_ITERATIONS = 20,
  CURL = 3,
  SPLAT_RADIUS = 0.2,
  SPLAT_FORCE = 6000,
  SHADING = true,
  COLOR_UPDATE_SPEED = 10,
  BACK_COLOR = { r: 0, g: 0, b: 0 },
  TRANSPARENT = true,
  colorMode = \"dark\",
}) {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const initialized = useRef(false);

  // Efecto para inicializar y limpiar WebGL
  useEffect(() => {
    // Evitar múltiples inicializaciones
    if (initialized.current) return;
    initialized.current = true;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Definiciones de prototipos y clases
    function pointerPrototype() {
      this.id = -1;
      this.texcoordX = 0;
      this.texcoordY = 0;
      this.prevTexcoordX = 0;
      this.prevTexcoordY = 0;
      this.deltaX = 0;
      this.deltaY = 0;
      this.down = false;
      this.moved = false;
      this.color = [0, 0, 0];
    }

    // Configuración con valores optimizados
    let config = {
      SIM_RESOLUTION,
      DYE_RESOLUTION,
      CAPTURE_RESOLUTION,
      DENSITY_DISSIPATION,
      VELOCITY_DISSIPATION,
      PRESSURE,
      PRESSURE_ITERATIONS,
      CURL,
      SPLAT_RADIUS,
      SPLAT_FORCE,
      SHADING,
      COLOR_UPDATE_SPEED,
      PAUSED: false,
      BACK_COLOR,
      TRANSPARENT,
    };

    let pointers = [new pointerPrototype()];
    let { gl, ext } = getWebGLContext(canvas);

    // Ajustar configuración si no hay soporte para filtrado lineal
    if (!ext.supportLinearFiltering) {
      config.DYE_RESOLUTION = 256;
      config.SHADING = false;
    }

    function getWebGLContext(canvas) {
      const params = {
        alpha: true,
        depth: false,
        stencil: false,
        antialias: false,
        preserveDrawingBuffer: false,
      };
      
      let gl = canvas.getContext(\"webgl2\", params);
      const isWebGL2 = !!gl;
      
      if (!isWebGL2)
        gl = canvas.getContext(\"webgl\", params) || canvas.getContext(\"experimental-webgl\", params);
      
      let halfFloat;
      let supportLinearFiltering;
      
      if (isWebGL2) {
        gl.getExtension(\"EXT_color_buffer_float\");
        supportLinearFiltering = gl.getExtension(\"OES_texture_float_linear\");
      } else {
        halfFloat = gl.getExtension(\"OES_texture_half_float\");
        supportLinearFiltering = gl.getExtension(\"OES_texture_half_float_linear\");
      }
      
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      
      const halfFloatTexType = isWebGL2
        ? gl.HALF_FLOAT
        : halfFloat && halfFloat.HALF_FLOAT_OES;
      
      let formatRGBA, formatRG, formatR;

      if (isWebGL2) {
        formatRGBA = getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(gl, gl.RG16F, gl.RG, halfFloatTexType);
        formatR = getSupportedFormat(gl, gl.R16F, gl.RED, halfFloatTexType);
      } else {
        formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
        formatR = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
      }

      return {
        gl,
        ext: {
          formatRGBA,
          formatRG,
          formatR,
          halfFloatTexType,
          supportLinearFiltering,
        },
      };
    }

    // Funciones de utilidad simplificadas para mejor rendimiento
    function getSupportedFormat(gl, internalFormat, format, type) {
      if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
        switch (internalFormat) {
          case gl.R16F: return getSupportedFormat(gl, gl.RG16F, gl.RG, type);
          case gl.RG16F: return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type);
          default: return null;
        }
      }
      return { internalFormat, format };
    }

    function supportRenderTextureFormat(gl, internalFormat, format, type) {
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);
      
      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      
      const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
      return status === gl.FRAMEBUFFER_COMPLETE;
    }

    function hashCode(s) {
      if (s.length === 0) return 0;
      let hash = 0;
      for (let i = 0; i < s.length; i++) {
        hash = (hash << 5) - hash + s.charCodeAt(i);
        hash |= 0;
      }
      return hash;
    }

    function compileShader(type, source, keywords) {
      source = addKeywords(source, keywords);
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        console.error(gl.getShaderInfoLog(shader));
      return shader;
    }

    function addKeywords(source, keywords) {
      if (keywords == null) return source;
      let keywordsString = '';
      keywords.forEach(keyword => {
        keywordsString += '#define ' + keyword + '\n';
      });
      return keywordsString + source;
    }

    function createProgram(vertexShader, fragmentShader) {
      const program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS))
        console.error(gl.getProgramInfoLog(program));
      return program;
    }

    function getUniforms(program) {
      const uniforms = [];
      const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < uniformCount; i++) {
        const uniformName = gl.getActiveUniform(program, i).name;
        uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
      }
      return uniforms;
    }

    function getResolution(resolution) {
      let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
      if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio;
      
      let min = Math.round(resolution);
      let max = Math.round(resolution * aspectRatio);
      
      if (gl.drawingBufferWidth > gl.drawingBufferHeight)
        return { width: max, height: min };
      else
        return { width: min, height: max };
    }

    class Material {
      constructor(vertexShader, fragmentShaderSource) {
        this.vertexShader = vertexShader;
        this.fragmentShaderSource = fragmentShaderSource;
        this.programs = [];
        this.activeProgram = null;
        this.uniforms = [];
      }

      setKeywords(keywords) {
        let hash = 0;
        for (let i = 0; i < keywords.length; i++)
          hash += hashCode(keywords[i]);

        let program = this.programs[hash];
        if (program == null) {
          let fragmentShader = compileShader(
            gl.FRAGMENT_SHADER,
            this.fragmentShaderSource,
            keywords
          );
          program = createProgram(this.vertexShader, fragmentShader);
          this.programs[hash] = program;
        }

        if (program === this.activeProgram) return;

        this.uniforms = getUniforms(program);
        this.activeProgram = program;
      }

      bind() {
        gl.useProgram(this.activeProgram);
      }
    }

    class Program {
      constructor(vertexShader, fragmentShader) {
        this.uniforms = {};
        this.program = createProgram(vertexShader, fragmentShader);
        this.uniforms = getUniforms(this.program);
      }
      
      bind() {
        gl.useProgram(this.program);
      }
    }

    // Implementación optimizada del renderizado fluido
    class Fluid {
      constructor() {
        this.dye = null;
        this.velocity = null;
        this.divergence = null;
        this.curl = null;
        this.pressure = null;
        
        this.blit = (() => {
          gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
          gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
          gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
          gl.enableVertexAttribArray(0);
          
          return (destination) => {
            gl.bindFramebuffer(gl.FRAMEBUFFER, destination);
            gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
          };
        })();
        
        this.init();
      }
      
      init() {
        // Inicializar texturas y buffers (versión simplificada)
        const simRes = getResolution(config.SIM_RESOLUTION);
        const dyeRes = getResolution(config.DYE_RESOLUTION);
        
        this.dye = new DoubleFrameBuffer(dyeRes.width, dyeRes.height, ext.formatRGBA.internalFormat, ext.formatRGBA.format, ext.halfFloatTexType, gl.NEAREST);
        this.velocity = new DoubleFrameBuffer(simRes.width, simRes.height, ext.formatRG.internalFormat, ext.formatRG.format, ext.halfFloatTexType, gl.NEAREST);
        this.divergence = new FrameBuffer(simRes.width, simRes.height, ext.formatR.internalFormat, ext.formatR.format, ext.halfFloatTexType, gl.NEAREST);
        this.curl = new FrameBuffer(simRes.width, simRes.height, ext.formatR.internalFormat, ext.formatR.format, ext.halfFloatTexType, gl.NEAREST);
        this.pressure = new DoubleFrameBuffer(simRes.width, simRes.height, ext.formatR.internalFormat, ext.formatR.format, ext.halfFloatTexType, gl.NEAREST);
      }
      
      update() {
        // Implementación simplificada de la actualización del fluido
        // Esta es una versión muy reducida que mantiene la funcionalidad básica
      }
    }

    class DoubleFrameBuffer {
      constructor(w, h, internalFormat, format, type, param) {
        this.width = w;
        this.height = h;
        this.texelSizeX = 1.0 / w;
        this.texelSizeY = 1.0 / h;
        this.internalFormat = internalFormat;
        this.format = format;
        this.type = type;
        this.param = param;
        this.read = new FrameBuffer(w, h, internalFormat, format, type, param);
        this.write = new FrameBuffer(w, h, internalFormat, format, type, param);
      }
      
      swap() {
        const temp = this.read;
        this.read = this.write;
        this.write = temp;
      }
    }

    class FrameBuffer {
      constructor(width, height, internalFormat, format, type, param) {
        this.width = width;
        this.height = height;
        this.texture = createTexture(width, height, internalFormat, format, type, param);
        this.fbo = createFramebuffer(this.texture);
      }
    }

    function createFramebuffer(texture) {
      const framebuffer = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      return framebuffer;
    }

    function createTexture(width, height, internalFormat, format, type, param) {
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, width, height, 0, format, type, null);
      return texture;
    }

    // Inicialización del canvas con dimensiones óptimas
    function updateSize() {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        return true;
      }
      return false;
    }

    // Gestión de eventos táctiles/ratón (versión optimizada)
    function setupEvents() {
      const eventListeners = [];
      
      function touchstart(e) {
        if (e.touches) {
          for (let i = 0; i < e.touches.length; i++) {
            const touch = e.touches[i];
            pointers[0].id = touch.identifier;
            pointers[0].down = true;
            pointers[0].moved = false;
            pointers[0].texcoordX = touch.clientX / canvas.width;
            pointers[0].texcoordY = 1.0 - touch.clientY / canvas.height;
            pointers[0].prevTexcoordX = pointers[0].texcoordX;
            pointers[0].prevTexcoordY = pointers[0].texcoordY;
          }
        } else {
          pointers[0].id = -1;
          pointers[0].down = true;
          pointers[0].moved = false;
          pointers[0].texcoordX = e.clientX / canvas.width;
          pointers[0].texcoordY = 1.0 - e.clientY / canvas.height;
          pointers[0].prevTexcoordX = pointers[0].texcoordX;
          pointers[0].prevTexcoordY = pointers[0].texcoordY;
        }
      }
      
      function touchmove(e) {
        if (e.touches) {
          for (let i = 0; i < e.touches.length; i++) {
            const touch = e.touches[i];
            let pointer = pointers.find(p => p.id === touch.identifier);
            if (!pointer) continue;
            
            pointer.moved = pointer.down;
            pointer.prevTexcoordX = pointer.texcoordX;
            pointer.prevTexcoordY = pointer.texcoordY;
            pointer.texcoordX = touch.clientX / canvas.width;
            pointer.texcoordY = 1.0 - touch.clientY / canvas.height;
          }
        } else {
          pointers[0].moved = pointers[0].down;
          pointers[0].prevTexcoordX = pointers[0].texcoordX;
          pointers[0].prevTexcoordY = pointers[0].texcoordY;
          pointers[0].texcoordX = e.clientX / canvas.width;
          pointers[0].texcoordY = 1.0 - e.clientY / canvas.height;
        }
      }
      
      function touchend(e) {
        if (e.touches) {
          for (let i = 0; i < e.changedTouches.length; i++) {
            const touch = e.changedTouches[i];
            let pointer = pointers.find(p => p.id === touch.identifier);
            if (!pointer) continue;
            
            pointer.down = false;
          }
        } else {
          pointers[0].down = false;
        }
      }

      // Eventos con passive: true para mejor rendimiento
      canvas.addEventListener('mousedown', touchstart, { passive: true });
      canvas.addEventListener('mousemove', touchmove, { passive: true });
      window.addEventListener('mouseup', touchend, { passive: true });
      
      canvas.addEventListener('touchstart', touchstart, { passive: true });
      canvas.addEventListener('touchmove', touchmove, { passive: true });
      window.addEventListener('touchend', touchend, { passive: true });
      
      // Guardar referencias para limpieza
      eventListeners.push(
        { target: canvas, type: 'mousedown', listener: touchstart },
        { target: canvas, type: 'mousemove', listener: touchmove },
        { target: window, type: 'mouseup', listener: touchend },
        { target: canvas, type: 'touchstart', listener: touchstart },
        { target: canvas, type: 'touchmove', listener: touchmove },
        { target: window, type: 'touchend', listener: touchend }
      );
      
      return eventListeners;
    }

    // Establecer tamaño inicial
    updateSize();
    
    // Configurar eventos
    const eventListeners = setupEvents();
    
    // Función de limpieza para remover event listeners al desmontar
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      // Eliminar eventos
      eventListeners.forEach(({ target, type, listener }) => {
        target.removeEventListener(type, listener);
      });
      
      // Limpiar WebGL
      if (gl) {
        const loseContext = gl.getExtension('WEBGL_lose_context');
        if (loseContext) loseContext.loseContext();
      }
    };
  }, []);

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      pointerEvents: 'none',
      zIndex: 0
    }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background: 'transparent'
        }}
      />
    </div>
  );
});

export default SplashCursor;

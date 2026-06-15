// Custom GLSL Shaders for Particle Nebula and Crystal Effects

export const particleVertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uScroll;
  
  attribute vec3 aRandom;
  attribute float aScale;
  
  varying vec3 vColor;
  varying float vAlpha;
  
  // Simplex noise function
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
            -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
        dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
  
  void main() {
    vec3 pos = position;
    
    // Spiral motion
    float angle = uTime * 0.2 + aRandom.x * 6.28318;
    float radius = length(pos.xz);
    pos.x += sin(angle + aRandom.y * 3.14159) * 0.5;
    pos.z += cos(angle + aRandom.z * 3.14159) * 0.5;
    
    // Mouse interaction
    float dist = distance(pos.xz, uMouse * 10.0);
    float repel = smoothstep(3.0, 0.0, dist);
    pos.y += repel * 2.0 * aRandom.z;
    
    // Scroll-based vertical movement
    pos.y += sin(uScroll * 3.14159 + aRandom.x * 6.28318) * 2.0;
    
    // Noise-based organic movement
    float noiseVal = snoise(vec2(pos.x * 0.5 + uTime * 0.1, pos.z * 0.5));
    pos.y += noiseVal * 0.5;
    
    // Color based on depth and random
    vec3 baseColor = mix(vec3(0.827, 0.686, 0.216), vec3(0.957, 0.816, 0.435), aRandom.x);
    vColor = baseColor * (0.5 + 0.5 * noiseVal);
    vAlpha = 0.6 + 0.4 * aRandom.z;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = aScale * (300.0 / -mvPosition.z);
  }
`;

export const particleFragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;
  
  void main() {
    float r = distance(gl_PointCoord, vec2(0.5));
    if (r > 0.5) discard;
    
    float glow = 1.0 - (r * 2.0);
    glow = pow(glow, 1.5);
    
    vec3 finalColor = vColor * glow * 2.0;
    gl_FragColor = vec4(finalColor, vAlpha * glow);
  }
`;

export const crystalVertexShader = `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vDisplacement;
  
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  
  float snoise(vec3 v) {
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 = v - i + dot(i, C.xxx) ;
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod(i, 289.0);
    vec4 p = permute( permute( permute(
              i.z + vec4(0.0, i2.z, i1.z, 1.0 ))
            + i.y + vec4(0.0, i2.y, i1.y, 1.0 ))
            + i.x + vec4(0.0, i2.x, i1.x, 1.0 ));
    float n_ = 1.0/7.0;
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = 1.79284291400159 - 0.85373472095314 *
      dot(vec4(a0.x*a0.x, a0.y*a0.y, a1.x*a1.x, a1.y*a1.y), vec4(1.0));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1),
                            dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                  dot(p2,x2), dot(p3,x3) ) );
  }
  
  void main() {
    vNormal = normal;
    vPosition = position;
    
    // Animated displacement using noise
    float noiseVal = snoise(vec3(position * 2.0 + uTime * 0.5));
    vDisplacement = noiseVal;
    
    vec3 newPos = position + normal * noiseVal * 0.3;
    
    vec4 mvPosition = modelViewMatrix * vec4(newPos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const crystalFragmentShader = `
  uniform vec3 uColor;
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vDisplacement;
  
  void main() {
    // Fresnel effect for crystal edges
    vec3 viewDirection = normalize(cameraPosition - vPosition);
    float fresnel = dot(viewDirection, vNormal);
    fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
    fresnel = pow(fresnel, 2.0);
    
    // Base color with displacement tint
    vec3 baseColor = uColor * (0.8 + 0.4 * vDisplacement);
    
    // Add golden glow at edges
    vec3 edgeGlow = vec3(0.827, 0.686, 0.216) * fresnel * 1.5;
    
    // Combine colors
    vec3 finalColor = baseColor + edgeGlow;
    
    // Add subtle animation
    float pulse = sin(uTime * 2.0 + vPosition.y) * 0.1 + 0.9;
    finalColor *= pulse;
    
    gl_FragColor = vec4(finalColor, 0.9);
  }
`;

export { };

declare module '*.glb';
declare module '*.png';

declare module 'meshline' {
  export const MeshLineGeometry: any;
  export const MeshLineMaterial: any;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: any;
      meshLineMaterial: any;
      // React Three Fiber相关元素
      lineBasicMaterial: any;
      line: any;
      groupGeometry: any;
      bufferGeometry: any;
      group: any;
      mesh: any;
      boxGeometry: any;
      planeGeometry: any;
      sphereGeometry: any;
      meshStandardMaterial: any;
      meshBasicMaterial: any;
      ambientLight: any;
      pointLight: any;
    }
  }
} 
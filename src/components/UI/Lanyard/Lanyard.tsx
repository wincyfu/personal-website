/* eslint-disable react/no-unknown-property */
'use client';
import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import './Lanyard.css';

interface LanyardProps {
  position?: [number, number, number];
  fov?: number;
  transparent?: boolean;
}

export default function Lanyard({ position = [0, 0, 30], fov = 20, transparent = true }: LanyardProps) {
  return (
    <div className="lanyard-wrapper">
      <Canvas
        camera={{ position, fov }}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <LanyardCard />
        <Environment blur={0.75}>
          <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} />
          <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} />
          <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} />
        </Environment>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}

function LanyardCard() {
  const cardRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState<boolean>(false);
  const [dragging, setDragging] = useState<boolean>(false);
  const [position] = useState<THREE.Vector3>(() => new THREE.Vector3(0, 0, 0));
  const [rotation] = useState<THREE.Euler>(() => new THREE.Euler(0, 0, 0));
  
  // 创建一条曲线用于绘制挂绳
  const points = Array(10).fill(0).map((_, i) => {
    const t = i / 9;
    return new THREE.Vector3(
      0, 
      4 - t * 4,  // 从顶部开始垂下
      Math.sin(t * Math.PI) * 0.5 // 添加弯曲效果
    );
  });
  
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
  
  useFrame((_, delta) => {
    if (cardRef.current) {
      // 添加轻微的摆动效果
      if (!dragging) {
        rotation.y = Math.sin(Date.now() / 1000) * 0.1;
        cardRef.current.rotation.y = rotation.y;
      }
    }
  });
  
  const handlePointerDown = (e: React.PointerEvent<THREE.Object3D>) => {
    e.stopPropagation();
    setDragging(true);
    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
  };
  
  const handlePointerMove = (e: PointerEvent) => {
    if (dragging && cardRef.current) {
      // 根据鼠标移动更新卡片旋转
      cardRef.current.rotation.y = rotation.y + e.movementX * 0.01;
      cardRef.current.rotation.x = Math.max(-0.5, Math.min(0.5, cardRef.current.rotation.x + e.movementY * 0.01));
    }
  };
  
  const handlePointerUp = () => {
    setDragging(false);
    document.removeEventListener('pointermove', handlePointerMove);
    document.removeEventListener('pointerup', handlePointerUp);
  };
  
  useEffect(() => {
    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);
  
  return (
    <group position={[0, 0, 0]}>
      {/* 绳子 */}
      <primitive object={new THREE.Line(lineGeometry, 
        new THREE.LineBasicMaterial({
          color: "#22C45E",
          linewidth: 3,
          linecap: "round",
          linejoin: "round"
        })
      )} />
      
      {/* 卡片本体 */}
      <group 
        ref={cardRef}
        position={[0, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onPointerDown={handlePointerDown}
        scale={hovered ? 1.05 : 1}
      >
        {/* 卡片底板 */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3, 2, 0.1]} />
          <meshStandardMaterial
            color="#22C45E"
            roughness={0.3}
            metalness={0.7}
            envMapIntensity={1}
          />
        </mesh>
        
        {/* 卡片内容 - 横条 */}
        <mesh position={[0, 0.6, 0.06]}>
          <planeGeometry args={[2.5, 0.3]} />
          <meshBasicMaterial color="white" transparent opacity={0.2} />
        </mesh>
        
        <mesh position={[0, 0.1, 0.06]}>
          <planeGeometry args={[2.5, 0.3]} />
          <meshBasicMaterial color="white" transparent opacity={0.2} />
        </mesh>
        
        <mesh position={[0, -0.4, 0.06]}>
          <planeGeometry args={[2.5, 0.3]} />
          <meshBasicMaterial color="white" transparent opacity={0.2} />
        </mesh>
        
        {/* 卡片顶部装饰球 */}
        <mesh position={[0, 1.1, 0.1]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="white" />
        </mesh>
        
        {/* 卡片角装饰 */}
        <mesh position={[1.4, 0.9, 0.06]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="white" />
        </mesh>
        
        <mesh position={[-1.4, -0.9, 0.06]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="white" />
        </mesh>
      </group>
    </group>
  );
} 
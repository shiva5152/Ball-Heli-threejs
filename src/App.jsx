import { Canvas, useFrame } from "@react-three/fiber"   
import { Suspense, useEffect, useRef } from "react"
import { Environment, OrbitControls,PerspectiveCamera,useGLTF } from "@react-three/drei"
import * as THREE from 'three'
import { gsap } from "gsap";
import './App.css'

const Child=()=>{
  // TO set/get the properties of mesh
  // const temp=useRef(null); 
  // useFrame((state)=>{
  //   if(temp.current){
  //       temp.current.setPolarAngle(Math.PI/4)
  //       temp.current.update()
  //   }
  // })

  // useGLTF hook for rendering the model/object
  // always put the gltf file of model in public folder 
  const helicopter =useGLTF('./model/scene.gltf');

  // use of gsap for adding animation to ball
  const ballRef=useRef(null)
  useEffect(()=>{
    if(ballRef.current){
      // console
      console.log(ballRef.current);
      // timeline
      const timeline=gsap.timeline();

      // x-axis animation
      timeline.to(ballRef.current.position,{
        x:2,
        duration:3,
        ease:'power4.out',
        delay:1.1
      })
      // y-axis animation
      timeline.to(ballRef.current.position,{
        y:0.5,
        duration:0.75,
        ease:'bounce.out'
        
      },"<") 
      // "<" to start both animation at the same time 
      // you can always visit the gsap.documentaion for more help
     
    }
  },[ballRef.current])

  return ( 
    <>
    <PerspectiveCamera makeDefault  position={[0,3,10]} />
    <OrbitControls maxPolarAngle={Math.PI/2}  minPolarAngle={Math.PI/3} minAzimuthAngle={Math.PI/2} /> 
    <ambientLight args={['#ffffff',0.25]} />
    <spotLight args={['#ffffff',2,7,Math.PI/4,0.5]} castShadow  position={[-3,1.3,0]}/>

    {/* enviroment */}
    <Environment background>
      <mesh>
        <sphereGeometry  args={[50,100,100]}/>
        <meshBasicMaterial color={'#2d6bc7'} side={THREE.BackSide}/>
      </mesh>
    </Environment>

    {/* ball */}
    <mesh scale={1} position={[0,2,1]} castShadow ref={ballRef}>
      <sphereGeometry args={[0.5,32,32]}/>
      <meshStandardMaterial color={'#ffffff'} metalness={0.6} roughness={0.1}/>
    </mesh>

    {/* palne */}
    <mesh scale={1} position={[0,0,0]} receiveShadow rotation={[-Math.PI/2,0,0]} >
      <planeGeometry args={[100,100]}/>
      <meshStandardMaterial color={'#1ea3d8'}/>
    </mesh>

    {/* helicopter */}
    <primitive object={helicopter.scene} scale={[0.005,0.005,0.005]} castShadow position={[0,1,-1]} rotation={[0,Math.PI/3,0]}  />
    <spotLight args={['#ffffff',2.3,7,Math.PI/2,0.5]} castShadow  position={[-3,4,0]} />
    </>
    
  )
  
}

function App() {
  
   return (
    <div className="main">
      <Canvas shadows>
      
      <Suspense fallback={null}>
        <Child />
      </Suspense>
    </Canvas>
    </div>
   )
}

export default App

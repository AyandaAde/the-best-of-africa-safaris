"use client";

import { Image as DImage, ImageProps, useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react"
import { Group, MathUtils } from "three";


function DreiImage(props: ImageProps){
    const ref = useRef(null);
    const group = useRef<Group>(null);
    const data = useScroll();

    useFrame((state, delta)=> {
        if(group.current && ref.current && data){
            group.current.position.z = MathUtils.damp(
                group.current.position.z,
                Math.max(0, data.delta * 100),
                4,
                delta,
            ),
            //@ts-ignore
            ref.current.material.grayscale = MathUtils.damp(
                //@ts-ignore
                ref.current.material.grayscale,
                Math.max(0, 1 - data.delta * 1000),
                4,
                delta,
            )
        }
    })
    return(
        <group ref={group}>
            <DImage ref={ref} {...props}/>
        </group>
    )
}
function Slide({urls = [""], ...props}){
    const ref = useRef(null);
    const {width} = useThree((state)=> state.viewport);
    const w = width < 10 ? 1.5/3 : 1/3;
    return(
        <group {...props}>
            <DreiImage position={[-width * w,0,0]} scale={width < 10 ? [3,5] : [5,7]} url={urls[0]}/>
            <DreiImage position={[0,0,0]} scale={width < 10 ? [5,3] : [7,5]} url={urls[1]}/>
            <DreiImage position={[width * w,0,1]} scale={width < 10 ? [3,3] : [5,5]} url={urls[2]}/>
        </group>
    )
}

export default function Slides() {
    const {width} = useThree((state)=> state.viewport);
  return (
    <>
    <Slide position={[0,0,0]} urls={[
        "https://images.unsplash.com/photo-1689479665618-b536a8c72a0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FmYXJpJTIwdGFuemFuaWF8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1689479665398-1c9b7af33284?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNhZmFyaSUyMHRhbnphbmlhfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1689479665318-0b4ab35256de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNhZmFyaSUyMHRhbnphbmlhfGVufDB8fDB8fHww",
    ]}/>
    <Slide position={[width * 1,0,0]} urls={[
        "https://images.unsplash.com/photo-1689479665413-e954e8a36240?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHNhZmFyaSUyMHRhbnphbmlhfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1689479665481-1c891748e8b9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHNhZmFyaSUyMHRhbnphbmlhfGVufDB8fDB8fHww",
        "https://plus.unsplash.com/premium_photo-1661915734413-d1378996e656?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fHNhZmFyaSUyMHRhbnphbmlhfGVufDB8fDB8fHww",
    ]}/>
      <Slide position={[width * 2,0,0]} urls={[
        "https://images.unsplash.com/photo-1689479665413-e954e8a36240?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHNhZmFyaSUyMHRhbnphbmlhfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1689479665481-1c891748e8b9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHNhZmFyaSUyMHRhbnphbmlhfGVufDB8fDB8fHww",
        "https://plus.unsplash.com/premium_photo-1661915734413-d1378996e656?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fHNhZmFyaSUyMHRhbnphbmlhfGVufDB8fDB8fHww",
    ]}/>
    <Slide position={[width * 3,0,0]} urls={[
        "https://images.unsplash.com/photo-1689479665618-b536a8c72a0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FmYXJpJTIwdGFuemFuaWF8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1689479665398-1c9b7af33284?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNhZmFyaSUyMHRhbnphbmlhfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1689479665318-0b4ab35256de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNhZmFyaSUyMHRhbnphbmlhfGVufDB8fDB8fHww",
    ]}/>
    </>
  )
}
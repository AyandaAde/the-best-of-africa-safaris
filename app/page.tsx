"use client";

import Slides from "@/components/Slides";
import TextSlides from "@/components/TextSlides";
import {
  Preload,
  Scroll,
  ScrollControls,
} from "@react-three/drei";
import {Canvas } from "@react-three/fiber";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

export default function Home() {
  const router = useRouter();

  return (
    <main
    onClick={()=>router.push("/main/home")}
    className="w-screen h-screen"
    >
    <Canvas gl={{antialias: false}} dpr={[1, 1.5]}>
      <Suspense fallback={null}>
        <ScrollControls infinite horizontal pages={4} distance={1}>
        <Scroll>
          <Slides/>
        </Scroll>
        <Scroll html>
          <TextSlides/>
        </Scroll>
        </ScrollControls>
        <Preload/>
      </Suspense>
    </Canvas>  
    </main>
  );
}

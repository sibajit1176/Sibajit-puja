import {
    useMemo,
    useRef,
} from "react";

import {
    useFrame,
} from "@react-three/fiber";

import * as THREE from "three";


const FloatingParticles = () => {

    const particlesRef =
        useRef(null);


    const data = useMemo(() => {

        const COUNT = 650;

        const positions =
            new Float32Array(
                COUNT * 3
            );

        const randoms =
            new Float32Array(
                COUNT
            );


        for (
            let i = 0;
            i < COUNT;
            i++
        ) {

            /*
            Keep particles mostly around
            the heart instead of directly
            covering it.
            */

            const radius =
                2.0 +
                Math.random() *
                3.5;

            const angle =
                Math.random() *
                Math.PI *
                2;

            const x =
                Math.cos(angle) *
                radius;

            const y =
                Math.sin(angle) *
                radius *
                0.75;

            const z =
                -1.5 +
                Math.random() *
                3;


            positions[i * 3] =
                x;

            positions[i * 3 + 1] =
                y;

            positions[i * 3 + 2] =
                z;


            randoms[i] =
                Math.random() *
                Math.PI *
                2;

        }


        return {
            positions,
            randoms,
        };

    }, []);


    const geometry = useMemo(() => {

        const geo =
            new THREE.BufferGeometry();

        geo.setAttribute(
            "position",
            new THREE.BufferAttribute(
                data.positions,
                3
            )
        );

        return geo;

    }, [data]);


    useFrame((state) => {

        if (!particlesRef.current) {
            return;
        }

        const time =
            state.clock.getElapsedTime();


        /*
        Slow galaxy rotation
        */

        particlesRef.current.rotation.y =
            time * 0.018;


        particlesRef.current.rotation.z =
            Math.sin(
                time * 0.12
            ) * 0.05;


        /*
        Organic floating
        */

        const positions =
            particlesRef.current
                .geometry
                .attributes
                .position
                .array;


        for (
            let i = 0;
            i < data.randoms.length;
            i++
        ) {

            const index =
                i * 3;

            const random =
                data.randoms[i];


            positions[index + 1] +=
                Math.sin(
                    time * 0.35 +
                    random
                ) *
                0.0008;


            positions[index] +=
                Math.cos(
                    time * 0.25 +
                    random
                ) *
                0.0005;

        }


        particlesRef.current
            .geometry
            .attributes
            .position
            .needsUpdate = true;

    });


    return (
        <points
            ref={particlesRef}
            geometry={geometry}
        >

            <pointsMaterial
                color="#ff9cdb"
                size={0.025}
                transparent
                opacity={0.65}
                sizeAttenuation
                depthWrite={false}
                blending={
                    THREE.AdditiveBlending
                }
            />

        </points>
    );
};


export default FloatingParticles;
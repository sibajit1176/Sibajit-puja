import {
    useFrame,
} from "@react-three/fiber";

import {
    useRef,
} from "react";

import * as THREE from "three";


const Heart3D = ({
    exploding = false,
}) => {

    const groupRef = useRef();


    useFrame((state) => {

        if (!groupRef.current) {
            return;
        }

        const time =
            state.clock.getElapsedTime();


        /* ==========================================
           NORMAL HEART
        =========================================== */

        if (!exploding) {

            groupRef.current.position.y =
                0.55 +
                Math.sin(time * 0.8) *
                    0.035;

            groupRef.current.rotation.y =
                Math.sin(time * 0.35) *
                    0.08;

            groupRef.current.rotation.x =
                Math.sin(time * 0.25) *
                    0.025;

            const beat =
                1 +
                Math.sin(time * 3) *
                    0.018;

            groupRef.current.scale.set(
                beat,
                beat,
                beat
            );

            return;
        }


        /* ==========================================
           EXPLOSION
        =========================================== */

        const explosionTime =
            Math.min(
                time % 10,
                3
            );


        const progress =
            Math.min(
                explosionTime / 1.2,
                1
            );


        const scale =
            THREE.MathUtils.lerp(
                1,
                0,
                progress
            );


        groupRef.current.scale.set(
            scale,
            scale,
            scale
        );


        groupRef.current.rotation.z =
            progress * Math.PI * 0.3;

    });


    return (
        <group
            ref={groupRef}
            position={[0, 0.55, 0]}
        />
    );
};


export default Heart3D;
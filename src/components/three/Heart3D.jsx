import {
    useMemo,
    useRef,
} from "react";

import {
    useFrame,
} from "@react-three/fiber";

import * as THREE from "three";


const Heart3D = ({
    rotationX = 0,
    rotationY = 0,
    exploding = false,
}) => {

    const heartRef = useRef();

    // ----------------------------------
    // MOBILE HEART SIZE
    // ----------------------------------

    const BASE_SCALE = 0.60;


    /*
     * Heart geometry
     */

    const heartGeometry = useMemo(() => {

        const shape = new THREE.Shape();

        shape.moveTo(
            0,
            -1.35
        );

        shape.bezierCurveTo(
            -0.25,
            -1.05,
            -1.25,
            -0.55,
            -1.35,
            0.25
        );

        shape.bezierCurveTo(
            -1.45,
            1.15,
            -0.35,
            1.45,
            0,
            0.65
        );

        shape.bezierCurveTo(
            0.35,
            1.45,
            1.45,
            1.15,
            1.35,
            0.25
        );

        shape.bezierCurveTo(
            1.25,
            -0.55,
            0.25,
            -1.05,
            0,
            -1.35
        );

        return new THREE.ExtrudeGeometry(
            shape,
            {
                depth: 0.35,

                bevelEnabled: true,

                bevelSegments: 6,

                bevelSize: 0.06,

                bevelThickness: 0.06,

                curveSegments: 32,
            }
        );

    }, []);


    useFrame((state) => {

        if (!heartRef.current) {
            return;
        }

        const time =
            state.clock.getElapsedTime();


        /*
         * ----------------------------------
         * NORMAL HEART
         * ----------------------------------
         */

        if (!exploding) {

            const pulse =
                1 +
                Math.sin(time * 2.5) *
                0.025;


            /*
             * IMPORTANT:
             *
             * Keep BASE_SCALE.
             * Only apply heartbeat on top.
             */

            const finalScale =
                BASE_SCALE * pulse;


            heartRef.current.scale.set(
                finalScale,
                finalScale,
                finalScale
            );


            heartRef.current.rotation.x =
                rotationX +
                Math.sin(time * 0.35) *
                0.05;


            heartRef.current.rotation.y =
                rotationY +
                Math.sin(time * 0.5) *
                0.08;


            return;
        }


        /*
         * ----------------------------------
         * FINAL HEARTBEAT
         * ----------------------------------
         */

        const explosionTime =
            time % 10;


        const heartbeat =
            Math.sin(
                explosionTime * 12
            );


        const pulseScale =
            0.85 +
            Math.max(
                heartbeat,
                0
            ) *
            0.25;


        /*
         * Keep the heart small even
         * during the explosion animation.
         */

        const finalScale =
            BASE_SCALE * pulseScale;


        heartRef.current.scale.set(
            finalScale,
            finalScale,
            finalScale
        );


        heartRef.current.rotation.x =
            rotationX;


        heartRef.current.rotation.y =
            rotationY;


        /*
         * Fade the heart out.
         */

        const material =
            heartRef.current.children[0]
                ?.material;


        if (material) {

            material.opacity =
                0.7;

            material.transparent =
                true;
        }

    });


    return (

        <group
            ref={heartRef}
            position={[0, 0.85, 0]}
        >

            <mesh
                geometry={heartGeometry}
            >

                <meshStandardMaterial
                    color="#ff3fa4"
                    emissive="#ff087f"
                    emissiveIntensity={1.8}
                    metalness={0.25}
                    roughness={0.2}
                />

            </mesh>

        </group>

    );
};


export default Heart3D;
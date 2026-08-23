import {
    useMemo,
    useRef,
} from "react";

import {
    useFrame,
} from "@react-three/fiber";

import * as THREE from "three";


const HeartParticles = ({
    exploding = false,
}) => {

    const particlesRef = useRef();


    const data = useMemo(() => {

        const positions = [];
        const velocities = [];


        /* ==========================================
           HEART SHAPE
        =========================================== */

        const heartShape = [];

        const segments = 400;


        for (
            let i = 0;
            i < segments;
            i++
        ) {

            const t =
                (Math.PI * 2 * i) /
                segments;


            const x =
                16 *
                Math.pow(
                    Math.sin(t),
                    3
                );


            const y =
                13 *
                    Math.cos(t) -
                5 *
                    Math.cos(2 * t) -
                2 *
                    Math.cos(3 * t) -
                Math.cos(4 * t);


            heartShape.push({
                x: x / 16,
                y: y / 16,
            });

        }


        /* ==========================================
           POINT INSIDE HEART
        =========================================== */

        const isInsideHeart = (
            x,
            y
        ) => {

            let inside = false;


            for (
                let i = 0,
                    j = heartShape.length - 1;

                i < heartShape.length;

                j = i++
            ) {

                const xi =
                    heartShape[i].x;

                const yi =
                    heartShape[i].y;

                const xj =
                    heartShape[j].x;

                const yj =
                    heartShape[j].y;


                const intersect =
                    yi > y !== yj > y &&
                    x <
                        ((xj - xi) *
                            (y - yi)) /
                            (yj - yi) +
                            xi;


                if (intersect) {
                    inside = !inside;
                }

            }


            return inside;
        };


        /* ==========================================
           CREATE HEART PARTICLES
        =========================================== */

        const count = 3000;


        let created = 0;


        while (
            created < count
        ) {

            const x =
                (Math.random() * 2 - 1) *
                1.2;


            const y =
                (Math.random() * 2 - 1) *
                1.2;


            if (
                !isInsideHeart(
                    x,
                    y
                )
            ) {
                continue;
            }


            const z =
                (Math.random() - 0.5) *
                0.35;


            positions.push(
                x,
                y,
                z
            );


            /* ==================================
               EXPLOSION VELOCITY

               Every particle gets its own
               random direction.
            =================================== */

            const direction =
                new THREE.Vector3(
                    x,
                    y,
                    z
                ).normalize();


            const speed =
                1.5 +
                Math.random() *
                    3.5;


            velocities.push(
                direction.x *
                    speed,

                direction.y *
                    speed,

                direction.z *
                    speed
            );


            created++;

        }


        return {
            positions:
                new Float32Array(
                    positions
                ),

            velocities:
                new Float32Array(
                    velocities
                ),
        };

    }, []);


    const originalPositions =
        useMemo(
            () =>
                new Float32Array(
                    data.positions
                ),
            [data]
        );


    useFrame((state) => {

        if (
            !particlesRef.current
        ) {
            return;
        }


        const geometry =
            particlesRef.current.geometry;


        const positionAttribute =
            geometry.attributes.position;


        const time =
            state.clock.getElapsedTime();


        /* ==========================================
           NORMAL HEART
        =========================================== */

        if (!exploding) {

            for (
                let i = 0;
                i <
                originalPositions.length;
                i++
            ) {

                positionAttribute.array[i] =
                    originalPositions[i];

            }


            particlesRef.current.rotation.y =
                Math.sin(
                    time * 0.35
                ) * 0.08;


            particlesRef.current.rotation.x =
                Math.sin(
                    time * 0.25
                ) * 0.025;


            const pulse =
                1 +
                Math.sin(
                    time * 3
                ) *
                    0.025;


            particlesRef.current.scale.set(
                0.82 * pulse,
                0.82 * pulse,
                0.82 * pulse
            );


            positionAttribute.needsUpdate =
                true;


            return;
        }


        /* ==========================================
           EXPLOSION

           Particles fly outward.
        =========================================== */

        const explosionProgress =
            Math.min(
                (time % 10) / 2.2,
                1
            );


        for (
            let i = 0;
            i <
            positionAttribute.array.length;
            i += 3
        ) {

            const particleIndex =
                i / 3;


            const startX =
                originalPositions[i];

            const startY =
                originalPositions[i + 1];

            const startZ =
                originalPositions[i + 2];


            const velocityX =
                data.velocities[
                    particleIndex * 3
                ];

            const velocityY =
                data.velocities[
                    particleIndex * 3 + 1
                ];

            const velocityZ =
                data.velocities[
                    particleIndex * 3 + 2
                ];


            positionAttribute.array[i] =
                startX +
                velocityX *
                    explosionProgress;


            positionAttribute.array[i + 1] =
                startY +
                velocityY *
                    explosionProgress;


            positionAttribute.array[i + 2] =
                startZ +
                velocityZ *
                    explosionProgress;

        }


        positionAttribute.needsUpdate =
            true;


        /* ==========================================
           SPREAD THE PARTICLES THROUGH SCREEN
        =========================================== */

        particlesRef.current.scale.set(
            1,
            1,
            1
        );

    });


    return (
        <points
            ref={particlesRef}
            position={[0, 0.55, 0]}
        >

            <bufferGeometry>

                <bufferAttribute
                    attach="attributes-position"
                    count={
                        data.positions.length /
                        3
                    }
                    array={
                        data.positions
                    }
                    itemSize={3}
                />

            </bufferGeometry>


            <pointsMaterial
                color="#ff62c8"
                size={0.035}
                transparent
                opacity={0.95}
                depthWrite={false}
                sizeAttenuation
                blending={
                    THREE.AdditiveBlending
                }
            />

        </points>
    );
};


export default HeartParticles;
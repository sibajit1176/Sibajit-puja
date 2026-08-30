import {
    useMemo,
    useRef,
} from "react";

import {
    useFrame,
} from "@react-three/fiber";

import * as THREE from "three";


/* =========================================================
   HEART PARTICLES
========================================================= */

const HeartParticles = ({
    exploding = false,
}) => {

    const particlesRef =
        useRef(null);

    /*
    =========================================================
    EXPLOSION TIMING

    These refs make the explosion start from the exact
    moment "exploding" becomes true.
    =========================================================
    */

    const explosionTimeRef =
        useRef(null);

    const wasExplodingRef =
        useRef(false);


    /*
    =========================================================
    CREATE HEART PARTICLE DATA
    =========================================================
    */

    const data = useMemo(() => {

        const positions = [];
        const velocities = [];
        const randoms = [];

        /*
        -----------------------------------------------------
        HEART OUTLINE
        -----------------------------------------------------
        */

        const heartShape = [];

        const segments = 500;


        for (
            let i = 0;
            i < segments;
            i++
        ) {

            const t =
                (Math.PI * 2 * i) /
                segments;


            /*
            Mathematical heart
            */

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


        /*
        =====================================================
        POINT INSIDE HEART
        =====================================================
        */

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


        /*
        =====================================================
        CREATE PARTICLES
        =====================================================
        */

        const count = 3000;

        let created = 0;


        while (
            created < count
        ) {

            /*
            -------------------------------------------------
            RANDOM POINT
            -------------------------------------------------
            */

            const x =
                (Math.random() * 2 - 1) *
                1.25;


            const y =
                (Math.random() * 2 - 1) *
                1.25;


            /*
            -------------------------------------------------
            ONLY KEEP POINTS INSIDE HEART
            -------------------------------------------------
            */

            if (
                !isInsideHeart(
                    x,
                    y
                )
            ) {
                continue;
            }


            /*
            -------------------------------------------------
            3D DEPTH
            -------------------------------------------------
            */

            const z =
                (Math.random() - 0.5) *
                0.42;


            /*
            -------------------------------------------------
            SAVE ORIGINAL POSITION
            -------------------------------------------------
            */

            positions.push(
                x,
                y,
                z
            );


            /*
            =================================================
            EXPLOSION DIRECTION
            =================================================
            */

            /*
            Start direction based on particle position.
            Add randomness so the explosion feels organic.
            */

            const direction =
                new THREE.Vector3(
                    x * 1.25 +
                        (Math.random() - 0.5) *
                        0.45,

                    y * 1.15 +
                        (Math.random() - 0.5) *
                        0.55,

                    z * 2 +
                        (Math.random() - 0.5) *
                        1.2
                );


            /*
            Avoid zero-length direction
            */

            if (
                direction.lengthSq() <
                0.0001
            ) {

                direction.set(
                    Math.random() - 0.5,
                    Math.random() - 0.5,
                    Math.random() - 0.5
                );

            }


            direction.normalize();


            /*
            -------------------------------------------------
            RANDOM EXPLOSION SPEED
            -------------------------------------------------
            */

            const speed =
                1.8 +
                Math.random() *
                    3.8;


            velocities.push(
                direction.x *
                    speed,

                direction.y *
                    speed,

                direction.z *
                    speed
            );


            /*
            -------------------------------------------------
            RANDOM VALUES

            Used later for organic floating motion.
            -------------------------------------------------
            */

            randoms.push(
                Math.random()
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

            randoms:
                new Float32Array(
                    randoms
                ),

        };

    }, []);


    /*
    =========================================================
    ORIGINAL POSITION COPY
    =========================================================
    */

    const originalPositions =
        useMemo(
            () =>
                new Float32Array(
                    data.positions
                ),
            [data]
        );


    /*
    =========================================================
    ANIMATION
    =========================================================
    */

    useFrame((state) => {

        if (
            !particlesRef.current
        ) {
            return;
        }


        const time =
            state.clock.getElapsedTime();


        /*
        =====================================================
        DETECT EXPLOSION START
        =====================================================
        */

        if (
            exploding &&
            !wasExplodingRef.current
        ) {

            /*
            IMPORTANT:

            Store the exact Three.js clock time
            when explosion begins.
            */

            explosionTimeRef.current =
                time;

            wasExplodingRef.current =
                true;

        }


        /*
        =====================================================
        RESET WHEN NOT EXPLODING
        =====================================================
        */

        if (!exploding) {

            wasExplodingRef.current =
                false;

            explosionTimeRef.current =
                null;

        }


        const geometry =
            particlesRef.current.geometry;


        const positionAttribute =
            geometry.attributes.position;


        const positions =
            positionAttribute.array;


        /*
        =====================================================
        NORMAL HEART
        =====================================================
        */

        if (!exploding) {

            for (
                let i = 0;
                i < positions.length;
                i++
            ) {

                positions[i] =
                    originalPositions[i];

            }


            /*
            -------------------------------------------------
            HEART FLOATING ROTATION
            -------------------------------------------------
            */

            particlesRef.current.rotation.y =
                Math.sin(
                    time * 0.35
                ) *
                0.08;


            particlesRef.current.rotation.x =
                Math.sin(
                    time * 0.25
                ) *
                0.025;


            particlesRef.current.rotation.z =
                Math.sin(
                    time * 0.5
                ) *
                0.015;


            /*
            -------------------------------------------------
            HEART BEAT
            -------------------------------------------------
            */

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


        /*
        =====================================================
        EXPLOSION
        =====================================================
        */

        /*
        IMPORTANT FIX:

        Do NOT use:

        time % 10

        Instead use the exact timestamp from the moment
        exploding became true.
        */

        const explosionStart =
            explosionTimeRef.current ??
            time;


        /*
        -----------------------------------------------------
        HOW LONG EXPLOSION LASTS
        -----------------------------------------------------
        */

        const explosionDuration =
            1.4;


        const elapsed =
            time -
            explosionStart;


        /*
        Progress:

        0 = just clicked
        1 = explosion completed
        */

        const explosionProgress =
            THREE.MathUtils.clamp(
                elapsed /
                    explosionDuration,
                0,
                1
            );


        /*
        =====================================================
        STRONG EXPLOSION EASING
        =====================================================
        */

        /*
        Starts very quickly and then slows down.
        */

        const eased =
            1 -
            Math.pow(
                1 -
                    explosionProgress,
                3
            );


        /*
        =====================================================
        MOVE EVERY PARTICLE
        =====================================================
        */

        for (
            let i = 0;
            i < positions.length;
            i += 3
        ) {

            const particleIndex =
                i / 3;


            /*
            -------------------------------------------------
            ORIGINAL POSITION
            -------------------------------------------------
            */

            const startX =
                originalPositions[i];

            const startY =
                originalPositions[
                    i + 1
                ];

            const startZ =
                originalPositions[
                    i + 2
                ];


            /*
            -------------------------------------------------
            VELOCITY
            -------------------------------------------------
            */

            const velocityX =
                data.velocities[
                    i
                ];

            const velocityY =
                data.velocities[
                    i + 1
                ];

            const velocityZ =
                data.velocities[
                    i + 2
                ];


            /*
            -------------------------------------------------
            EXPLOSION POSITION
            -------------------------------------------------
            */

            positions[i] =
                startX +
                velocityX *
                    eased;


            positions[i + 1] =
                startY +
                velocityY *
                    eased;


            positions[i + 2] =
                startZ +
                velocityZ *
                    eased;


            /*
            =================================================
            ORGANIC PARTICLE MOVEMENT
            =================================================
            */

            const random =
                data.randoms[
                    particleIndex
                ];


            /*
            Small horizontal movement
            */

            positions[i] +=
                Math.sin(
                    time * 2 +
                    particleIndex *
                        0.17
                ) *
                0.015 *
                explosionProgress;


            /*
            Small vertical movement
            */

            positions[i + 1] +=
                Math.cos(
                    time * 1.7 +
                    particleIndex *
                        0.13
                ) *
                0.015 *
                explosionProgress;


            /*
            Depth movement
            */

            positions[i + 2] +=
                Math.sin(
                    time * 1.4 +
                    random * 10
                ) *
                0.01 *
                explosionProgress;

        }


        positionAttribute.needsUpdate =
            true;


        /*
        =====================================================
        PARTICLE GROUP ROTATION
        =====================================================
        */

        particlesRef.current.rotation.y =
            Math.sin(
                time * 0.6
            ) *
            0.12;


        particlesRef.current.rotation.x =
            Math.sin(
                time * 0.45
            ) *
            0.08;


        particlesRef.current.rotation.z =
            explosionProgress *
            Math.PI *
            0.15;


        /*
        =====================================================
        PARTICLE GROUP SCALE
        =====================================================
        */

        /*
        Slight expansion during explosion.
        */

        const explosionScale =
            0.82 +
            explosionProgress *
                0.15;


        particlesRef.current.scale.set(
            explosionScale,
            explosionScale,
            explosionScale
        );

    });


    /*
    =========================================================
    RENDER
    =========================================================
    */

    return (
        <points
            ref={particlesRef}
            position={[
                0,
                0.55,
                0,
            ]}
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
                opacity={0.96}
                sizeAttenuation
                depthWrite={false}
                blending={
                    THREE.AdditiveBlending
                }
            />

        </points>
    );

};


export default HeartParticles;
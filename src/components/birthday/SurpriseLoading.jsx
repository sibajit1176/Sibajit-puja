import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

/* =========================================================
   HEART PARTICLE EXPLOSION
========================================================= */

const HeartExplosion = () => {
    const particlesRef = useRef();

    const data = useMemo(() => {
        const count = 2200;

        const positions = new Float32Array(count * 3);
        const velocities = new Float32Array(count * 3);
        const delays = new Float32Array(count);
        const sizes = new Float32Array(count);

        /*
        -----------------------------------------------------
        HEART EQUATION

        This creates the initial particles in a REAL
        mathematical heart shape.

        x = 16 sin³(t)
        y = 13cos(t)-5cos(2t)-2cos(3t)-cos(4t)
        -----------------------------------------------------
        */

        for (let i = 0; i < count; i++) {

            const t =
                Math.random() *
                Math.PI *
                2;

            /*
            Random radius allows particles to fill
            the heart instead of only creating outline.
            */

            const fill =
                Math.sqrt(
                    Math.random()
                );

            const x =
                16 *
                Math.pow(
                    Math.sin(t),
                    3
                ) *
                fill;

            const y =
                (
                    13 *
                        Math.cos(t) -
                    5 *
                        Math.cos(2 * t) -
                    2 *
                        Math.cos(3 * t) -
                    Math.cos(4 * t)
                ) *
                fill;

            /*
            Scale heart for phone screen.
            */

            const heartX =
                x * 0.105;

            const heartY =
                y * 0.105;

            /*
            Slight 3D depth.
            */

            const heartZ =
                (Math.random() - 0.5) *
                0.35;

            positions[i * 3] =
                heartX;

            positions[i * 3 + 1] =
                heartY;

            positions[i * 3 + 2] =
                heartZ;


            /*
            -------------------------------------------------
            EXPLOSION DIRECTION

            Particles travel mostly upward and sideways.

            This gives a cinematic "heart burst"
            rather than a flat rectangular explosion.
            -------------------------------------------------
            */

            const direction =
                new THREE.Vector3(
                    heartX * 1.15 +
                        (Math.random() - 0.5) *
                            0.45,

                    heartY * 0.8 +
                        0.8 +
                        Math.random() *
                            0.7,

                    heartZ +
                        (Math.random() - 0.5) *
                            0.8
                );

            direction.normalize();


            const speed =
                1.8 +
                Math.random() *
                    3.2;


            velocities[i * 3] =
                direction.x *
                speed;

            velocities[i * 3 + 1] =
                direction.y *
                speed;

            velocities[i * 3 + 2] =
                direction.z *
                speed;


            /*
            Some particles start slightly later.
            This makes the explosion feel organic.
            */

            delays[i] =
                Math.random() *
                0.45;


            /*
            Different particle sizes.
            */

            sizes[i] =
                0.025 +
                Math.random() *
                    0.055;
        }

        return {
            positions,
            velocities,
            delays,
            sizes,
        };

    }, []);


    useFrame((state) => {

        if (!particlesRef.current) {
            return;
        }

        const elapsed =
            state.clock.getElapsedTime();


        const geometry =
            particlesRef.current.geometry;

        const positionAttribute =
            geometry.attributes.position;

        const positions =
            positionAttribute.array;


        for (
            let i = 0;
            i < positions.length;
            i += 3
        ) {

            const particleIndex =
                i / 3;

            const delay =
                data.delays[
                    particleIndex
                ];


            /*
            Individual particle time.
            */

            const localTime =
                Math.max(
                    0,
                    elapsed - 0.35 - delay
                );


            /*
            -------------------------------------------------
            MOVE PARTICLES OUTWARD
            -------------------------------------------------
            */

            positions[i] +=
                data.velocities[i] *
                0.0025;

            positions[i + 1] +=
                data.velocities[i + 1] *
                0.0025;

            positions[i + 2] +=
                data.velocities[i + 2] *
                0.0025;


            /*
            -------------------------------------------------
            PARTICLE DRAG
            -------------------------------------------------
            */

            data.velocities[i] *= 0.992;
            data.velocities[i + 1] *= 0.992;
            data.velocities[i + 2] *= 0.992;


            /*
            -------------------------------------------------
            FLOATING MOTION

            Adds a little natural movement after
            the main explosion.
            -------------------------------------------------
            */

            positions[i] +=
                Math.sin(
                    elapsed * 1.5 +
                    particleIndex
                ) *
                0.0004;

            positions[i + 1] +=
                Math.cos(
                    elapsed * 1.2 +
                    particleIndex
                ) *
                0.00035;


            /*
            Slowly pull particles upward.

            This makes the final scene look like
            glowing particles floating away.
            */

            if (localTime > 0.5) {
                positions[i + 1] +=
                    0.00035;
            }
        }


        positionAttribute.needsUpdate = true;


        /*
        Gentle rotation of entire particle field.
        */

        particlesRef.current.rotation.z =
            Math.sin(
                elapsed * 0.2
            ) * 0.035;
    });


    return (
        <points
            ref={particlesRef}
        >

            <bufferGeometry>

                <bufferAttribute
                    attach="attributes-position"
                    count={
                        data.positions.length / 3
                    }
                    array={data.positions}
                    itemSize={3}
                />

            </bufferGeometry>


            <pointsMaterial
                color="#ff5bbf"
                size={0.055}
                transparent
                opacity={0.95}
                sizeAttenuation
                depthWrite={false}
                blending={
                    THREE.AdditiveBlending
                }
            />

        </points>
    );
};


/* =========================================================
   EXTRA FLOATING HEART PARTICLES
========================================================= */

const FloatingHeartParticles = () => {

    const ref = useRef();


    const positions = useMemo(() => {

        const count = 260;

        const array =
            new Float32Array(
                count * 3
            );


        for (
            let i = 0;
            i < count;
            i++
        ) {

            /*
            Spread across the entire
            phone screen.
            */

            array[i * 3] =
                (Math.random() - 0.5) *
                5.5;

            array[i * 3 + 1] =
                -1 +
                Math.random() *
                    5.5;

            array[i * 3 + 2] =
                (Math.random() - 0.5) *
                2;
        }


        return array;

    }, []);


    useFrame((state) => {

        if (!ref.current) {
            return;
        }


        const time =
            state.clock.getElapsedTime();


        ref.current.rotation.z =
            Math.sin(
                time * 0.15
            ) * 0.04;
    });


    return (
        <points ref={ref}>

            <bufferGeometry>

                <bufferAttribute
                    attach="attributes-position"
                    count={
                        positions.length / 3
                    }
                    array={positions}
                    itemSize={3}
                />

            </bufferGeometry>


            <pointsMaterial
                color="#ff8bd5"
                size={0.025}
                transparent
                opacity={0.65}
                depthWrite={false}
                blending={
                    THREE.AdditiveBlending
                }
            />

        </points>
    );
};


/* =========================================================
   LOADING SCREEN
========================================================= */

const SurpriseLoading = () => {

    return (
        <section
            className="
                relative
                h-[100svh]
                min-h-[640px]
                w-full
                overflow-hidden
                bg-[#03000a]
            "
        >

            {/* =================================================
                THREE.JS BACKGROUND
            ================================================= */}

            <div className="absolute inset-0">

                <Canvas
                    dpr={[1, 1.5]}
                    camera={{
                        position: [0, 0, 6],
                        fov: 50,
                    }}
                    gl={{
                        antialias: true,
                        alpha: true,
                    }}
                >

                    {/* LIGHT */}

                    <ambientLight
                        intensity={0.25}
                    />

                    <pointLight
                        position={[
                            0,
                            1,
                            3,
                        ]}
                        intensity={7}
                        color="#ff3fac"
                    />


                    {/* STARS */}

                    <Stars
                        radius={45}
                        depth={35}
                        count={1000}
                        factor={2}
                        saturation={0}
                        fade
                        speed={0.2}
                    />


                    {/* MAIN HEART EXPLOSION */}

                    <HeartExplosion />


                    {/* SMALL FLOATING PARTICLES */}

                    <FloatingHeartParticles />

                </Canvas>

            </div>


            {/* =================================================
                BACKGROUND VIGNETTE
            ================================================= */}

            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-[radial-gradient(circle_at_50%_38%,rgba(255,45,170,0.12),transparent_30%,rgba(3,0,10,0.78)_82%)]
                "
            />


            {/* =================================================
                LOADING CONTENT
            ================================================= */}

            <div
                className="
                    pointer-events-none
                    absolute
                    inset-x-0
                    bottom-[18%]
                    z-20
                    flex
                    flex-col
                    items-center
                    justify-center
                    px-6
                    text-center
                "
            >

                {/* LOADING MESSAGE */}

                <p
                    className="
                        text-[21px]
                        font-medium
                        tracking-[0.02em]
                        text-pink-100
                        drop-shadow-[0_0_18px_rgba(255,80,190,0.75)]
                        sm:text-3xl
                    "
                >
                    Loading Your Surprise
                </p>


                {/* HEART */}

                <div
                    className="
                        mt-6
                        text-[52px]
                        leading-none
                        text-pink-400
                        drop-shadow-[0_0_25px_rgba(255,40,180,0.95)]
                        animate-pulse
                    "
                >
                    ♥
                </div>


                {/* LOADING DOTS */}

                <div
                    className="
                        mt-5
                        flex
                        items-center
                        gap-2
                    "
                >

                    <span
                        className="
                            h-1.5
                            w-1.5
                            rounded-full
                            bg-pink-300
                            animate-bounce
                        "
                    />

                    <span
                        className="
                            h-1.5
                            w-1.5
                            rounded-full
                            bg-pink-300
                            animate-bounce
                            [animation-delay:150ms]
                        "
                    />

                    <span
                        className="
                            h-1.5
                            w-1.5
                            rounded-full
                            bg-pink-300
                            animate-bounce
                            [animation-delay:300ms]
                        "
                    />

                </div>

            </div>

        </section>
    );
};

export default SurpriseLoading;
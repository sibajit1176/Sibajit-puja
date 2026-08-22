import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const PARTICLE_COUNT = 900;

const HeartExplosion = ({ active, onComplete }) => {
    const pointsRef = useRef();

    const startTime = useRef(null);
    const completed = useRef(false);

    const particles = useMemo(() => {

        const positions = new Float32Array(
            PARTICLE_COUNT * 3
        );

        const velocities = new Float32Array(
            PARTICLE_COUNT * 3
        );

        const sizes = new Float32Array(
            PARTICLE_COUNT
        );


        for (let i = 0; i < PARTICLE_COUNT; i++) {

            /*
             * Create particles around a heart shape.
             */

            const t =
                (Math.PI * 2 * i) /
                PARTICLE_COUNT;

            const x =
                16 *
                Math.pow(Math.sin(t), 3);

            const y =
                13 * Math.cos(t) -
                5 * Math.cos(2 * t) -
                2 * Math.cos(3 * t) -
                Math.cos(4 * t);


            const index = i * 3;


            /*
             * Initial heart position
             */

            positions[index] =
                x * 0.055 +
                (Math.random() - 0.5) * 0.04;

            positions[index + 1] =
                y * 0.055 +
                (Math.random() - 0.5) * 0.04;

            positions[index + 2] =
                (Math.random() - 0.5) * 0.25;


            /*
             * Explosion direction
             */

            const direction = new THREE.Vector3(
                positions[index],
                positions[index + 1],
                positions[index + 2]
            );


            if (direction.length() < 0.1) {
                direction.set(
                    Math.random() - 0.5,
                    Math.random() - 0.5,
                    Math.random() - 0.5
                );
            }


            direction.normalize();


            const speed =
                1.2 +
                Math.random() * 2.5;


            velocities[index] =
                direction.x * speed;

            velocities[index + 1] =
                direction.y * speed;

            velocities[index + 2] =
                direction.z * speed;


            sizes[i] =
                0.025 +
                Math.random() * 0.045;
        }


        return {
            positions,
            velocities,
            sizes,
        };

    }, []);


    /*
     * Do not render anything before
     * the surprise button is clicked.
     */

    useEffect(() => {

        if (!active) {
            startTime.current = null;
            completed.current = false;
        }

    }, [active]);


    useFrame((state) => {

        if (!active) {
            return;
        }


        if (!pointsRef.current) {
            return;
        }


        /*
         * Start timer.
         */

        if (startTime.current === null) {
            startTime.current =
                state.clock.getElapsedTime();
        }


        const elapsed =
            state.clock.getElapsedTime() -
            startTime.current;


        const position =
            pointsRef.current.geometry.attributes.position;


        /*
         * --------------------------------------
         * PHASE 1
         *
         * Heart is visible as particles.
         * 0 - 0.8 seconds
         * --------------------------------------
         */

        if (elapsed < 0.8) {

            const progress =
                elapsed / 0.8;


            pointsRef.current.material.opacity =
                Math.min(
                    1,
                    progress * 2
                );

            return;
        }


        /*
         * --------------------------------------
         * PHASE 2
         *
         * Explosion
         *
         * 0.8 - 2.5 seconds
         * --------------------------------------
         */

        const explosionTime =
            elapsed - 0.8;


        const explosionProgress =
            Math.min(
                explosionTime / 1.7,
                1
            );


        for (
            let i = 0;
            i < PARTICLE_COUNT;
            i++
        ) {

            const index = i * 3;


            position.array[index] +=
                particles.velocities[index] *
                0.016;

            position.array[index + 1] +=
                particles.velocities[index + 1] *
                0.016;

            position.array[index + 2] +=
                particles.velocities[index + 2] *
                0.016;


            /*
             * Gravity / floating effect
             */

            position.array[index + 1] -=
                explosionProgress *
                0.0015;
        }


        position.needsUpdate = true;


        /*
         * Fade particles gradually.
         */

        pointsRef.current.material.opacity =
            1 -
            explosionProgress * 0.8;


        /*
         * --------------------------------------
         * PHASE 3
         *
         * Fade away
         * --------------------------------------
         */

        if (
            explosionProgress >= 1 &&
            !completed.current
        ) {

            completed.current = true;


            pointsRef.current.material.opacity = 0;


            /*
             * Give the user a tiny moment
             * before revealing memories.
             */

            setTimeout(() => {

                if (onComplete) {
                    onComplete();
                }

            }, 350);
        }

    });


    /*
     * Don't show explosion before clicking.
     */

    if (!active) {
        return null;
    }


    return (

        <points ref={pointsRef}>

            <bufferGeometry>

                <bufferAttribute
                    attach="attributes-position"
                    args={[
                        particles.positions,
                        3,
                    ]}
                />

            </bufferGeometry>


            <pointsMaterial
                size={0.055}
                color="#ff4db8"
                transparent
                opacity={1}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />

        </points>
    );
};

export default HeartExplosion;
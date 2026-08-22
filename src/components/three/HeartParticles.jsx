import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const HeartParticles = () => {
    const particlesRef = useRef();

    const particles = useMemo(() => {
        const points = [];

        /*
        ==================================================
        HEART OUTLINE SHAPE
        ==================================================
        */

        const heartShape = [];

        const segments = 400;

        for (let i = 0; i < segments; i++) {
            const t =
                (Math.PI * 2 * i) /
                segments;

            // Classic mathematical heart
            const x =
                16 *
                Math.pow(Math.sin(t), 3);

            const y =
                13 * Math.cos(t) -
                5 * Math.cos(2 * t) -
                2 * Math.cos(3 * t) -
                Math.cos(4 * t);

            heartShape.push({
                x: x / 16,
                y: y / 16,
            });
        }

        /*
        ==================================================
        CHECK WHETHER POINT IS INSIDE HEART
        ==================================================
        */

        const isInsideHeart = (x, y) => {
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
        ==================================================
        INNER HEART PARTICLES
        ==================================================
        */

        const innerCount = 1800;

        let created = 0;

        while (
            created < innerCount
        ) {
            const x =
                (Math.random() * 2 - 1) *
                1.15;

            const y =
                (Math.random() * 2 - 1) *
                1.15;

            if (
                !isInsideHeart(
                    x,
                    y
                )
            ) {
                continue;
            }

            /*
            Slight organic depth.
            This makes the heart feel
            more 3D instead of flat.
            */

            const z =
                (Math.random() - 0.5) *
                0.35;

            points.push(
                x,
                y,
                z
            );

            created++;
        }

        /*
        ==================================================
        BRIGHT HEART OUTLINE
        ==================================================
        */

        const outlineCount = 1200;

        for (
            let i = 0;
            i < outlineCount;
            i++
        ) {
            const index =
                Math.floor(
                    Math.random() *
                        heartShape.length
                );

            const point =
                heartShape[index];

            /*
            Small random spread
            around the outline.
            */

            const spread =
                0.012 +
                Math.random() *
                    0.018;

            points.push(
                point.x +
                    (Math.random() - 0.5) *
                        spread,

                point.y +
                    (Math.random() - 0.5) *
                        spread,

                (Math.random() - 0.5) *
                    0.3
            );
        }

        /*
        ==================================================
        EXTRA SPARKLE PARTICLES
        ==================================================
        
        A few particles are placed
        around the heart outline to
        create the magical glowing look.
        */

        const sparkleCount = 180;

        for (
            let i = 0;
            i < sparkleCount;
            i++
        ) {
            const index =
                Math.floor(
                    Math.random() *
                        heartShape.length
                );

            const point =
                heartShape[index];

            const distance =
                0.03 +
                Math.random() *
                    0.12;

            const angle =
                Math.random() *
                Math.PI *
                2;

            points.push(
                point.x +
                    Math.cos(angle) *
                        distance,

                point.y +
                    Math.sin(angle) *
                        distance,

                (Math.random() - 0.5) *
                    0.4
            );
        }

        return new Float32Array(
            points
        );
    }, []);

    /*
    ==================================================
    HEART ANIMATION
    ==================================================
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
        ----------------------------------------------
        Gentle 3D rotation
        ----------------------------------------------
        */

        particlesRef.current.rotation.y =
            Math.sin(
                time * 0.35
            ) * 0.08;

        particlesRef.current.rotation.x =
            Math.sin(
                time * 0.25
            ) * 0.025;

        /*
        ----------------------------------------------
        Heartbeat
        ----------------------------------------------
        */

        const pulse =
            1 +
            Math.sin(
                time * 3
            ) *
                0.025;

        particlesRef.current.scale.set(
            0.9 * pulse,
            0.9 * pulse,
            0.9 * pulse
        );

        /*
        ----------------------------------------------
        Gentle floating
        ----------------------------------------------
        */

        particlesRef.current.position.y =
            0.7 +
            Math.sin(
                time * 0.8
            ) *
                0.025;
    });

    /*
    ==================================================
    RENDER
    ==================================================
    */

    return (
        <points
            ref={particlesRef}
            position={[0, 0.7, 0]}
        >
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={
                        particles.length / 3
                    }
                    array={particles}
                    itemSize={3}
                />
            </bufferGeometry>

            <pointsMaterial
                color="#ff5fc4"
                size={0.038}
                sizeAttenuation
                transparent
                opacity={0.95}
                depthWrite={false}
                blending={
                    THREE.AdditiveBlending
                }
            />
        </points>
    );
};

export default HeartParticles;
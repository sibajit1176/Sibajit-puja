import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const FloatingParticles = () => {

    const particlesRef = useRef();

    const particles = useMemo(() => {

        const count = 500;

        const positions =
            new Float32Array(
                count * 3
            );

        for (let i = 0; i < count; i++) {

            const radius =
                2.5 +
                Math.random() * 3.5;

            const angle =
                Math.random() *
                Math.PI *
                2;

            positions[i * 3] =
                Math.cos(angle) *
                radius;

            positions[i * 3 + 1] =
                Math.sin(angle) *
                    radius *
                    0.8 +
                0.2;

            positions[i * 3 + 2] =
                (Math.random() - 0.5) *
                2;
        }

        return positions;

    }, []);

    useFrame((state) => {

        if (!particlesRef.current)
            return;

        const time =
            state.clock.getElapsedTime();

        particlesRef.current.rotation.y =
            time * 0.025;

        particlesRef.current.rotation.z =
            Math.sin(time * 0.1) *
            0.03;
    });

    return (
        <points ref={particlesRef}>

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
                color="#ff8bd4"
                size={0.025}
                transparent
                opacity={0.8}
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
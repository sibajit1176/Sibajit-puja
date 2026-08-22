import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const FloatingParticles = ({ count = 90 }) => {
    const particlesRef = useRef();

    const positions = useMemo(() => {
        const data = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            data[i * 3] =
                (Math.random() - 0.5) * 5;

            data[i * 3 + 1] =
                (Math.random() - 0.5) * 5;

            data[i * 3 + 2] =
                (Math.random() - 0.5) * 2;
        }

        return data;
    }, [count]);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        if (!particlesRef.current) return;

        particlesRef.current.rotation.y =
            time * 0.025;

        particlesRef.current.rotation.x =
            Math.sin(time * 0.15) * 0.03;
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>

            <pointsMaterial
                color="#ff69b4"
                size={0.025}
                transparent
                opacity={0.65}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
};

export default FloatingParticles;
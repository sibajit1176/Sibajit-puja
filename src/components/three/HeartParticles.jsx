import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const HeartParticles = ({ count = 700 }) => {
    const particlesRef = useRef();

    const positions = useMemo(() => {
        const data = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const t = Math.random() * Math.PI * 2;

            // Heart equation
            const x =
                16 * Math.pow(Math.sin(t), 3);

            const y =
                13 * Math.cos(t) -
                5 * Math.cos(2 * t) -
                2 * Math.cos(3 * t) -
                Math.cos(4 * t);

            // Random fill
            const fill = Math.sqrt(Math.random());

            const px = (x / 16) * fill;

            const py = (y / 16) * fill;

            const pz =
                (Math.random() - 0.5) * 0.35;

            data[i * 3] = px;
            data[i * 3 + 1] = py;
            data[i * 3 + 2] = pz;
        }

        return data;
    }, [count]);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        if (!particlesRef.current) return;

        // Very gentle movement
        particlesRef.current.rotation.y =
            Math.sin(time * 0.3) * 0.08;

        particlesRef.current.position.y =
            Math.sin(time * 0.8) * 0.03;
    });

    return (
        <points
            ref={particlesRef}
            position={[0, 0.75, 0]}
            scale={0.095}
        >
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>

            <pointsMaterial
                color="#ffd1ee"
                size={0.035}
                sizeAttenuation
                transparent
                opacity={0.9}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
};

export default HeartParticles;
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Heart3D = () => {
    const groupRef = useRef();

    useFrame((state) => {
        if (!groupRef.current) return;

        const time = state.clock.getElapsedTime();

        // Very subtle floating movement
        groupRef.current.position.y =
            0.65 + Math.sin(time * 0.8) * 0.035;

        // Subtle 3D rotation
        groupRef.current.rotation.y =
            Math.sin(time * 0.35) * 0.08;

        groupRef.current.rotation.x =
            Math.sin(time * 0.25) * 0.025;

        // Gentle heartbeat
        const beat =
            1 +
            Math.sin(time * 3) * 0.018 +
            Math.sin(time * 6) * 0.006;

        groupRef.current.scale.set(
            beat,
            beat,
            beat
        );
    });

    return (
        <group
            ref={groupRef}
            position={[0, 0.65, 0]}
        />
    );
};

export default Heart3D;
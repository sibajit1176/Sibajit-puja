import { Canvas } from "@react-three/fiber";

import {
    Stars,
} from "@react-three/drei";

import {
    EffectComposer,
    Bloom,
} from "@react-three/postprocessing";

import Heart3D from "../three/Heart3D";
import HeartParticles from "../three/HeartParticles";
import FloatingParticles from "../three/FloatingParticles";

const HeroSection = ({
    onOpen,
}) => {

    return (
        <section
            className="
                relative
                h-[100svh]
                min-h-[640px]
                w-full
                overflow-hidden
                bg-[#05020d]
            "
        >

            {/* =====================================
                THREE.JS SCENE
            ====================================== */}

            <div
                className="
                    absolute
                    inset-0
                    pointer-events-none
                "
            >

                <Canvas
                    dpr={[1, 1.5]}
                    camera={{
                        position: [0, 0, 6],
                        fov: 48,
                    }}
                    gl={{
                        antialias: true,
                        alpha: true,
                    }}
                >

                    {/* LIGHT */}

                    <ambientLight
                        intensity={0.3}
                    />

                    <pointLight
                        position={[0, 2, 3]}
                        intensity={4}
                        color="#ff4db8"
                    />

                    {/* STARS */}

                    <Stars
                        radius={50}
                        depth={35}
                        count={1200}
                        factor={2}
                        saturation={0}
                        fade
                        speed={0.25}
                    />

                    {/* FLOATING PARTICLES */}

                    <FloatingParticles />

                    {/* HEART */}

                    <Heart3D />

                    <HeartParticles />

                    {/* GLOW */}

                    <EffectComposer>

                        <Bloom
                            intensity={1.8}
                            luminanceThreshold={0.05}
                            luminanceSmoothing={0.8}
                            mipmapBlur
                        />

                    </EffectComposer>

                </Canvas>

            </div>


            {/* =====================================
                PURPLE SPACE GLOW
            ====================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-[radial-gradient(circle_at_50%_42%,rgba(255,20,147,0.16),transparent_30%,rgba(5,2,13,0.85)_85%)]
                "
            />


            {/* =====================================
                CONTENT
            ====================================== */}

            <div
                className="
                    relative
                    z-10
                    flex
                    h-full
                    flex-col
                    items-center
                    justify-end
                    px-5
                    pb-[9vh]
                    text-center
                "
            >

                {/* TITLE */}

                <h1
                    className="
                        max-w-[320px]
                        text-[28px]
                        font-medium
                        leading-tight
                        tracking-tight
                        text-white
                        drop-shadow-[0_0_18px_rgba(255,80,180,0.35)]
                        sm:text-4xl
                    "
                >

                    Something Special

                    <span
                        className="
                            mt-4
                            block
                            text-[25px]
                            text-pink-200
                            sm:text-3xl
                        "
                    >
                        For You

                        <span
                            className="
                                ml-2
                                text-pink-400
                            "
                        >
                            ♥
                        </span>

                    </span>

                </h1>


                {/* BUTTON */}

                <button
                    onClick={onOpen}
                    className="
                        mt-7
                        rounded-full
                        border
                        border-pink-300/40
                        bg-gradient-to-r
                        from-pink-500
                        to-pink-400
                        px-7
                        py-3.5
                        text-[14px]
                        font-medium
                        tracking-wide
                        text-white
                        shadow-[0_0_30px_rgba(255,65,170,0.55)]
                        transition-all
                        duration-300
                        hover:scale-105
                        hover:shadow-[0_0_45px_rgba(255,65,170,0.8)]
                        active:scale-95
                    "
                >

                    Open Your Surprise

                    <span className="ml-2">
                        ♥
                    </span>

                </button>

            </div>

        </section>
    );
};

export default HeroSection;
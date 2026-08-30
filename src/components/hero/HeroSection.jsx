import {
    useEffect,
    useState,
} from "react";

import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

import {
    EffectComposer,
    Bloom,
} from "@react-three/postprocessing";

import Heart3D from "../three/Heart3D";
import HeartParticles from "../three/HeartParticles";
import FloatingParticles from "../three/FloatingParticles";

import CosmicBackground from "../common/CosmicBackground";


const HeroSection = ({ onOpen }) => {

    const [stage, setStage] =
        useState("hero");


    /* =====================================================
       OPEN SURPRISE
    ===================================================== */

    const handleOpen = () => {

        if (stage !== "hero") {
            return;
        }

        setStage("exploding");


        /*
        Explosion
        */

        setTimeout(() => {

            setStage("loading");

        }, 1200);


        /*
        Birthday screen
        */

        setTimeout(() => {

            if (onOpen) {
                onOpen();
            }

        }, 3600);

    };


    /* =====================================================
       BODY SCROLL
    ===================================================== */

    useEffect(() => {

        document.body.style.overflow =
            stage === "hero"
                ? ""
                : "hidden";


        return () => {

            document.body.style.overflow =
                "";

        };

    }, [stage]);


    /* =====================================================
       LOADING SCREEN
    ===================================================== */

    if (stage === "loading") {

        return (
            <section
                className="
                    fixed
                    inset-0
                    z-[9999]
                    h-[100svh]
                    min-h-[640px]
                    w-full
                    overflow-hidden
                    bg-[#030007]
                "
            >

                {/* GALAXY */}

                <CosmicBackground
                    loading
                />


                {/* =================================================
                    THREE.JS BACKGROUND
                ================================================= */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        inset-0
                    "
                >

                    <Canvas
                        dpr={[1, 1.5]}
                        camera={{
                            position: [
                                0,
                                0,
                                6,
                            ],
                            fov: 48,
                        }}
                        gl={{
                            antialias: true,
                            alpha: true,
                        }}
                    >

                        <ambientLight
                            intensity={0.15}
                        />

                        <pointLight
                            position={[
                                0,
                                0.5,
                                3,
                            ]}
                            intensity={4}
                            color="#ff3fac"
                        />

                        <Stars
                            radius={50}
                            depth={35}
                            count={1000}
                            factor={1.8}
                            saturation={0}
                            fade
                            speed={0.25}
                        />

                        <FloatingParticles />

                        <EffectComposer>

                            <Bloom
                                intensity={2.2}
                                luminanceThreshold={0.03}
                                luminanceSmoothing={0.8}
                                mipmapBlur
                            />

                        </EffectComposer>

                    </Canvas>

                </div>


                {/* =================================================
                    CENTER GLOW
                ================================================= */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        left-1/2
                        top-[37%]
                        h-[230px]
                        w-[230px]
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-full
                        bg-pink-500/10
                        blur-[70px]
                        animate-[pulse_3s_ease-in-out_infinite]
                    "
                />


                {/* =================================================
                    LOADING CONTENT
                ================================================= */}

                <div
                    className="
                        relative
                        z-20
                        flex
                        h-full
                        w-full
                        flex-col
                        items-center
                        justify-center
                        px-6
                        text-center
                    "
                >

                    {/* HEART */}

                    <div
                        className="
                            mb-8
                            flex
                            h-24
                            w-24
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-pink-300/10
                            bg-pink-500/[0.04]
                            shadow-[0_0_80px_rgba(255,40,170,0.35)]
                            animate-[pulse_2s_ease-in-out_infinite]
                        "
                    >

                        <span
                            className="
                                text-[56px]
                                leading-none
                                text-pink-400
                                drop-shadow-[0_0_30px_rgba(255,60,180,1)]
                                animate-[heartbeat_1.4s_ease-in-out_infinite]
                            "
                        >
                            ♥
                        </span>

                    </div>


                    {/* MAIN TEXT */}

                    <h2
                        className="
                            text-[24px]
                            font-medium
                            tracking-wide
                            text-white
                            drop-shadow-[0_0_25px_rgba(255,80,190,0.65)]
                        "
                    >
                        Loading Your Surprise
                    </h2>


                    {/* DECORATIVE LINE */}

                    <div
                        className="
                            mt-4
                            flex
                            items-center
                            gap-3
                        "
                    >

                        <span
                            className="
                                h-px
                                w-12
                                bg-gradient-to-r
                                from-transparent
                                to-pink-400/50
                            "
                        />

                        <span
                            className="
                                text-[10px]
                                text-pink-300/70
                                animate-pulse
                            "
                        >
                            ✦
                        </span>

                        <span
                            className="
                                h-px
                                w-12
                                bg-gradient-to-l
                                from-transparent
                                to-pink-400/50
                            "
                        />

                    </div>


                    {/* LOADING DOTS */}

                    <div
                        className="
                            mt-7
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
                                shadow-[0_0_12px_rgba(255,100,210,1)]
                                animate-[loadingDot_1.4s_ease-in-out_infinite]
                            "
                        />

                        <span
                            className="
                                h-1.5
                                w-1.5
                                rounded-full
                                bg-pink-300
                                shadow-[0_0_12px_rgba(255,100,210,1)]
                                animate-[loadingDot_1.4s_ease-in-out_0.2s_infinite]
                            "
                        />

                        <span
                            className="
                                h-1.5
                                w-1.5
                                rounded-full
                                bg-pink-300
                                shadow-[0_0_12px_rgba(255,100,210,1)]
                                animate-[loadingDot_1.4s_ease-in-out_0.4s_infinite]
                            "
                        />

                    </div>

                </div>

            </section>
        );
    }


    /* =====================================================
       HERO SCREEN
    ===================================================== */

    return (
        <section
            className="
                relative
                h-[100svh]
                min-h-[640px]
                w-full
                overflow-hidden
                bg-[#030007]
            "
        >

            {/* =================================================
                ANIMATED GALAXY BACKGROUND
            ================================================= */}

            <CosmicBackground />


            {/* =================================================
                THREE.JS
            ================================================= */}

            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                "
            >

                <Canvas
                    dpr={[1, 1.5]}
                    camera={{
                        position: [
                            0,
                            0,
                            6,
                        ],
                        fov: 48,
                    }}
                    gl={{
                        antialias: true,
                        alpha: true,
                    }}
                >

                    <ambientLight
                        intensity={0.25}
                    />

                    <pointLight
                        position={[
                            0,
                            2,
                            3,
                        ]}
                        intensity={5}
                        color="#ff3fac"
                    />

                    <Stars
                        radius={50}
                        depth={35}
                        count={1000}
                        factor={1.8}
                        saturation={0}
                        fade
                        speed={0.2}
                    />

                    <FloatingParticles />

                    {/* =================================================
                        HEART
                    ================================================= */}

                    <group
                        scale={
                            stage === "exploding"
                                ? 1.15
                                : 1
                        }
                    >

                        <Heart3D
                            exploding={
                                stage ===
                                "exploding"
                            }
                        />

                        <HeartParticles
                            exploding={
                                stage ===
                                "exploding"
                            }
                        />

                    </group>


                    {/* =================================================
                        BLOOM
                    ================================================= */}

                    <EffectComposer>

                        <Bloom
                            intensity={
                                stage ===
                                "exploding"
                                    ? 3.5
                                    : 2
                            }
                            luminanceThreshold={0.03}
                            luminanceSmoothing={0.8}
                            mipmapBlur
                        />

                    </EffectComposer>

                </Canvas>

            </div>


            {/* =================================================
                EXTRA HEART GLOW
            ================================================= */}

            <div
                className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-[35%]
                    h-[220px]
                    w-[220px]
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-pink-500/[0.06]
                    blur-[70px]
                    animate-[pulse_3s_ease-in-out_infinite]
                "
            />


            {/* =================================================
                HERO CONTENT
            ================================================= */}

            {stage === "hero" && (

                <div
                    className="
                        relative
                        z-20
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

                    <h1
                        className="
                            max-w-[320px]
                            text-[28px]
                            font-medium
                            leading-tight
                            tracking-tight
                            text-white
                            drop-shadow-[0_0_22px_rgba(255,80,180,0.45)]
                        "
                    >

                        Something Special

                        <span
                            className="
                                mt-3
                                block
                                text-[25px]
                                text-pink-200
                            "
                        >
                            For You

                            <span
                                className="
                                    ml-2
                                    text-pink-400
                                    drop-shadow-[0_0_15px_rgba(255,50,180,1)]
                                "
                            >
                                ♥
                            </span>

                        </span>

                    </h1>


                    {/* =================================================
                        BUTTON
                    ================================================= */}

                    <button
                        onClick={handleOpen}
                        className="
                            relative
                            mt-7
                            overflow-hidden
                            rounded-full
                            border
                            border-pink-200/40
                            bg-gradient-to-r
                            from-pink-600
                            via-pink-500
                            to-fuchsia-500
                            px-8
                            py-3.5
                            text-[14px]
                            font-medium
                            tracking-wide
                            text-white
                            shadow-[0_0_30px_rgba(255,65,170,0.55)]
                            transition-all
                            duration-300
                            hover:scale-105
                            hover:shadow-[0_0_50px_rgba(255,65,170,0.85)]
                            active:scale-95
                        "
                    >

                        {/* Moving shine */}

                        <span
                            className="
                                absolute
                                inset-y-0
                                -left-[100%]
                                w-[70%]
                                rotate-[20deg]
                                bg-white/20
                                blur-md
                                animate-[buttonShine_3.5s_ease-in-out_infinite]
                            "
                        />

                        <span className="relative z-10">
                            Open Your Surprise
                            <span className="ml-2">
                                ♥
                            </span>
                        </span>

                    </button>

                </div>

            )}


            {/* =================================================
                EXPLOSION FLASH
            ================================================= */}

            {stage === "exploding" && (

                <>
                    <div
                        className="
                            pointer-events-none
                            absolute
                            inset-0
                            z-30
                            bg-[radial-gradient(circle_at_center,rgba(255,170,230,0.45),rgba(255,40,170,0.12)_25%,transparent_60%)]
                            animate-pulse
                        "
                    />

                    <div
                        className="
                            pointer-events-none
                            absolute
                            left-1/2
                            top-[35%]
                            z-30
                            h-[100px]
                            w-[100px]
                            -translate-x-1/2
                            -translate-y-1/2
                            rounded-full
                            border
                            border-pink-200/50
                            shadow-[0_0_80px_rgba(255,60,190,0.9)]
                            animate-[ping_1.1s_ease-out_infinite]
                        "
                    />
                </>

            )}

        </section>
    );
};

export default HeroSection;
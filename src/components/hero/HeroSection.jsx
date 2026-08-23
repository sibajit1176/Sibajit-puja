import { useEffect, useState } from "react";

import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import {
    EffectComposer,
    Bloom,
} from "@react-three/postprocessing";

import Heart3D from "../three/Heart3D";
import HeartParticles from "../three/HeartParticles";
import FloatingParticles from "../three/FloatingParticles";

const HeroSection = ({ onOpen }) => {

    const [stage, setStage] = useState("hero");

    /*
    =====================================================
    OPEN SURPRISE
    =====================================================
    */

    const handleOpen = () => {

        if (stage !== "hero") return;

        // Start explosion
        setStage("exploding");

        /*
        After explosion animation,
        show loading screen.
        */

        setTimeout(() => {
            setStage("loading");
        }, 1200);

        /*
        After loading animation,
        open birthday screen.
        */

        setTimeout(() => {

            if (onOpen) {
                onOpen();
            }

        }, 3600);
    };


    /*
    =====================================================
    BODY SCROLL CONTROL
    =====================================================
    */

    useEffect(() => {

        if (stage !== "hero") {

            document.body.style.overflow = "hidden";

        } else {

            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };

    }, [stage]);


    /*
    =====================================================
    LOADING SCREEN
    =====================================================
    */

    if (stage === "loading") {

        return (
            <section
                className="
                    fixed
                    inset-0
                    z-[9999]
                    flex
                    h-[100svh]
                    min-h-[640px]
                    w-full
                    items-center
                    justify-center
                    overflow-hidden
                    bg-[#05020d]
                "
            >

                {/* BACKGROUND */}

                <div
                    className="
                        absolute
                        inset-0
                        bg-[radial-gradient(circle_at_50%_45%,rgba(255,40,170,0.20),transparent_28%,rgba(5,2,13,0.95)_75%)]
                    "
                />

                {/* PARTICLE BACKGROUND */}

                <div className="absolute inset-0">

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

                        <ambientLight intensity={0.25} />

                        <pointLight
                            position={[0, 1, 3]}
                            intensity={5}
                            color="#ff4db8"
                        />

                        <Stars
                            radius={50}
                            depth={35}
                            count={1200}
                            factor={2}
                            saturation={0}
                            fade
                            speed={0.4}
                        />

                        <FloatingParticles />

                        <EffectComposer>

                            <Bloom
                                intensity={2}
                                luminanceThreshold={0.05}
                                luminanceSmoothing={0.8}
                                mipmapBlur
                            />

                        </EffectComposer>

                    </Canvas>

                </div>


                {/* =================================
                    CENTER LOADING CONTENT
                ================================= */}

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

                    {/* GLOWING HEART */}

                    <div
                        className="
                            mb-8
                            flex
                            h-20
                            w-20
                            items-center
                            justify-center
                            rounded-full
                            bg-pink-500/10
                            shadow-[0_0_60px_rgba(255,40,170,0.45)]
                        "
                    >

                        <span
                            className="
                                animate-pulse
                                text-[52px]
                                leading-none
                                text-pink-400
                                drop-shadow-[0_0_25px_rgba(255,60,180,0.9)]
                            "
                        >
                            ♥
                        </span>

                    </div>


                    {/* LOADING TEXT */}

                    <h2
                        className="
                            text-[24px]
                            font-medium
                            tracking-wide
                            text-white
                            drop-shadow-[0_0_20px_rgba(255,80,190,0.5)]
                            sm:text-3xl
                        "
                    >
                        Loading Your Surprise
                    </h2>


                    {/* SMALL SUBTITLE */}

                    <p
                        className="
                            mt-3
                            text-[11px]
                            uppercase
                            tracking-[0.35em]
                            text-pink-200/60
                        "
                    >
                        Something beautiful is coming
                    </p>


                    {/* LOADING DOTS */}

                    <div
                        className="
                            mt-6
                            flex
                            items-center
                            gap-2
                        "
                    >

                        <span className="h-2 w-2 animate-bounce rounded-full bg-pink-400" />

                        <span
                            className="
                                h-2
                                w-2
                                animate-bounce
                                rounded-full
                                bg-pink-400
                                [animation-delay:150ms]
                            "
                        />

                        <span
                            className="
                                h-2
                                w-2
                                animate-bounce
                                rounded-full
                                bg-pink-400
                                [animation-delay:300ms]
                            "
                        />

                    </div>

                </div>

            </section>
        );
    }


    /*
    =====================================================
    HERO SCREEN
    =====================================================
    */

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

            {/* =========================================
                THREE.JS
            ========================================= */}

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

                    <ambientLight intensity={0.3} />

                    <pointLight
                        position={[0, 2, 3]}
                        intensity={4}
                        color="#ff4db8"
                    />

                    <Stars
                        radius={50}
                        depth={35}
                        count={1200}
                        factor={2}
                        saturation={0}
                        fade
                        speed={0.25}
                    />

                    <FloatingParticles />

                    {/* HEART */}

                    <group
                        scale={
                            stage === "exploding"
                                ? 1.25
                                : 1
                        }
                    >

                        <Heart3D />

                        <HeartParticles
                            exploding={
                                stage === "exploding"
                            }
                        />

                    </group>


                    {/* BLOOM */}

                    <EffectComposer>

                        <Bloom
                            intensity={
                                stage === "exploding"
                                    ? 3
                                    : 1.8
                            }
                            luminanceThreshold={0.05}
                            luminanceSmoothing={0.8}
                            mipmapBlur
                        />

                    </EffectComposer>

                </Canvas>

            </div>


            {/* BACKGROUND GLOW */}

            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-[radial-gradient(circle_at_50%_42%,rgba(255,20,147,0.16),transparent_30%,rgba(5,2,13,0.85)_85%)]
                "
            />


            {/* =========================================
                HERO CONTENT
            ========================================= */}

            {stage === "hero" && (

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
                                mt-3
                                block
                                text-[25px]
                                text-pink-200
                                sm:text-3xl
                            "
                        >
                            For You

                            <span className="ml-2 text-pink-400">
                                ♥
                            </span>

                        </span>

                    </h1>


                    {/* BUTTON */}

                    <button
                        onClick={handleOpen}
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

            )}


            {/* =========================================
                EXPLOSION WHITE/PINK FLASH
            ========================================= */}

            {stage === "exploding" && (

                <div
                    className="
                        pointer-events-none
                        absolute
                        inset-0
                        z-30
                        animate-pulse
                        bg-[radial-gradient(circle_at_center,rgba(255,120,210,0.20),transparent_40%)]
                    "
                />

            )}

        </section>
    );
};

export default HeroSection;
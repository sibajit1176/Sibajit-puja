import { useEffect, useRef, useState } from "react";

import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

import {
    EffectComposer,
    Bloom,
} from "@react-three/postprocessing";

import Heart3D from "../three/Heart3D";
import HeartParticles from "../three/HeartParticles";
import FloatingParticles from "../three/FloatingParticles";
import HeartExplosion from "../three/HeartExplosion";


const HeroSection = ({ onSurpriseComplete }) => {

    // ==========================================
    // HEART ROTATION
    // ==========================================

    const [rotation, setRotation] = useState({
        x: 0,
        y: 0,
    });


    // ==========================================
    // SURPRISE STATE
    // ==========================================

    const [surpriseStarted, setSurpriseStarted] =
        useState(false);


    // ==========================================
    // DRAG STATE
    // ==========================================

    const isDragging = useRef(false);

    const previousPointer = useRef({
        x: 0,
        y: 0,
    });


    // ==========================================
    // POINTER DOWN
    // ==========================================

    const handlePointerDown = (event) => {

        isDragging.current = true;

        previousPointer.current = {
            x: event.clientX,
            y: event.clientY,
        };

        event.currentTarget.setPointerCapture(
            event.pointerId
        );
    };


    // ==========================================
    // POINTER MOVE
    // ==========================================

    const handlePointerMove = (event) => {

        if (!isDragging.current) {
            return;
        }

        const currentX = event.clientX;
        const currentY = event.clientY;

        const deltaX =
            currentX -
            previousPointer.current.x;

        const deltaY =
            currentY -
            previousPointer.current.y;


        previousPointer.current = {
            x: currentX,
            y: currentY,
        };


        setRotation((previous) => {

            const newY =
                previous.y +
                deltaX * 0.012;

            const newX =
                previous.x +
                deltaY * 0.012;


            // Prevent the heart from rotating
            // too far vertically.

            const limitedX = Math.max(
                -0.7,
                Math.min(0.7, newX)
            );


            return {
                x: limitedX,
                y: newY,
            };
        });
    };


    // ==========================================
    // POINTER UP
    // ==========================================

    const handlePointerUp = (event) => {

        isDragging.current = false;

        try {

            event.currentTarget.releasePointerCapture(
                event.pointerId
            );

        } catch {
            // Pointer capture may already be released
        }
    };


    // ==========================================
    // POINTER CANCEL
    // ==========================================

    const handlePointerCancel = () => {

        isDragging.current = false;
    };


    // ==========================================
    // SAFETY
    // ==========================================

    useEffect(() => {

        const stopDragging = () => {
            isDragging.current = false;
        };


        window.addEventListener(
            "pointerup",
            stopDragging
        );

        window.addEventListener(
            "pointercancel",
            stopDragging
        );


        return () => {

            window.removeEventListener(
                "pointerup",
                stopDragging
            );

            window.removeEventListener(
                "pointercancel",
                stopDragging
            );
        };

    }, []);


    // ==========================================
    // SURPRISE CLICK
    // ==========================================

    const handleSurpriseClick = () => {

        if (surpriseStarted) {
            return;
        }

        setSurpriseStarted(true);
    };


    // ==========================================
    // EXPLOSION COMPLETE
    // ==========================================

    const handleExplosionComplete = () => {

        if (onSurpriseComplete) {
            onSurpriseComplete();
        }
    };


    // ==========================================
    // UI
    // ==========================================

    return (

        <section
            className="
                relative
                h-[100svh]
                min-h-[620px]
                w-full
                overflow-hidden
                bg-[#03000a]
            "
        >

            {/* =====================================
                THREE.JS INTERACTION AREA
            ====================================== */}

            <div
                className="
                    absolute
                    inset-0
                    z-0
                    touch-none
                    select-none
                "
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerCancel}
            >

                <Canvas
                    dpr={[1, 1.5]}
                    camera={{
                        position: [0, 0, 6],
                        fov: 42,
                    }}
                    gl={{
                        antialias: true,
                        alpha: true,
                        powerPreference:
                            "high-performance",
                    }}
                    style={{
                        pointerEvents: "none",
                    }}
                >

                    {/* =================================
                        LIGHTING
                    ================================= */}

                    <ambientLight
                        intensity={0.35}
                    />

                    <pointLight
                        position={[2, 2, 3]}
                        intensity={7}
                        color="#ff4da6"
                    />

                    <pointLight
                        position={[-2, -2, 2]}
                        intensity={4}
                        color="#8b5cf6"
                    />


                    {/* =================================
                        STARS
                    ================================= */}

                    <Stars
                        radius={60}
                        depth={40}
                        count={1400}
                        factor={2.2}
                        saturation={0}
                        fade
                        speed={0.25}
                    />


                    {/* =================================
                        FLOATING PARTICLES
                    ================================= */}

                    <FloatingParticles
                        count={90}
                    />


                    {/* =================================
                        HEART PARTICLES
                    ================================= */}

                    <HeartParticles
                        count={700}
                    />


                    {/* =================================
                        NORMAL 3D HEART
                    ================================= */}

                    <Heart3D
                        rotationX={rotation.x}
                        rotationY={rotation.y}
                        exploding={surpriseStarted}
                    />


                    {/* =================================
                        HEART EXPLOSION
                    ================================= */}

                    <HeartExplosion
                        active={surpriseStarted}
                        onComplete={
                            handleExplosionComplete
                        }
                    />


                    {/* =================================
                        BLOOM / GLOW
                    ================================= */}

                    <EffectComposer>

                        <Bloom
                            intensity={1.35}
                            luminanceThreshold={0.2}
                            luminanceSmoothing={0.9}
                            mipmapBlur
                        />

                    </EffectComposer>

                </Canvas>

            </div>


            {/* =====================================
                BACKGROUND VIGNETTE
            ====================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    z-[1]
                    bg-[radial-gradient(circle_at_50%_40%,rgba(255,45,149,0.13),transparent_32%,rgba(3,0,10,0.9)_90%)]
                "
            />


            {/* =====================================
                CONTENT
            ====================================== */}

            <div
                className="
                    pointer-events-none
                    relative
                    z-10
                    flex
                    h-full
                    flex-col
                    items-center
                    justify-end
                    px-5
                    pb-[7vh]
                    text-center
                "
            >

                {/* =================================
                    SMALL TITLE
                ================================= */}

                <p
                    className="
                        mb-3
                        text-[10px]
                        font-medium
                        uppercase
                        tracking-[0.38em]
                        text-pink-300/80
                    "
                >
                    A little surprise
                </p>


                {/* =================================
                    MAIN TITLE
                ================================= */}

                <h1
                    className="
                        max-w-[340px]
                        text-[36px]
                        font-semibold
                        leading-[1.05]
                        tracking-tight
                        text-white
                        drop-shadow-[0_0_30px_rgba(255,45,149,0.35)]
                    "
                >

                    Something Special

                    <span
                        className="
                            mt-2
                            block
                            text-pink-400
                        "
                    >

                        For You

                        <span className="ml-2">
                            ❤️
                        </span>

                    </span>

                </h1>


                {/* =================================
                    SURPRISE BUTTON
                ================================= */}

                {!surpriseStarted && (

                    <button
                        type="button"
                        onClick={handleSurpriseClick}
                        className="
                            pointer-events-auto
                            mt-7
                            min-h-[48px]
                            rounded-full
                            border
                            border-pink-300/30
                            bg-gradient-to-r
                            from-pink-500/30
                            to-purple-500/30
                            px-7
                            py-3.5
                            text-sm
                            font-medium
                            text-white
                            shadow-[0_0_40px_rgba(255,45,149,0.35)]
                            backdrop-blur-xl
                            transition-all
                            duration-300
                            hover:scale-105
                            hover:border-pink-300/60
                            hover:shadow-[0_0_55px_rgba(255,45,149,0.55)]
                            active:scale-95
                        "
                    >

                        Open Your Surprise

                        <span className="ml-2">
                            ❤️
                        </span>

                    </button>

                )}


                {/* =================================
                    SCROLL INDICATOR
                ================================= */}

                <div
                    className="
                        mt-7
                        flex
                        flex-col
                        items-center
                        gap-1.5
                        text-white/40
                    "
                >

                    <span
                        className="
                            text-[9px]
                            uppercase
                            tracking-[0.28em]
                        "
                    >
                        Scroll to explore
                    </span>

                    <span
                        className="
                            animate-bounce
                            text-sm
                        "
                    >
                        ↓
                    </span>

                </div>

            </div>

        </section>
    );
};


export default HeroSection;
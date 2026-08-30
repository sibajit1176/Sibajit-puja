import { useMemo } from "react";
import { motion } from "framer-motion";

/* =========================================================
   RANDOM STARS
========================================================= */

const STAR_COUNT = 170;

const createStars = () =>
    Array.from(
        { length: STAR_COUNT },
        (_, index) => ({
            id: index,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            size: `${Math.random() * 2.2 + 0.5}px`,
            delay: Math.random() * 5,
            duration: 2 + Math.random() * 4,
        })
    );


/* =========================================================
   BRIGHT STARS
========================================================= */

const BRIGHT_STARS = [
    {
        left: "10%",
        top: "17%",
        delay: 0,
    },
    {
        left: "87%",
        top: "20%",
        delay: 1.4,
    },
    {
        left: "17%",
        top: "43%",
        delay: 0.8,
    },
    {
        left: "88%",
        top: "46%",
        delay: 2.2,
    },
    {
        left: "9%",
        top: "73%",
        delay: 1.1,
    },
    {
        left: "91%",
        top: "76%",
        delay: 0.4,
    },
    {
        left: "29%",
        top: "12%",
        delay: 2.7,
    },
    {
        left: "72%",
        top: "12%",
        delay: 1.8,
    },
];


/* =========================================================
   FLOATING HEARTS
========================================================= */

const HEARTS = [
    {
        left: "10%",
        top: "31%",
        size: 15,
        delay: 0,
        duration: 4,
    },
    {
        left: "86%",
        top: "30%",
        size: 12,
        delay: 1.5,
        duration: 4.8,
    },
    {
        left: "14%",
        top: "62%",
        size: 11,
        delay: 2,
        duration: 5,
    },
    {
        left: "88%",
        top: "63%",
        size: 17,
        delay: 0.8,
        duration: 4.4,
    },
    {
        left: "23%",
        top: "80%",
        size: 10,
        delay: 1.2,
        duration: 5.5,
    },
    {
        left: "78%",
        top: "82%",
        size: 13,
        delay: 2.5,
        duration: 4.7,
    },
];


/* =========================================================
   COSMIC BACKGROUND
========================================================= */

const CosmicBackground = ({
    loading = false,
}) => {

    const stars = useMemo(
        () => createStars(),
        []
    );


    return (
        <div
            className="
                pointer-events-none
                absolute
                inset-0
                overflow-hidden
                bg-[#030007]
            "
        >

            {/* =================================================
                DEEP SPACE GRADIENT
            ================================================= */}

            <div
                className="
                    absolute
                    inset-0
                    bg-[radial-gradient(circle_at_50%_42%,#25051f_0%,#110215_27%,#07000f_53%,#020006_100%)]
                "
            />


            {/* =================================================
                HUGE CENTRAL PINK NEBULA
            ================================================= */}

            <motion.div
                className="
                    absolute
                    left-1/2
                    top-[34%]
                    h-[260px]
                    w-[260px]
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-fuchsia-600/15
                    blur-[90px]
                "
                animate={{
                    scale: [
                        0.9,
                        1.15,
                        0.95,
                        1.08,
                        0.9,
                    ],
                    opacity: [
                        0.45,
                        0.75,
                        0.5,
                        0.7,
                        0.45,
                    ],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />


            {/* =================================================
                LEFT NEBULA
            ================================================= */}

            <motion.div
                className="
                    absolute
                    -left-[35%]
                    top-[8%]
                    h-[390px]
                    w-[390px]
                    rounded-full
                    bg-pink-700/10
                    blur-[110px]
                "
                animate={{
                    x: [0, 45, 0, -25, 0],
                    y: [0, 25, 0, -20, 0],
                    scale: [1, 1.15, 0.95, 1.1, 1],
                }}
                transition={{
                    duration: 13,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />


            {/* =================================================
                RIGHT NEBULA
            ================================================= */}

            <motion.div
                className="
                    absolute
                    -right-[35%]
                    top-[28%]
                    h-[430px]
                    w-[430px]
                    rounded-full
                    bg-fuchsia-700/10
                    blur-[120px]
                "
                animate={{
                    x: [0, -40, 0, 25, 0],
                    y: [0, -25, 0, 30, 0],
                    scale: [1, 1.12, 0.94, 1.08, 1],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />


            {/* =================================================
                BOTTOM PINK NEBULA
            ================================================= */}

            <motion.div
                className="
                    absolute
                    left-1/2
                    bottom-[-180px]
                    h-[360px]
                    w-[500px]
                    -translate-x-1/2
                    rounded-full
                    bg-pink-600/10
                    blur-[120px]
                "
                animate={{
                    scale: [1, 1.18, 1],
                    opacity: [0.35, 0.65, 0.35],
                }}
                transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />


            {/* =================================================
                ROTATING AURORA RING
            ================================================= */}

            <motion.div
                className="
                    absolute
                    left-1/2
                    top-[25%]
                    h-[260px]
                    w-[155%]
                    -translate-x-1/2
                    rounded-[50%]
                    border
                    border-pink-400/[0.07]
                    blur-[1px]
                "
                animate={{
                    rotate: 360,
                    scale: [
                        1,
                        1.04,
                        1,
                    ],
                }}
                transition={{
                    rotate: {
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear",
                    },
                    scale: {
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    },
                }}
            />


            {/* =================================================
                SECOND AURORA RING
            ================================================= */}

            <motion.div
                className="
                    absolute
                    left-1/2
                    top-[29%]
                    h-[210px]
                    w-[135%]
                    -translate-x-1/2
                    rounded-[50%]
                    border
                    border-fuchsia-300/[0.06]
                "
                animate={{
                    rotate: -360,
                }}
                transition={{
                    duration: 42,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />


            {/* =================================================
                THIRD SMALL ORBIT
            ================================================= */}

            <motion.div
                className="
                    absolute
                    left-1/2
                    top-[34%]
                    h-[130px]
                    w-[100%]
                    -translate-x-1/2
                    rounded-[50%]
                    border
                    border-pink-300/[0.055]
                "
                animate={{
                    rotate: 360,
                    scale: [
                        1,
                        1.06,
                        1,
                    ],
                }}
                transition={{
                    rotate: {
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    },
                    scale: {
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    },
                }}
            />


            {/* =================================================
                STARS
            ================================================= */}

            <div className="absolute inset-0">

                {stars.map((star) => (
                    <motion.span
                        key={star.id}
                        className="
                            absolute
                            rounded-full
                            bg-pink-100
                        "
                        style={{
                            left: star.left,
                            top: star.top,
                            width: star.size,
                            height: star.size,
                            boxShadow:
                                "0 0 7px rgba(255,150,220,0.8)",
                        }}
                        animate={{
                            opacity: [
                                0.15,
                                0.8,
                                0.25,
                                1,
                                0.15,
                            ],
                            scale: [
                                0.7,
                                1.2,
                                0.8,
                                1.35,
                                0.7,
                            ],
                        }}
                        transition={{
                            duration: star.duration,
                            delay: star.delay,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}

            </div>


            {/* =================================================
                BRIGHT STARS
            ================================================= */}

            <div className="absolute inset-0">

                {BRIGHT_STARS.map(
                    (star, index) => (

                        <motion.span
                            key={index}
                            className="
                                absolute
                                flex
                                h-5
                                w-5
                                items-center
                                justify-center
                            "
                            style={{
                                left: star.left,
                                top: star.top,
                            }}
                            animate={{
                                opacity: [
                                    0.25,
                                    1,
                                    0.3,
                                ],
                                scale: [
                                    0.7,
                                    1.25,
                                    0.7,
                                ],
                            }}
                            transition={{
                                duration: 2.8,
                                delay: star.delay,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >

                            {/* Horizontal ray */}

                            <span
                                className="
                                    absolute
                                    h-px
                                    w-6
                                    bg-pink-100/70
                                    shadow-[0_0_7px_rgba(255,150,220,0.9)]
                                "
                            />

                            {/* Vertical ray */}

                            <span
                                className="
                                    absolute
                                    h-6
                                    w-px
                                    bg-pink-100/70
                                    shadow-[0_0_7px_rgba(255,150,220,0.9)]
                                "
                            />

                            {/* Core */}

                            <span
                                className="
                                    relative
                                    h-1.5
                                    w-1.5
                                    rounded-full
                                    bg-white
                                    shadow-[0_0_12px_rgba(255,180,230,1)]
                                "
                            />

                        </motion.span>

                    )
                )}

            </div>


            {/* =================================================
                FLOATING HEARTS
            ================================================= */}

            <div className="absolute inset-0">

                {HEARTS.map(
                    (heart, index) => (

                        <motion.span
                            key={index}
                            className="
                                absolute
                                text-pink-300/60
                                drop-shadow-[0_0_10px_rgba(255,60,180,0.8)]
                            "
                            style={{
                                left: heart.left,
                                top: heart.top,
                                fontSize: `${heart.size}px`,
                            }}
                            animate={{
                                y: [
                                    0,
                                    -14,
                                    0,
                                    10,
                                    0,
                                ],
                                x: [
                                    0,
                                    5,
                                    -4,
                                    3,
                                    0,
                                ],
                                scale: [
                                    0.75,
                                    1.1,
                                    0.8,
                                    1,
                                    0.75,
                                ],
                                opacity: [
                                    0.2,
                                    0.8,
                                    0.35,
                                    0.7,
                                    0.2,
                                ],
                            }}
                            transition={{
                                duration: heart.duration,
                                delay: heart.delay,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            ♥
                        </motion.span>

                    )
                )}

            </div>


            {/* =================================================
                MOVING COSMIC DUST
            ================================================= */}

            <motion.div
                className="
                    absolute
                    inset-[-20%]
                    opacity-[0.18]
                    bg-[radial-gradient(circle,rgba(255,130,220,0.8)_0.7px,transparent_0.9px)]
                    [background-size:35px_35px]
                "
                animate={{
                    x: [-20, 20, -20],
                    y: [-15, 15, -15],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />


            {/* =================================================
                DIAGONAL LIGHT STREAK
            ================================================= */}

            <motion.div
                className="
                    absolute
                    left-[-40%]
                    top-[20%]
                    h-px
                    w-[180%]
                    rotate-[-18deg]
                    bg-gradient-to-r
                    from-transparent
                    via-pink-300/10
                    to-transparent
                "
                animate={{
                    x: ["-20%", "40%"],
                    opacity: [
                        0,
                        1,
                        0,
                    ],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    repeatDelay: 4,
                    ease: "easeInOut",
                }}
            />


            {/* =================================================
                SECOND LIGHT STREAK
            ================================================= */}

            <motion.div
                className="
                    absolute
                    left-[-50%]
                    top-[67%]
                    h-px
                    w-[180%]
                    rotate-[15deg]
                    bg-gradient-to-r
                    from-transparent
                    via-fuchsia-300/10
                    to-transparent
                "
                animate={{
                    x: ["-20%", "45%"],
                    opacity: [
                        0,
                        0.8,
                        0,
                    ],
                }}
                transition={{
                    duration: 9,
                    repeat: Infinity,
                    repeatDelay: 6,
                    ease: "easeInOut",
                }}
            />


            {/* =================================================
                VIGNETTE
            ================================================= */}

            <div
                className="
                    absolute
                    inset-0
                    bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.12)_48%,rgba(0,0,0,0.72)_100%)]
                "
            />


            {/* =================================================
                TOP/BOTTOM ATMOSPHERE
            ================================================= */}

            <div
                className="
                    absolute
                    inset-x-0
                    top-0
                    h-[25%]
                    bg-gradient-to-b
                    from-black/35
                    to-transparent
                "
            />

            <div
                className="
                    absolute
                    inset-x-0
                    bottom-0
                    h-[30%]
                    bg-gradient-to-t
                    from-black/55
                    to-transparent
                "
            />

        </div>
    );
};

export default CosmicBackground;
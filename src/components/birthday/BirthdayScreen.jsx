import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BirthdayScreen = ({ onSwipe }) => {
    const [visible, setVisible] = useState(true);
    const [isPressed, setIsPressed] = useState(false);

    // =========================================================
    // STARS
    // =========================================================

    const stars = useMemo(() => {
        return Array.from({ length: 95 }, (_, index) => ({
            id: index,
            left: `${(index * 37.7) % 100}%`,
            top: `${(index * 61.3) % 100}%`,
            size: `${1 + ((index * 17) % 18) / 10}px`,
            delay: `${(index % 12) * 0.35}s`,
            duration: `${2.2 + (index % 5) * 0.7}s`,
        }));
    }, []);

    // =========================================================
    // SMALL FLOATING PARTICLES
    // =========================================================

    const particles = useMemo(() => {
        return Array.from({ length: 35 }, (_, index) => ({
            id: index,
            left: `${(index * 47.3) % 100}%`,
            top: `${(index * 29.7) % 100}%`,
            size: `${2 + (index % 3)}px`,
            duration: `${4 + (index % 4)}s`,
            delay: `${(index % 8) * 0.5}s`,
        }));
    }, []);

    // =========================================================
    // FLOATING HEARTS
    // =========================================================

    const hearts = [
        {
            left: "8%",
            top: "27%",
            size: 17,
            delay: 0,
        },
        {
            left: "88%",
            top: "30%",
            size: 14,
            delay: 1.2,
        },
        {
            left: "5%",
            top: "64%",
            size: 20,
            delay: 2,
        },
        {
            left: "91%",
            top: "67%",
            size: 16,
            delay: 0.7,
        },
        {
            left: "16%",
            top: "81%",
            size: 12,
            delay: 1.7,
        },
        {
            left: "83%",
            top: "82%",
            size: 13,
            delay: 2.5,
        },
    ];

    // =========================================================
    // POEM
    // =========================================================

    const poem = [
        "তোমার হাসিতে জেগে ওঠে আমার নীল আকাশ,",
        "তোমার ছোঁয়ায় হৃদয় জুড়ে নামে মধুর সুবাস।",
        "তোমার চোখে হারিয়ে গিয়ে ভুলে যাই সবকিছু,",
        "তোমায় ভালোবেসেই কাটুক আমার জীবনটুকু।",
    ];

    // =========================================================
    // SWIPE / OPEN
    // =========================================================

    const handleOpen = () => {
        setIsPressed(true);

        setTimeout(() => {
            onSwipe?.();
        }, 250);
    };

    return (
        <section
            className="
                relative
                flex
                h-[100svh]
                min-h-[640px]
                w-full
                items-center
                justify-center
                overflow-hidden
                bg-[#05020c]
                px-4
                text-white
            "
        >

            {/* =====================================================
                DEEP SPACE BACKGROUND
            ====================================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-[radial-gradient(circle_at_50%_35%,rgba(255,50,190,0.20),transparent_30%,rgba(5,2,12,0.95)_78%)]
                "
            />

            {/* =====================================================
                LARGE MOVING NEBULA
            ====================================================== */}

            <motion.div
                className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-[38%]
                    h-[420px]
                    w-[420px]
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-[radial-gradient(circle,rgba(255,30,180,0.18),rgba(160,30,255,0.08),transparent_70%)]
                    blur-3xl
                "
                animate={{
                    scale: [1, 1.12, 1],
                    opacity: [0.55, 0.8, 0.55],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* =====================================================
                SECOND NEBULA
            ====================================================== */}

            <motion.div
                className="
                    pointer-events-none
                    absolute
                    -left-[100px]
                    top-[20%]
                    h-[280px]
                    w-[280px]
                    rounded-full
                    bg-[radial-gradient(circle,rgba(180,50,255,0.13),transparent_70%)]
                    blur-3xl
                "
                animate={{
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                    scale: [1, 1.15, 1],
                }}
                transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* =====================================================
                STARS
            ====================================================== */}

            <div className="pointer-events-none absolute inset-0">
                {stars.map((star) => (
                    <motion.span
                        key={star.id}
                        className="
                            absolute
                            rounded-full
                            bg-pink-100
                            shadow-[0_0_6px_rgba(255,150,230,0.9)]
                        "
                        style={{
                            left: star.left,
                            top: star.top,
                            width: star.size,
                            height: star.size,
                        }}
                        animate={{
                            opacity: [0.15, 1, 0.2],
                            scale: [0.7, 1.5, 0.7],
                        }}
                        transition={{
                            duration: Number.parseFloat(
                                star.duration
                            ),
                            delay: Number.parseFloat(
                                star.delay
                            ),
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* =====================================================
                FLOATING PARTICLES
            ====================================================== */}

            <div className="pointer-events-none absolute inset-0">
                {particles.map((particle) => (
                    <motion.span
                        key={particle.id}
                        className="
                            absolute
                            rounded-full
                            bg-pink-300
                            opacity-50
                            blur-[0.5px]
                        "
                        style={{
                            left: particle.left,
                            top: particle.top,
                            width: particle.size,
                            height: particle.size,
                        }}
                        animate={{
                            y: [0, -25, 0],
                            x: [0, 8, -5, 0],
                            opacity: [0.15, 0.7, 0.15],
                        }}
                        transition={{
                            duration: particle.duration,
                            delay: particle.delay,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* =====================================================
                SHOOTING STARS
            ====================================================== */}

            <motion.div
                className="
                    pointer-events-none
                    absolute
                    left-[-80px]
                    top-[22%]
                    h-[1px]
                    w-[80px]
                    rotate-[25deg]
                    bg-gradient-to-r
                    from-transparent
                    via-pink-200
                    to-white
                    shadow-[0_0_10px_rgba(255,150,230,0.9)]
                "
                animate={{
                    x: [0, 460],
                    y: [0, 170],
                    opacity: [0, 1, 0],
                }}
                transition={{
                    duration: 3.5,
                    delay: 2,
                    repeat: Infinity,
                    repeatDelay: 5,
                    ease: "easeOut",
                }}
            />

            <motion.div
                className="
                    pointer-events-none
                    absolute
                    right-[-80px]
                    top-[42%]
                    h-[1px]
                    w-[75px]
                    rotate-[-25deg]
                    bg-gradient-to-r
                    from-transparent
                    via-purple-200
                    to-white
                    shadow-[0_0_10px_rgba(190,120,255,0.9)]
                "
                animate={{
                    x: [0, -430],
                    y: [0, 160],
                    opacity: [0, 1, 0],
                }}
                transition={{
                    duration: 4,
                    delay: 5,
                    repeat: Infinity,
                    repeatDelay: 7,
                    ease: "easeOut",
                }}
            />

            {/* =====================================================
                FLOATING HEARTS
            ====================================================== */}

            {hearts.map((heart, index) => (
                <motion.div
                    key={index}
                    className="
                        pointer-events-none
                        absolute
                        z-[2]
                        text-pink-400
                        drop-shadow-[0_0_12px_rgba(255,50,180,0.9)]
                    "
                    style={{
                        left: heart.left,
                        top: heart.top,
                        fontSize: `${heart.size}px`,
                    }}
                    animate={{
                        y: [0, -12, 0],
                        x: [0, 4, -3, 0],
                        scale: [0.8, 1.15, 0.8],
                        opacity: [0.25, 0.9, 0.25],
                    }}
                    transition={{
                        duration: 3.5,
                        delay: heart.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    ♥
                </motion.div>
            ))}

            {/* =====================================================
                MAIN CONTENT
            ====================================================== */}

            <motion.div
                className="
                    relative
                    z-10
                    flex
                    w-full
                    max-w-[360px]
                    flex-col
                    items-center
                    text-center
                "
                initial={{
                    opacity: 0,
                    y: 25,
                }}
                animate={{
                    opacity: visible ? 1 : 0,
                    y: visible ? 0 : 25,
                }}
                transition={{
                    duration: 1.2,
                    ease: [0.22, 1, 0.36, 1],
                }}
            >

                {/* =================================================
                    GREETING
                ================================================== */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: -15,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 1,
                        delay: 0.2,
                    }}
                >
                    <h1
                        className="
                            text-[28px]
                            font-semibold
                            tracking-wide
                            text-pink-50
                            drop-shadow-[0_0_22px_rgba(255,80,190,0.65)]
                        "
                    >
                        Hey Beautiful

                        <motion.span
                            className="
                                ml-2
                                inline-block
                                text-pink-400
                                drop-shadow-[0_0_12px_rgba(255,50,180,1)]
                            "
                            animate={{
                                scale: [1, 1.25, 1],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            ♥
                        </motion.span>
                    </h1>

                    {/* SMALL SUBTITLE */}

                    <motion.p
                        className="
                            mt-1
                            text-[10px]
                            uppercase
                            tracking-[0.35em]
                            text-pink-200/45
                        "
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            delay: 1,
                            duration: 1,
                        }}
                    >
                        A little something for you
                    </motion.p>
                </motion.div>

                {/* =================================================
                    POEM
                ================================================== */}

                <div
                    className="
                        mt-6
                        w-full
                        overflow-hidden
                    "
                >
                    {poem.map((line, index) => (
                        <motion.p
                            key={index}
                            className="
                                bengali-poem
                                whitespace-nowrap
                                text-center
                                text-[15px]
                                leading-[2.05]
                                text-pink-100/95
                                drop-shadow-[0_0_10px_rgba(255,100,200,0.35)]
                            "
                            initial={{
                                opacity: 0,
                                y: 12,
                                filter: "blur(6px)",
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                filter: "blur(0px)",
                            }}
                            transition={{
                                duration: 0.8,
                                delay: 0.7 + index * 0.22,
                                ease: "easeOut",
                            }}
                        >
                            {line}
                        </motion.p>
                    ))}
                </div>

                {/* =================================================
                    DIVIDER
                ================================================== */}

                <motion.div
                    className="
                        mt-4
                        flex
                        items-center
                        gap-2
                    "
                    initial={{
                        opacity: 0,
                        scaleX: 0,
                    }}
                    animate={{
                        opacity: 1,
                        scaleX: 1,
                    }}
                    transition={{
                        duration: 1,
                        delay: 1.8,
                    }}
                >
                    <span className="h-px w-10 bg-gradient-to-r from-transparent to-pink-400/60" />

                    <motion.span
                        className="
                            text-[11px]
                            text-pink-300
                            drop-shadow-[0_0_8px_rgba(255,80,190,0.9)]
                        "
                        animate={{
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                        }}
                    >
                        ♥
                    </motion.span>

                    <span className="h-px w-10 bg-gradient-to-l from-transparent to-pink-400/60" />
                </motion.div>

                {/* =================================================
                    HAPPY BIRTHDAY
                ================================================== */}

                <motion.h2
                    className="
                        mt-4
                        text-[24px]
                        font-semibold
                        text-pink-50
                        drop-shadow-[0_0_18px_rgba(255,80,190,0.6)]
                    "
                    initial={{
                        opacity: 0,
                        scale: 0.85,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                    }}
                    transition={{
                        duration: 0.9,
                        delay: 2,
                        type: "spring",
                        stiffness: 180,
                    }}
                >
                    Happy Birthday!

                    <motion.span
                        className="ml-2 inline-block"
                        animate={{
                            y: [0, -4, 0],
                            rotate: [0, -5, 5, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        🎂💖
                    </motion.span>
                </motion.h2>

                {/* =================================================
                    PHOTO WRAPPER
                ================================================== */}

                <motion.div
                    className="
                        relative
                        mt-5
                        cursor-pointer
                    "
                    initial={{
                        opacity: 0,
                        scale: 0.65,
                        y: 30,
                        rotate: -8,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: [0, -6, 0],
                        rotate: [-2, 0, -2],
                    }}
                    transition={{
                        opacity: {
                            duration: 0.8,
                            delay: 2.2,
                        },
                        scale: {
                            duration: 1,
                            delay: 2.2,
                            type: "spring",
                            stiffness: 150,
                            damping: 15,
                        },
                        y: {
                            duration: 4.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 3,
                        },
                        rotate: {
                            duration: 4.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 3,
                        },
                    }}
                    whileHover={{
                        scale: 1.04,
                    }}
                    whileTap={{
                        scale: 0.95,
                    }}
                    onClick={handleOpen}
                >

                    {/* =================================================
                        OUTER GLOW
                    ================================================== */}

                    <motion.div
                        className="
                            absolute
                            -inset-5
                            rounded-[8px]
                            bg-[radial-gradient(circle,rgba(255,40,180,0.38),transparent_68%)]
                            blur-xl
                        "
                        animate={{
                            opacity: [0.45, 0.85, 0.45],
                            scale: [0.95, 1.08, 0.95],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />

                    {/* =================================================
                        OUTER FRAME
                    ================================================== */}

                    <div
                        className="
                            absolute
                            -inset-[7px]
                            rotate-[2deg]
                            border
                            border-pink-200/35
                            bg-white/[0.03]
                            shadow-[0_0_25px_rgba(255,50,180,0.18)]
                        "
                    />

                    {/* =================================================
                        BACK FRAME
                    ================================================== */}

                    <div
                        className="
                            absolute
                            -left-2
                            -top-2
                            h-full
                            w-full
                            rotate-[-4deg]
                            border
                            border-white/50
                            bg-white/[0.05]
                            shadow-[0_0_20px_rgba(255,100,200,0.2)]
                        "
                    />

                    {/* =================================================
                        PHOTO
                    ================================================== */}

                    <motion.div
                        className="
                            relative
                            overflow-hidden
                            border-[5px]
                            border-white
                            bg-white
                            shadow-[0_10px_40px_rgba(255,40,180,0.3)]
                        "
                        animate={{
                            boxShadow: [
                                "0 10px 35px rgba(255,40,180,0.25)",
                                "0 10px 55px rgba(255,40,180,0.55)",
                                "0 10px 35px rgba(255,40,180,0.25)",
                            ],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <img
                            src="https://res.cloudinary.com/xhb80ud5/image/upload/v1787468080/photo4.jpg"
                            alt="Birthday memory"
                            draggable="false"
                            className="
                                block
                                h-[250px]
                                w-[220px]
                                object-cover
                            "
                        />

                        {/* PHOTO LIGHT SWEEP */}

                        <motion.div
                            className="
                                pointer-events-none
                                absolute
                                inset-y-0
                                -left-[80%]
                                w-[55%]
                                rotate-[18deg]
                                bg-gradient-to-r
                                from-transparent
                                via-white/30
                                to-transparent
                                blur-md
                            "
                            animate={{
                                left: ["-80%", "150%"],
                            }}
                            transition={{
                                duration: 2.8,
                                delay: 3.5,
                                repeat: Infinity,
                                repeatDelay: 5,
                                ease: "easeInOut",
                            }}
                        />
                    </motion.div>

                    {/* =================================================
                        HEART LEFT
                    ================================================== */}

                    <motion.span
                        className="
                            absolute
                            -left-8
                            top-[42%]
                            text-[28px]
                            text-pink-400
                            drop-shadow-[0_0_15px_rgba(255,40,180,1)]
                        "
                        animate={{
                            y: [0, -8, 0],
                            scale: [1, 1.18, 1],
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 2.8,
                            repeat: Infinity,
                        }}
                    >
                        ♥
                    </motion.span>

                    {/* =================================================
                        HEART RIGHT
                    ================================================== */}

                    <motion.span
                        className="
                            absolute
                            -right-8
                            top-[25%]
                            text-[25px]
                            text-pink-400
                            drop-shadow-[0_0_15px_rgba(255,40,180,1)]
                        "
                        animate={{
                            y: [0, -10, 0],
                            scale: [1, 1.2, 1],
                            opacity: [0.4, 1, 0.4],
                        }}
                        transition={{
                            duration: 3.2,
                            delay: 0.7,
                            repeat: Infinity,
                        }}
                    >
                        ♥
                    </motion.span>

                    {/* =================================================
                        SMALL HEART
                    ================================================== */}

                    <motion.span
                        className="
                            absolute
                            -right-7
                            bottom-[12%]
                            text-[18px]
                            text-pink-300
                            drop-shadow-[0_0_12px_rgba(255,40,180,1)]
                        "
                        animate={{
                            y: [0, -8, 0],
                            opacity: [0.3, 1, 0.3],
                        }}
                        transition={{
                            duration: 2.5,
                            delay: 1,
                            repeat: Infinity,
                        }}
                    >
                        ♥
                    </motion.span>
                </motion.div>

                {/* =================================================
                    SWIPE AREA
                ================================================== */}

                <motion.div
                    className="mt-5 flex flex-col items-center"
                    initial={{
                        opacity: 0,
                        y: 10,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 1,
                        delay: 3,
                    }}
                >

                    <button
                        type="button"
                        onClick={handleOpen}
                        className="
                            flex
                            cursor-pointer
                            items-center
                            gap-3
                            border-none
                            bg-transparent
                            px-5
                            py-1
                            text-[13px]
                            tracking-[0.08em]
                            text-white/70
                            outline-none
                        "
                    >
                        <span>Swipe to continue</span>

                        <motion.span
                            className="
                                text-[21px]
                                text-pink-300
                                drop-shadow-[0_0_8px_rgba(255,70,190,0.8)]
                            "
                            animate={{
                                x: [-5, 8, -5],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            →
                        </motion.span>
                    </button>

                    {/* GLOW LINE */}

                    <motion.div
                        className="
                            mt-1
                            h-[1px]
                            w-20
                            bg-gradient-to-r
                            from-transparent
                            via-pink-400/60
                            to-transparent
                        "
                        animate={{
                            opacity: [0.2, 0.8, 0.2],
                            scaleX: [0.7, 1, 0.7],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                        }}
                    />
                </motion.div>

            </motion.div>

            {/* =====================================================
                OPENING FLASH
            ====================================================== */}

            <AnimatePresence>
                {isPressed && (
                    <motion.div
                        className="
                            pointer-events-none
                            fixed
                            inset-0
                            z-[100]
                            bg-pink-100
                        "
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: [0, 0.35, 0],
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        transition={{
                            duration: 0.35,
                        }}
                    />
                )}
            </AnimatePresence>

        </section>
    );
};

export default BirthdayScreen;
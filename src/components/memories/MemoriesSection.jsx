import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./MemoriesSection.css";

/* =========================================================
   MEMORY DATA
========================================================= */

const MEMORIES = [
    {
        id: 1,
        image:
            "https://res.cloudinary.com/xhb80ud5/image/upload/v1787585165/photo3.jpg",
        className: "memory-card memory-1",
        rotation: -8,
    },
    {
        id: 2,
        image:
            "https://res.cloudinary.com/xhb80ud5/image/upload/v1787585167/photo2.jpg",
        className: "memory-card memory-2",
        rotation: 5,
    },
    {
        id: 3,
        image:
            "https://res.cloudinary.com/xhb80ud5/image/upload/v1787585166/photo5.jpg",
        className: "memory-card memory-3",
        rotation: -4,
    },
    {
        id: 4,
        image:
            "https://res.cloudinary.com/xhb80ud5/image/upload/v1787468080/photo4.jpg",
        className: "memory-card memory-4",
        rotation: 7,
    },
    {
        id: 5,
        image:
            "https://res.cloudinary.com/xhb80ud5/image/upload/v1787585278/WhatsApp_Image_2026-08-23_at_10.28.15_PM.jpg",
        className: "memory-card memory-5",
        rotation: -6,
    },
    {
        id: 6,
        image:
            "https://res.cloudinary.com/xhb80ud5/image/upload/v1787585543/WhatsApp_Image_2026-08-24_at_9.01.56_PM.jpg",
        className: "memory-card memory-6",
        rotation: 6,
    },
    {
        id: 7,
        image:
            "https://res.cloudinary.com/xhb80ud5/image/upload/v1787986109/WhatsApp_Image_2026-08-29_at_12.17.45_PM.jpg",
        className: "memory-card memory-7",
        rotation: -5,
    },
];

/* =========================================================
   STARS
========================================================= */

const STARS = Array.from({ length: 150 }, (_, index) => ({
    id: index,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: `${Math.random() * 2.6 + 0.7}px`,
    delay: `${Math.random() * 5}s`,
    duration: `${2 + Math.random() * 4}s`,
}));

/* =========================================================
   BRIGHT STARS
========================================================= */

const BRIGHT_STARS = [
    {
        left: "14%",
        top: "19%",
        delay: 0,
    },
    {
        left: "84%",
        top: "24%",
        delay: 1.2,
    },
    {
        left: "25%",
        top: "53%",
        delay: 0.7,
    },
    {
        left: "79%",
        top: "59%",
        delay: 2,
    },
    {
        left: "15%",
        top: "76%",
        delay: 1.5,
    },
    {
        left: "88%",
        top: "80%",
        delay: 0.3,
    },
    {
        left: "50%",
        top: "34%",
        delay: 2.5,
    },
];

/* =========================================================
   FLOATING HEARTS
========================================================= */

const HEARTS = [
    {
        left: "12%",
        top: "35%",
        size: 20,
        delay: 0,
    },
    {
        left: "82%",
        top: "30%",
        size: 17,
        delay: 1.5,
    },
    {
        left: "17%",
        top: "69%",
        size: 15,
        delay: 2.1,
    },
    {
        left: "84%",
        top: "68%",
        size: 23,
        delay: 0.8,
    },
    {
        left: "51%",
        top: "58%",
        size: 16,
        delay: 1.2,
    },
];

/* =========================================================
   MEMORY SECTION
========================================================= */

const MemoriesSection = () => {
    const [selectedMemory, setSelectedMemory] = useState(null);

    return (
        <section className="memories-section">

            {/* =====================================================
                GALAXY BACKGROUND
            ====================================================== */}

            <div className="memories-background">

                {/* Deep space */}

                <div className="space-gradient" />

                {/* Large nebula clouds */}

                <div className="memories-nebula nebula-one" />
                <div className="memories-nebula nebula-two" />
                <div className="memories-nebula nebula-three" />

                {/* Central glow */}

                <div className="central-memory-glow" />

                {/* =================================================
                    STARS
                ================================================= */}

                <div className="memories-stars">
                    {STARS.map((star) => (
                        <span
                            key={star.id}
                            className="memory-star"
                            style={{
                                left: star.left,
                                top: star.top,
                                width: star.size,
                                height: star.size,
                                animationDelay: star.delay,
                                animationDuration: star.duration,
                            }}
                        />
                    ))}
                </div>

                {/* =================================================
                    BRIGHT TWINKLING STARS
                ================================================= */}

                <div className="bright-stars">
                    {BRIGHT_STARS.map((star, index) => (
                        <span
                            key={index}
                            className="bright-star"
                            style={{
                                left: star.left,
                                top: star.top,
                                animationDelay: `${star.delay}s`,
                            }}
                        >
                            <span className="star-ray horizontal" />
                            <span className="star-ray vertical" />
                            <span className="star-core" />
                        </span>
                    ))}
                </div>

                {/* =================================================
                    FLOATING HEARTS
                ================================================= */}

                <div className="floating-hearts">
                    {HEARTS.map((heart, index) => (
                        <motion.span
                            key={index}
                            className="floating-heart"
                            style={{
                                left: heart.left,
                                top: heart.top,
                                fontSize: `${heart.size}px`,
                            }}
                            animate={{
                                y: [0, -10, 0],
                                scale: [0.9, 1.15, 0.9],
                                opacity: [0.35, 1, 0.35],
                            }}
                            transition={{
                                duration: 3.2 + index * 0.25,
                                repeat: Infinity,
                                delay: heart.delay,
                                ease: "easeInOut",
                            }}
                        >
                            ♥
                        </motion.span>
                    ))}
                </div>

                {/* Bottom atmospheric glow */}

                <div className="bottom-atmosphere" />

            </div>

            {/* =====================================================
                TITLE
            ====================================================== */}

            <motion.header
                className="memories-header"
                initial={{
                    opacity: 0,
                    y: -25,
                    scale: 0.96,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                }}
                transition={{
                    duration: 1.3,
                    ease: [0.22, 1, 0.36, 1],
                }}
            >
                <h1>
                    Our Memories{" "}
                    <motion.span
                        className="title-heart"
                        animate={{
                            scale: [1, 1.18, 1],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        ♥
                    </motion.span>
                </h1>

                <motion.div
                    className="title-glow-line"
                    initial={{
                        width: 0,
                        opacity: 0,
                    }}
                    animate={{
                        width: 85,
                        opacity: 1,
                    }}
                    transition={{
                        duration: 1,
                        delay: 0.8,
                    }}
                />
            </motion.header>

            {/* =====================================================
                MEMORY CARDS
            ====================================================== */}

            <div className="memories-stage">

                {MEMORIES.map((memory, index) => (
                    <motion.button
                        key={memory.id}
                        type="button"
                        className={memory.className}
                        style={{
                            rotate: memory.rotation,
                        }}
                        initial={{
                            opacity: 0,
                            scale: 0.55,
                            y: 35,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: [0, -8, 0],
                        }}
                        transition={{
                            opacity: {
                                duration: 0.9,
                                delay: 0.35 + index * 0.13,
                            },
                            scale: {
                                duration: 1,
                                delay: 0.35 + index * 0.13,
                                ease: [0.22, 1, 0.36, 1],
                            },
                            y: {
                                duration: 4.5 + (index % 3) * 0.8,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 1 + index * 0.18,
                            },
                        }}
                        whileHover={{
                            scale: 1.09,
                            rotate: memory.rotation + 2,
                            y: -8,
                            zIndex: 50,
                            transition: {
                                duration: 0.3,
                            },
                        }}
                        whileTap={{
                            scale: 0.94,
                        }}
                        onClick={() =>
                            setSelectedMemory(memory)
                        }
                    >
                        {/* Glow behind card */}

                        <div className="memory-card-glow" />

                        {/* Image */}

                        <div className="memory-image-wrapper">
                            <img
                                src={memory.image}
                                alt={`Memory ${memory.id}`}
                                draggable="false"
                            />
                        </div>

                        {/* Glass highlight */}

                        <div className="memory-glass-shine" />

                        {/* Border */}

                        <div className="memory-border-glow" />

                    </motion.button>
                ))}

            </div>

            {/* =====================================================
                BOTTOM DECORATIVE GLOW
            ====================================================== */}

            <div className="memories-bottom-glow" />

            {/* =====================================================
                PHOTO VIEWER
            ====================================================== */}

            <AnimatePresence>
                {selectedMemory && (
                    <motion.div
                        className="memory-viewer"
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        transition={{
                            duration: 0.35,
                        }}
                        onClick={() =>
                            setSelectedMemory(null)
                        }
                    >
                        <motion.div
                            className="memory-viewer-content"
                            initial={{
                                opacity: 0,
                                scale: 0.72,
                                y: 50,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.8,
                                y: 30,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 240,
                                damping: 22,
                            }}
                            onClick={(event) =>
                                event.stopPropagation()
                            }
                        >

                            {/* CLOSE */}

                            <motion.button
                                type="button"
                                className="memory-close"
                                whileHover={{
                                    scale: 1.1,
                                    rotate: 90,
                                }}
                                whileTap={{
                                    scale: 0.9,
                                }}
                                onClick={() =>
                                    setSelectedMemory(null)
                                }
                                aria-label="Close memory"
                            >
                                ×
                            </motion.button>

                            {/* IMAGE */}

                            <div className="viewer-image-frame">
                                <img
                                    src={selectedMemory.image}
                                    alt={`Memory ${selectedMemory.id}`}
                                    draggable="false"
                                />
                            </div>

                            {/* CAPTION */}

                            <p className="viewer-caption">
                                A beautiful memory{" "}
                                <span>♥</span>
                            </p>

                            {/* DECORATION */}

                            <div className="viewer-decoration">
                                <span />
                                <b>♥</b>
                                <span />
                            </div>

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    );
};

export default MemoriesSection;
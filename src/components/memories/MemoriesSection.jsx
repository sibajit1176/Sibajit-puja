import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./MemoriesSection.css";

const MEMORIES = [
    {
        id: 1,
        image: "https://res.cloudinary.com/xhb80ud5/image/upload/v1787468080/photo4.jpg",
        className: "memory-card memory-1",
        rotation: -8,
    },
    {
        id: 2,
        image: "https://res.cloudinary.com/xhb80ud5/image/upload/v1787585167/photo2.jpg",
        className: "memory-card memory-2",
        rotation: 5,
    },
    {
        id: 3,
        image: "https://res.cloudinary.com/xhb80ud5/image/upload/v1787585166/photo5.jpg",
        className: "memory-card memory-3",
        rotation: -4,
    },
    {
        id: 4,
        image: "https://res.cloudinary.com/xhb80ud5/image/upload/v1787585165/photo3.jpg",
        className: "memory-card memory-4",
        rotation: 7,
    },
    {
        id: 5,
        image: "https://res.cloudinary.com/xhb80ud5/image/upload/v1787585543/WhatsApp_Image_2026-08-24_at_9.01.56_PM.jpg",
        className: "memory-card memory-5",
        rotation: -6,
    },
    {
        id: 6,
        image: "https://res.cloudinary.com/xhb80ud5/image/upload/v1787585278/WhatsApp_Image_2026-08-23_at_10.28.15_PM.jpg",
        className: "memory-card memory-6",
        rotation: 6,
    },
    {
        id: 7,
        image: "https://res.cloudinary.com/xhb80ud5/image/upload/v1787585166/photo5.jpg",
        className: "memory-card memory-7",
        rotation: -5,
    },
];

const STARS = Array.from({ length: 140 }, (_, index) => ({
    id: index,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: `${Math.random() * 2.5 + 0.8}px`,
    delay: `${Math.random() * 4}s`,
    duration: `${Math.random() * 2 + 2}s`,
}));

const HEARTS = [
    { left: "13%", top: "38%", delay: 0 },
    { left: "76%", top: "30%", delay: 1.4 },
    { left: "18%", top: "72%", delay: 2.2 },
    { left: "83%", top: "69%", delay: 0.8 },
    { left: "53%", top: "57%", delay: 1.8 },
];

const MemoriesSection = () => {
    const [selectedMemory, setSelectedMemory] = useState(null);

    return (
        <section className="memories-section">

            {/* =========================================
                BACKGROUND
            ========================================= */}

            <div className="memories-background">

                <div className="memories-nebula nebula-one" />
                <div className="memories-nebula nebula-two" />
                <div className="memories-nebula nebula-three" />

                {/* STARS */}

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

                {/* FLOATING HEARTS */}

                {HEARTS.map((heart, index) => (
                    <motion.div
                        key={index}
                        className="floating-heart"
                        style={{
                            left: heart.left,
                            top: heart.top,
                        }}
                        animate={{
                            y: [0, -10, 0],
                            scale: [1, 1.15, 1],
                            opacity: [0.35, 1, 0.35],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: heart.delay,
                            ease: "easeInOut",
                        }}
                    >
                        ♥
                    </motion.div>
                ))}
            </div>


            {/* =========================================
                TITLE
                NO IPHONE STATUS BAR
            ========================================= */}

            <motion.header
                className="memories-header"
                initial={{
                    opacity: 0,
                    y: -18,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 1.2,
                    ease: "easeOut",
                }}
            >
                <h1>
                    Our Memories <span>♥</span>
                </h1>
            </motion.header>


            {/* =========================================
                MEMORY CARDS
            ========================================= */}

            <div className="memories-stage">

                {MEMORIES.map((memory, index) => (
                    <motion.button
                        key={memory.id}
                        className={memory.className}
                        style={{
                            rotate: memory.rotation,
                        }}
                        initial={{
                            opacity: 0,
                            scale: 0.75,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: [0, -7, 0],
                        }}
                        transition={{
                            opacity: {
                                duration: 0.8,
                                delay: 0.2 + index * 0.12,
                            },

                            scale: {
                                duration: 0.8,
                                delay: 0.2 + index * 0.12,
                            },

                            y: {
                                duration: 4 + (index % 3),
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: index * 0.3,
                            },
                        }}
                        whileHover={{
                            scale: 1.08,
                            rotate: memory.rotation + 2,
                        }}
                        whileTap={{
                            scale: 0.94,
                        }}
                        onClick={() => setSelectedMemory(memory)}
                    >

                        <div className="memory-image-wrapper">
                            <img
                                src={memory.image}
                                alt={`Memory ${memory.id}`}
                                draggable="false"
                            />
                        </div>

                        <div className="memory-glow" />

                    </motion.button>
                ))}

            </div>


            {/* =========================================
                BOTTOM GLOW
            ========================================= */}

            <div className="memories-bottom-glow" />


            {/* =========================================
                HOME INDICATOR
            ========================================= */}

            <div className="memories-home-indicator" />


            {/* =========================================
                PHOTO VIEWER
            ========================================= */}

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
                        onClick={() =>
                            setSelectedMemory(null)
                        }
                    >

                        <motion.div
                            className="memory-viewer-content"
                            initial={{
                                scale: 0.75,
                                y: 30,
                            }}
                            animate={{
                                scale: 1,
                                y: 0,
                            }}
                            exit={{
                                scale: 0.8,
                                y: 20,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 22,
                            }}
                            onClick={(event) =>
                                event.stopPropagation()
                            }
                        >

                            {/* CLOSE BUTTON */}

                            <button
                                className="memory-close"
                                onClick={() =>
                                    setSelectedMemory(null)
                                }
                                aria-label="Close memory"
                            >
                                ×
                            </button>


                            {/* IMAGE */}

                            <div className="viewer-image-frame">

                                <img
                                    src={selectedMemory.image}
                                    alt={`Memory ${selectedMemory.id}`}
                                />

                            </div>


                            {/* CAPTION */}

                            <p className="viewer-caption">
                                A beautiful memory ❤️
                            </p>

                        </motion.div>

                    </motion.div>

                )}
            </AnimatePresence>

        </section>
    );
};

export default MemoriesSection;
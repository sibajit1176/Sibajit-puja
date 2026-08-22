import { useState } from "react";

const MemoriesSection = () => {

    const [selectedPhoto, setSelectedPhoto] = useState(null);

    /*
     * IMPORTANT:
     *
     * Replace these filenames with the actual filenames
     * of your girlfriend's photos.
     *
     * Put the photos inside:
     *
     * src/assets/photos/
     */

    const photos = [
        {
            id: 1,
            src: "/photos/photo1.jpeg",
        },
        {
            id: 2,
            src: "/photos/photo2.jpeg",
        },
        {
            id: 3,
            src: "/photos/photo3.jpeg",
        },
        {
            id: 4,
            src: "/photos/photo4.jpeg",
        },
        {
            id: 5,
            src: "/photos/photo5.jpeg",
        },
        {
            id: 6,
            src: "/photos/photo6.jpg",
        },
        {
            id: 7,
            src: "/photos/photo7.jpg",
        },
        {
            id: 8,
            src: "/photos/photo8.jpg",
        },
    ];


    return (
        <section
            className="
                relative
                min-h-screen
                overflow-hidden
                bg-[#05000d]
                px-4
                py-20
                sm:px-6
                sm:py-24
            "
        >

            {/* =================================
                BACKGROUND GLOW
            ================================= */}

            <div
                className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-32
                    h-[420px]
                    w-[420px]
                    -translate-x-1/2
                    rounded-full
                    bg-pink-600/10
                    blur-[120px]
                "
            />


            {/* =================================
                SECTION HEADER
            ================================= */}

            <div
                className="
                    relative
                    z-10
                    mx-auto
                    mb-12
                    max-w-xl
                    text-center
                "
            >

                <p
                    className="
                        mb-3
                        text-[10px]
                        font-medium
                        uppercase
                        tracking-[0.4em]
                        text-pink-300/80
                    "
                >
                    A little piece of you
                </p>


                <h2
                    className="
                        text-4xl
                        font-semibold
                        tracking-tight
                        text-white
                        sm:text-5xl
                    "
                >
                    Our Memories
                </h2>


                <p
                    className="
                        mx-auto
                        mt-4
                        max-w-[310px]
                        text-sm
                        leading-6
                        text-white/45
                        sm:max-w-md
                    "
                >
                    A collection of moments that make
                    you even more beautiful.
                </p>

            </div>


            {/* =================================
                PHOTO GRID
            ================================= */}

            <div
                className="
                    relative
                    z-10
                    mx-auto
                    grid
                    w-full
                    max-w-5xl
                    grid-cols-2
                    gap-3
                    sm:gap-5
                    md:grid-cols-3
                "
            >

                {photos.map((photo, index) => (

                    <button
                        key={photo.id}
                        type="button"
                        onClick={() =>
                            setSelectedPhoto(photo)
                        }
                        className={`
                            group
                            relative
                            overflow-hidden
                            rounded-2xl
                            border
                            border-white/10
                            bg-white/5
                            shadow-[0_15px_50px_rgba(0,0,0,0.35)]
                            transition-all
                            duration-500
                            hover:-translate-y-1
                            hover:border-pink-400/40
                            hover:shadow-[0_20px_60px_rgba(255,45,149,0.18)]
                            active:scale-[0.98]
                            ${
                                index % 3 === 0
                                    ? "aspect-[4/5]"
                                    : "aspect-[3/4]"
                            }
                        `}
                    >

                        <img
                            src={photo.src}
                            alt="Beautiful memory"
                            className="
                                h-full
                                w-full
                                object-cover
                                transition-transform
                                duration-700
                                group-hover:scale-105
                            "
                            loading="lazy"
                        />


                        {/* subtle overlay */}

                        <div
                            className="
                                pointer-events-none
                                absolute
                                inset-0
                                bg-gradient-to-t
                                from-black/25
                                via-transparent
                                to-transparent
                                opacity-70
                            "
                        />


                        {/* small heart */}

                        <div
                            className="
                                absolute
                                bottom-3
                                right-3
                                flex
                                h-8
                                w-8
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-white/20
                                bg-black/25
                                text-sm
                                backdrop-blur-md
                            "
                        >
                            ❤️
                        </div>

                    </button>

                ))}

            </div>


            {/* =================================
                PHOTO VIEWER
            ================================= */}

            {selectedPhoto && (

                <div
                    className="
                        fixed
                        inset-0
                        z-[100]
                        flex
                        items-center
                        justify-center
                        bg-black/85
                        p-4
                        backdrop-blur-md
                    "
                    onClick={() =>
                        setSelectedPhoto(null)
                    }
                >

                    <button
                        type="button"
                        className="
                            absolute
                            right-5
                            top-5
                            z-20
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-white/20
                            bg-white/10
                            text-xl
                            text-white
                            backdrop-blur-md
                        "
                        onClick={() =>
                            setSelectedPhoto(null)
                        }
                    >
                        ×
                    </button>


                    <img
                        src={selectedPhoto.src}
                        alt="Beautiful memory"
                        className="
                            max-h-[85vh]
                            max-w-full
                            rounded-2xl
                            object-contain
                            shadow-[0_0_80px_rgba(255,45,149,0.25)]
                        "
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    />

                </div>

            )}

        </section>
    );
};

export default MemoriesSection;
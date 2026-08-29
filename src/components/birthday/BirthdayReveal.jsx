import {
    useEffect,
    useMemo,
    useState,
} from "react";


/* =========================================================
   FLOATING PARTICLES
========================================================= */

const particles = Array.from(
    { length: 45 },
    (_, index) => ({
        id: index,

        left:
            Math.random() * 100,

        top:
            Math.random() * 100,

        size:
            2 + Math.random() * 3,

        duration:
            5 + Math.random() * 7,

        delay:
            Math.random() * 5,
    })
);


/* =========================================================
   FLOATING HEARTS
========================================================= */

const hearts = [
    {
        left: "7%",
        top: "25%",
        size: "18px",
        delay: "0s",
        duration: "5s",
    },
    {
        left: "88%",
        top: "20%",
        size: "14px",
        delay: "1.5s",
        duration: "6s",
    },
    {
        left: "4%",
        top: "67%",
        size: "12px",
        delay: "2s",
        duration: "5.5s",
    },
    {
        left: "91%",
        top: "65%",
        size: "19px",
        delay: "0.8s",
        duration: "6.5s",
    },
];


/* =========================================================
   BIRTHDAY REVEAL
========================================================= */

const BirthdayReveal = () => {

    const [visible, setVisible] =
        useState(false);


    useEffect(() => {

        const timer =
            setTimeout(() => {
                setVisible(true);
            }, 250);


        return () => {
            clearTimeout(timer);
        };

    }, []);


    return (
        <section
            className="
                birthday-reveal
                relative
                flex
                min-h-[100svh]
                w-full
                items-center
                justify-center
                overflow-hidden
                bg-[#05020d]
                px-4
                py-8
            "
        >

            {/* =================================================
                DEEP BACKGROUND
            ================================================= */}

            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-[radial-gradient(circle_at_50%_25%,#35102f_0%,#17091d_30%,#09040f_62%,#030107_100%)]
                "
            />


            {/* =================================================
                TOP PINK AURA
            ================================================= */}

            <div
                className="
                    birthday-orb
                    pointer-events-none
                    absolute
                    left-1/2
                    top-[8%]
                    h-[230px]
                    w-[230px]
                    -translate-x-1/2
                    rounded-full
                    bg-fuchsia-600/10
                    blur-[85px]
                "
            />


            {/* =================================================
                LEFT NEBULA
            ================================================= */}

            <div
                className="
                    birthday-nebula-left
                    pointer-events-none
                    absolute
                    -left-[100px]
                    top-[25%]
                    h-[280px]
                    w-[280px]
                    rounded-full
                    bg-pink-600/10
                    blur-[100px]
                "
            />


            {/* =================================================
                RIGHT NEBULA
            ================================================= */}

            <div
                className="
                    birthday-nebula-right
                    pointer-events-none
                    absolute
                    -right-[120px]
                    bottom-[12%]
                    h-[300px]
                    w-[300px]
                    rounded-full
                    bg-purple-600/10
                    blur-[110px]
                "
            />


            {/* =================================================
                STAR PARTICLES
            ================================================= */}

            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    overflow-hidden
                "
            >

                {particles.map((particle) => (

                    <span
                        key={particle.id}
                        className="
                            birthday-particle
                            absolute
                            rounded-full
                            bg-pink-200
                        "
                        style={{
                            left: `${particle.left}%`,
                            top: `${particle.top}%`,
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            animationDuration: `${particle.duration}s`,
                            animationDelay: `${particle.delay}s`,
                        }}
                    />

                ))}

            </div>


            {/* =================================================
                FLOATING HEARTS
            ================================================= */}

            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    z-[2]
                "
            >

                {hearts.map((heart, index) => (

                    <span
                        key={index}
                        className="
                            birthday-floating-heart
                            absolute
                            text-pink-400/60
                            drop-shadow-[0_0_12px_rgba(255,70,190,0.8)]
                        "
                        style={{
                            left: heart.left,
                            top: heart.top,
                            fontSize: heart.size,
                            animationDuration: heart.duration,
                            animationDelay: heart.delay,
                        }}
                    >
                        ♥
                    </span>

                ))}

            </div>


            {/* =================================================
                DECORATIVE TOP TEXT
            ================================================= */}

            <div
                className="
                    pointer-events-none
                    absolute
                    left-0
                    right-0
                    top-[6%]
                    z-10
                    flex
                    justify-center
                "
            >

                <div
                    className="
                        flex
                        items-center
                        gap-3
                        text-[8px]
                        uppercase
                        tracking-[0.45em]
                        text-pink-200/45
                    "
                >

                    <span className="h-px w-7 bg-gradient-to-r from-transparent to-pink-400/40" />

                    <span>
                        A little moment for you
                    </span>

                    <span className="h-px w-7 bg-gradient-to-l from-transparent to-pink-400/40" />

                </div>

            </div>


            {/* =================================================
                MAIN CONTENT
            ================================================= */}

            <div
                className={`
                    relative
                    z-10
                    flex
                    w-full
                    max-w-[350px]
                    flex-col
                    items-center
                    text-center

                    transition-all
                    duration-[1400ms]
                    ease-out

                    ${
                        visible
                            ? "translate-y-0 scale-100 opacity-100"
                            : "translate-y-10 scale-[0.96] opacity-0"
                    }
                `}
            >

                {/* =================================================
                    SMALL INTRO
                ================================================= */}

                <p
                    className="
                        text-[10px]
                        font-medium
                        uppercase
                        tracking-[0.32em]
                        text-pink-300/70
                    "
                >
                    Today is your day
                </p>


                {/* =================================================
                    GREETING
                ================================================= */}

                <h1
                    className="
                        mt-3
                        text-[27px]
                        font-medium
                        leading-tight
                        text-white
                        drop-shadow-[0_0_25px_rgba(255,90,190,0.5)]
                    "
                >

                    Hey Beautiful

                    <span
                        className="
                            ml-2
                            inline-block
                            text-pink-400
                            drop-shadow-[0_0_15px_rgba(255,40,180,0.9)]
                        "
                    >
                        ♥
                    </span>

                </h1>


                {/* =================================================
                    MESSAGE
                ================================================= */}

                <p
                    className="
                        mt-4
                        max-w-[300px]
                        text-[14px]
                        font-light
                        leading-6
                        text-white/65
                    "
                >

                    Today is all about you.
                    <br />

                    The beautiful person who makes
                    <br />

                    my world a little brighter every day.

                </p>


                {/* =================================================
                    DECORATIVE HEART LINE
                ================================================= */}

                <div
                    className="
                        mt-5
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
                            via-pink-400/60
                            to-transparent
                        "
                    />

                    <span
                        className="
                            text-[11px]
                            text-pink-300
                            drop-shadow-[0_0_10px_rgba(255,80,190,0.8)]
                        "
                    >
                        ✦
                    </span>

                    <span
                        className="
                            h-px
                            w-12
                            bg-gradient-to-r
                            from-transparent
                            via-pink-400/60
                            to-transparent
                        "
                    />

                </div>


                {/* =================================================
                    PHOTO AREA
                ================================================= */}

                <div
                    className="
                        birthday-photo-wrapper
                        relative
                        mt-6
                        w-[235px]
                    "
                >

                    {/* Outer glow */}

                    <div
                        className="
                            pointer-events-none
                            absolute
                            -inset-5
                            rounded-[28px]
                            bg-pink-500/10
                            blur-[28px]
                        "
                    />


                    {/* Back frame */}

                    <div
                        className="
                            absolute
                            inset-0
                            rotate-[-6deg]
                            rounded-sm
                            border
                            border-pink-200/30
                            bg-[#f7edf5]
                            p-[7px]
                            shadow-[0_15px_45px_rgba(255,40,170,0.18)]
                        "
                    />


                    {/* Second frame */}

                    <div
                        className="
                            absolute
                            inset-0
                            rotate-[4deg]
                            rounded-sm
                            border
                            border-white/30
                            bg-[#fff8fc]
                            p-[7px]
                        "
                    />


                    {/* Main frame */}

                    <div
                        className="
                            relative
                            rotate-[-1deg]
                            rounded-sm
                            border
                            border-white/80
                            bg-white
                            p-[7px]
                            shadow-[0_18px_55px_rgba(0,0,0,0.45)]
                        "
                    >

                        <div
                            className="
                                relative
                                overflow-hidden
                                bg-black
                            "
                        >

                            <img
                                src="https://res.cloudinary.com/xhb80ud5/image/upload/v1787468080/photo4.jpg"
                                alt="Birthday memory"
                                className="
                                    aspect-[4/5]
                                    w-full
                                    object-cover
                                    transition-transform
                                    duration-[2500ms]
                                    hover:scale-[1.04]
                                "
                            />


                            {/* Photo shine */}

                            <div
                                className="
                                    pointer-events-none
                                    absolute
                                    inset-0
                                    bg-gradient-to-tr
                                    from-pink-500/10
                                    via-transparent
                                    to-white/20
                                "
                            />

                        </div>


                        {/* Polaroid caption */}

                        <p
                            className="
                                py-2
                                text-[9px]
                                uppercase
                                tracking-[0.28em]
                                text-gray-500
                            "
                        >
                            My favorite person
                        </p>

                    </div>


                    {/* =================================================
                        PHOTO HEARTS
                    ================================================= */}

                    <span
                        className="
                            absolute
                            -left-[27px]
                            top-[25%]
                            text-[22px]
                            text-pink-400
                            drop-shadow-[0_0_15px_rgba(255,50,180,0.9)]
                            animate-[floatHeart_4s_ease-in-out_infinite]
                        "
                    >
                        ♥
                    </span>


                    <span
                        className="
                            absolute
                            -right-[28px]
                            top-[55%]
                            text-[18px]
                            text-pink-300
                            drop-shadow-[0_0_15px_rgba(255,50,180,0.9)]
                            animate-[floatHeart_5s_ease-in-out_1s_infinite]
                        "
                    >
                        ♥
                    </span>


                    <span
                        className="
                            absolute
                            right-[3px]
                            -top-[25px]
                            text-[13px]
                            text-pink-200
                            drop-shadow-[0_0_10px_rgba(255,100,220,0.9)]
                            animate-pulse
                        "
                    >
                        ✦
                    </span>


                    <span
                        className="
                            absolute
                            bottom-[15px]
                            -left-[20px]
                            text-[11px]
                            text-pink-200/80
                            animate-pulse
                        "
                    >
                        ✦
                    </span>

                </div>


                {/* =================================================
                    BIRTHDAY TITLE
                ================================================= */}

                <div
                    className="
                        mt-6
                    "
                >

                    <p
                        className="
                            text-[10px]
                            uppercase
                            tracking-[0.38em]
                            text-pink-300/60
                        "
                    >
                        For someone special
                    </p>


                    <h2
                        className="
                            mt-2
                            text-[25px]
                            font-medium
                            text-pink-100
                            drop-shadow-[0_0_20px_rgba(255,70,190,0.65)]
                        "
                    >

                        Happy Birthday

                        <span className="ml-1">
                            🎂
                        </span>

                    </h2>

                </div>


                {/* =================================================
                    LITTLE LOVE MESSAGE
                ================================================= */}

                <p
                    className="
                        mt-3
                        text-[12px]
                        italic
                        text-white/45
                    "
                >
                    You deserve all the beautiful things in the world.
                </p>


                {/* =================================================
                    SWIPE INDICATOR
                ================================================= */}

                <div
                    className="
                        mt-6
                        flex
                        flex-col
                        items-center
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-pink-300/15
                            bg-white/[0.03]
                            px-4
                            py-2
                            backdrop-blur-sm
                        "
                    >

                        <span
                            className="
                                text-[10px]
                                uppercase
                                tracking-[0.25em]
                                text-white/45
                            "
                        >
                            Swipe to continue
                        </span>


                        <span
                            className="
                                text-[17px]
                                text-pink-300
                                animate-[swipeArrow_1.5s_ease-in-out_infinite]
                            "
                        >
                            →
                        </span>

                    </div>


                    {/* small indicator */}

                    <div
                        className="
                            mt-3
                            h-1
                            w-1
                            rounded-full
                            bg-pink-300/60
                            shadow-[0_0_10px_rgba(255,100,210,0.8)]
                        "
                    />

                </div>

            </div>


            {/* =================================================
                TOP VIGNETTE
            ================================================= */}

            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    z-20
                    bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.22)_70%,rgba(0,0,0,0.72)_100%)]
                "
            />


            {/* =================================================
                BOTTOM GLOW
            ================================================= */}

            <div
                className="
                    pointer-events-none
                    absolute
                    bottom-[-100px]
                    left-1/2
                    h-[220px]
                    w-[320px]
                    -translate-x-1/2
                    rounded-full
                    bg-pink-600/10
                    blur-[90px]
                "
            />

        </section>
    );
};


export default BirthdayReveal;
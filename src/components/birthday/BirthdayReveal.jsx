import {
    useEffect,
    useState,
} from "react";


const BirthdayReveal = () => {

    const [visible, setVisible] =
        useState(false);


    useEffect(() => {

        const timer =
            setTimeout(() => {
                setVisible(true);
            }, 300);


        return () => {
            clearTimeout(timer);
        };

    }, []);


    return (
        <section
            className="
                relative
                flex
                min-h-[100svh]
                w-full
                items-center
                justify-center
                overflow-hidden
                bg-[#080412]
                px-6
            "
        >

            {/* ======================================
                BACKGROUND GLOW
            ======================================= */}

            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-[radial-gradient(circle_at_50%_35%,rgba(255,60,170,0.18),transparent_35%,#05030a_80%)]
                "
            />


            {/* ======================================
                SMALL PARTICLES
            ======================================= */}

            <div
                className="
                    birthday-sparkles
                    pointer-events-none
                    absolute
                    inset-0
                "
            />


            {/* ======================================
                CONTENT
            ======================================= */}

            <div
                className={`
                    relative
                    z-10
                    flex
                    w-full
                    max-w-[360px]
                    flex-col
                    items-center
                    text-center

                    transition-all
                    duration-1000

                    ${
                        visible
                            ? "translate-y-0 opacity-100"
                            : "translate-y-8 opacity-0"
                    }
                `}
            >

                {/* ==================================
                    GREETING
                =================================== */}

                <h1
                    className="
                        text-[25px]
                        font-medium
                        text-pink-100
                        drop-shadow-[0_0_18px_rgba(255,100,190,0.45)]
                    "
                >
                    Hey Beautiful ❤️
                </h1>


                {/* ==================================
                    MESSAGE
                =================================== */}

                <p
                    className="
                        mt-7
                        max-w-[300px]
                        text-[15px]
                        leading-7
                        text-white/80
                    "
                >

                    Today is all about you. 🎉

                    <br />

                    The most amazing person

                    <br />

                    who makes my world

                    <br />

                    so much better.

                </p>


                {/* ==================================
                    BIRTHDAY TITLE
                =================================== */}

                <h2
                    className="
                        mt-7
                        text-[23px]
                        font-medium
                        text-pink-100
                        drop-shadow-[0_0_18px_rgba(255,80,180,0.45)]
                    "
                >

                    Happy Birthday! 🎂💖

                </h2>


                {/* ==================================
                    PHOTO
                =================================== */}

                <div
                    className="
                        relative
                        mt-7
                        w-[260px]
                    "
                >

                    {/* Back photo */}

                    <div
                        className="
                            absolute
                            inset-0
                            rotate-[-5deg]
                            border
                            border-white/70
                            bg-white
                            p-2
                            shadow-[0_0_30px_rgba(255,70,180,0.25)]
                        "
                    />

                    {/* Main photo */}

                    <div
                        className="
                            relative
                            rotate-[2deg]
                            border
                            border-white/80
                            bg-white
                            p-2
                            shadow-[0_0_40px_rgba(255,60,180,0.3)]
                        "
                    >

                        <img
                            src="https://res.cloudinary.com/xhb80ud5/image/upload/v1787468080/photo4.jpg"
                            alt="Birthday memory"
                            className="
                                aspect-[4/5]
                                w-full
                                object-cover
                            "
                        />

                    </div>


                    {/* Floating hearts */}

                    <span
                        className="
                            absolute
                            -left-8
                            top-1/2
                            text-[30px]
                            drop-shadow-[0_0_12px_rgba(255,50,180,0.8)]
                            animate-bounce
                        "
                    >
                        ❤️
                    </span>


                    <span
                        className="
                            absolute
                            -right-8
                            bottom-10
                            text-[30px]
                            drop-shadow-[0_0_12px_rgba(255,50,180,0.8)]
                            animate-bounce
                        "
                    >
                        ❤️
                    </span>

                </div>


                {/* ==================================
                    SWIPE
                =================================== */}

                <div
                    className="
                        mt-7
                        flex
                        items-center
                        gap-2
                        text-[12px]
                        text-white/60
                    "
                >

                    <span>
                        Swipe
                    </span>

                    <span
                        className="
                            text-[18px]
                            text-pink-300
                        "
                    >
                        →
                    </span>

                </div>

            </div>

        </section>
    );
};


export default BirthdayReveal;
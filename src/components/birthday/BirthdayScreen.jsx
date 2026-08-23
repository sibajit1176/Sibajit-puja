import { useEffect, useState } from "react";


const BirthdayScreen = () => {

    const [visible, setVisible] =
        useState(false);


    useEffect(() => {

        const timer =
            setTimeout(() => {
                setVisible(true);
            }, 100);


        return () => {
            clearTimeout(timer);
        };

    }, []);


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
                bg-[#080413]
                px-5
            "
        >

            {/* =====================================
                BACKGROUND GLOW
            ====================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-[radial-gradient(circle_at_50%_35%,rgba(255,50,180,0.18),transparent_30%,rgba(8,4,19,0.95)_80%)]
                "
            />


            {/* =====================================
                SMALL FLOATING PARTICLES
            ====================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    opacity-70
                    bg-[radial-gradient(circle,rgba(255,100,200,0.55)_1px,transparent_1px)]
                    [background-size:34px_34px]
                "
            />


            {/* =====================================
                CONTENT
            ====================================== */}

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
                    ${visible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }
                `}
            >

                {/* GREETING */}

                <h1
                    className="
                        text-[27px]
                        font-medium
                        tracking-wide
                        text-pink-100
                        drop-shadow-[0_0_20px_rgba(255,80,190,0.6)]
                    "
                >
                    Hey Beautiful
                    <span className="ml-2">
                        ♥
                    </span>
                </h1>


                {/* MESSAGE */}

                <div
                    className="
        mt-8
        w-full
        overflow-x-hidden
        px-2
        text-center
    "
                >
                    <p className="bengali-poem text-pink-100">
                        <span className="block">
                            তোমার হাসিতে জেগে ওঠে আমার নীল আকাশ,
                        </span>

                        <span className="block">
                            তোমার ছোঁয়ায় হৃদয়জুড়ে নামে মধুর সুবাস।
                        </span>

                        <span className="block">
                            তোমার চোখে হারিয়ে গিয়ে ভুলে যাই সবকিছু,
                        </span>

                        <span className="block">
                            তোমায় ভালোবেসেই কাটুক আমার জীবনটুকু।
                        </span>
                    </p>
                </div>


                {/* BIRTHDAY */}

                <h2
                    className="
                        mt-7
                        text-[25px]
                        font-medium
                        text-pink-100
                        drop-shadow-[0_0_15px_rgba(255,80,190,0.5)]
                    "
                >
                    Happy Birthday!
                    <span className="ml-2">
                        🎂💖
                    </span>
                </h2>


                {/* =====================================
                    GIRLFRIEND PHOTO
                ====================================== */}

                <div
                    className="
                        relative
                        mt-7
                        w-[270px]
                        rotate-[-2deg]
                    "
                >

                    {/* Back photo frame */}

                    <div
                        className="
                            absolute
                            -left-2
                            -top-2
                            h-full
                            w-full
                            rotate-[-5deg]
                            border
                            border-white/60
                            bg-white/10
                        "
                    />


                    {/* Main photo */}

                    <div
                        className="
                            relative
                            overflow-hidden
                            border-[5px]
                            border-white/90
                            bg-white
                            shadow-[0_0_35px_rgba(255,60,180,0.35)]
                        "
                    >

                        <img
                            src="https://res.cloudinary.com/xhb80ud5/image/upload/v1787468080/photo4.jpg"
                            alt="Birthday memory"
                            className="
                                block
                                h-[290px]
                                w-full
                                object-cover
                            "
                        />

                    </div>


                    {/* Floating hearts */}

                    <span
                        className="
                            absolute
                            -left-7
                            top-1/2
                            text-4xl
                            text-pink-400
                            drop-shadow-[0_0_15px_rgba(255,50,180,0.8)]
                            animate-pulse
                        "
                    >
                        ♥
                    </span>


                    <span
                        className="
                            absolute
                            -right-7
                            top-1/3
                            text-4xl
                            text-pink-400
                            drop-shadow-[0_0_15px_rgba(255,50,180,0.8)]
                            animate-pulse
                        "
                    >
                        ♥
                    </span>


                    <span
                        className="
                            absolute
                            -right-8
                            bottom-5
                            text-4xl
                            text-pink-400
                            drop-shadow-[0_0_15px_rgba(255,50,180,0.8)]
                            animate-pulse
                        "
                    >
                        ♥
                    </span>

                </div>


                {/* SWIPE TEXT */}

                <div
                    className="
                        mt-6
                        text-[13px]
                        tracking-wide
                        text-white/70
                    "
                >
                    Swipe
                    <span className="ml-2 text-pink-300">
                        →
                    </span>
                </div>

            </div>

        </section>
    );
};


export default BirthdayScreen;
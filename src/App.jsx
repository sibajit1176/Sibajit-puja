import { useState } from "react";

import HeroSection from "./components/hero/HeroSection";

const App = () => {

    const [opened, setOpened] =
        useState(false);

    return (
        <main
            className="
                min-h-screen
                overflow-x-hidden
                bg-[#05020d]
            "
        >

            {!opened ? (

                <HeroSection
                    onOpen={() => {
                        setOpened(true);
                    }}
                />

            ) : (

                <div
                    className="
                        flex
                        min-h-screen
                        items-center
                        justify-center
                        bg-[#05020d]
                        px-6
                        text-center
                    "
                >

                    <div>

                        <p
                            className="
                                text-sm
                                uppercase
                                tracking-[0.3em]
                                text-pink-300
                            "
                        >
                            Your surprise
                        </p>

                        <h2
                            className="
                                mt-4
                                text-4xl
                                font-semibold
                                text-white
                            "
                        >
                            Coming Soon ❤️
                        </h2>

                    </div>

                </div>

            )}

        </main>
    );
};

export default App;
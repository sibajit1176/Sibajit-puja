import { useState } from "react";

import HeroSection from "./components/hero/HeroSection";
import MemoriesSection from "./components/memories/MemoriesSection";

function App() {

    const [showMemories, setShowMemories] = useState(false);

    return (
        <main className="min-h-screen bg-[#03000a]">

            <HeroSection
                onSurpriseComplete={() => {
                    setShowMemories(true);
                }}
            />

            {showMemories && (
                <MemoriesSection />
            )}

        </main>
    );
}

export default App;
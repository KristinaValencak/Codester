import React from 'react';

export default function VideoSection() {
    return (
        <section id="video-posnetek" className="py-24 max-w-6xl mx-auto px-8">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
                Primer avtomatiziranega poteka
            </h2>
            <p className="text-center text-lg text-[#8B949E] mb-4">
                Primer tipičnega poteka v spletni aplikaciji:
            </p>
            <p className="text-center text-xl font-semibold text-[#E6EDF3] mb-6">
                Prijava uporabnika → ustvarjanje zapisa → urejanje podatkov → potrditev → odjava.
            </p>
            <p className="text-center text-[#8B949E] mb-12">
                Vse se izvede samodejno in ponovljivo – brez ročnega klikanja.
            </p>
            <div className="mt-12 rounded-2xl overflow-hidden border border-[#00D1FF]/40 shadow-[0_0_32px_rgba(0,209,255,0.12)] bg-[#11161D]">
                <div className="aspect-video flex items-center justify-center bg-black">
                    <span className="text-[#5B636E]">Demo video (vgrajen tukaj)</span>
                </div>
            </div>
        </section>
    );
}

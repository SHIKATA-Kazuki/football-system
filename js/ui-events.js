import { formations, interpolateFormation, interpolate3, interpolate4 } from './formations.js';
import { readPlayersFromForm } from './players.js';
import { placePlayers } from './field-renderer.js';

let f_base = formations["4123"];

// Helper function
function applyFormation(formation) {
    const players = readPlayersFromForm(
        document.getElementById("playerFormHome")
    );
    placePlayers(players, formation, false);
}

// Define updateFormationFromSignals BEFORE using it in event listeners
function updateFormationFromSignals() {
    const topSig = document.getElementById("topSlider");
    const volanteSig = document.getElementById("volanteSlider");
    const backsSig = document.getElementById("backsSlider");
    
    const topVal = parseFloat(topSig.value);
    const volanteVal = parseFloat(volanteSig.value);
    const backsVal = parseFloat(backsSig.value);
    
    let formationKey;
    if (backsVal == 1) {
        if (volanteVal < 0.1) {
            formationKey = "4123";
        } else {
            if (topVal == 1) formationKey = "442";
            else formationKey = "4231";
        }
    } else {
        if (volanteVal == 0) {
            formationKey = "352M";
        } else {
            if (topVal == 1) formationKey = "352M";
            else formationKey = "3421";
        }
    }
    
    const formation = formations[formationKey];
    f_base = formations[formationKey];
    const players = readPlayersFromForm(
        document.getElementById("playerFormHome")
    );
    placePlayers(players, formation, false);
}

export function initializeFormationButtons() {
    // Home side
    document.querySelectorAll('.home-formations button').forEach(btn => {
        btn.addEventListener('click', e => {
            document.querySelectorAll('.home-formations button').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            const f = e.target.dataset.formation;
            const players = readPlayersFromForm(document.getElementById("playerFormHome"));
            const pos = formations[f];
            if (pos) placePlayers(players, pos, false);
        });
    });

    // Away side
    document.querySelectorAll('.away-formations button').forEach(btn => {
        btn.addEventListener('click', e => {
            document.querySelectorAll('.away-formations button').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            const f = e.target.dataset.formation;
            const players = readPlayersFromForm(document.getElementById("playerFormAway"));
            const pos = formations[f];
            if (pos) {
                const flipped = pos.map(([x, y]) => [100 - x, 100 - y]);
                placePlayers(players, flipped, true);
            }
        });
    });
}

export function initializeSliders() {
    const topSig = document.getElementById("topSlider");
    const volanteSig = document.getElementById("volanteSlider");
    const backsSig = document.getElementById("backsSlider");

    topSig.addEventListener("input", updateFormationFromSignals);
    volanteSig.addEventListener("input", updateFormationFromSignals);
    backsSig.addEventListener("input", updateFormationFromSignals);

    // TOPの数変え
    topSig.addEventListener("input", e => {
        const t = parseFloat(e.target.value);
        let f0 = formations["4150"];
        const volanteVal = parseFloat(volanteSig.value);
        const backsVal = parseFloat(backsSig.value);
        
        if (backsVal > 0.5) {
            if (volanteVal > 0.5) {
                f0 = formations["4231"];
                const f2 = formations["442"];
                const f3 = formations["424"];
                const interpolated = interpolate4(t, f0, f_base, f2, f3);
                applyFormation(interpolated);
                if (t > 0.5) {
                    f_base = formations["442"];
                } else {
                    f_base = formations["4123"];
                }
            } else {
                const f2 = formations["442_diamond"];
                const f3 = formations["4132"];
                const interpolated = interpolate4(t, f0, f_base, f2, f3);
                applyFormation(interpolated);
                if (t > 0.33) {
                    f_base = formations["442_diamond"];
                } else {
                    f_base = formations["4123"];
                }
            }
        } else {
            if (volanteVal > 0.5) {
                const f2 = formations["352W"];
                const interpolated = interpolate3(t, f0, f_base, f2);
                applyFormation(interpolated);
            } else {
                const f2 = formations["334"];
                const interpolated = interpolate3(t, f0, f_base, f2);
                applyFormation(interpolated);
            }
        }
    });

    // Anchorが降りるoption
    const slider = document.getElementById("systemSlider");
    slider.addEventListener("input", e => {
        const t = parseFloat(e.target.value);
        const f0 = formations["343_diamond"];
        const interpolated = interpolateFormation(f0, f_base, t);
        applyFormation(interpolated);
    });

    // 両方SBが上がるミドルブロック形成
    const sideslider = document.getElementById("sideSlider");
    sideslider.addEventListener("input", e => {
        const backsVal = parseFloat(backsSig.value);
        const topVal = parseFloat(topSig.value);
        
        if (backsVal == 1) {
            let t = parseFloat(e.target.value);
            let f0 = formations["442block"];
            let f2 = formations["2134"];
            
            if (topVal > 0.5) {
                const interpolated = interpolate3(t, f0, f_base, f2);
                applyFormation(interpolated);
            } else {
                const f2 = formations["253"];
                const f3 = formations["235"];
                const interpolated = interpolate4(t, f0, f_base, f2, f3);
                applyFormation(interpolated);
            }
        } else {
            const t = parseFloat(e.target.value);
            const f0 = formations["541"];
            const f2 = formations["325"];
            const interpolated = interpolate3(t, f0, f_base, f2);
            applyFormation(interpolated);
        }
    });

    // SBが上がる3back化
    const sidebackslider = document.getElementById("sidebackSlider");
    sidebackslider.addEventListener("input", e => {
        const topVal = parseFloat(topSig.value);
        let t = parseFloat(e.target.value);
        let f0 = formations["3421"];
        let f2 = formations["3421R"];
        const interpolated = interpolate3(t, f0, f_base, f2);
        applyFormation(interpolated);
    });
}

export function initializeFormSubmits() {
    document.getElementById("playerFormHome").addEventListener("submit", function(e) {
        e.preventDefault();
        const players = readPlayersFromForm(e.target);
        const f = document.getElementById("formationSelectHome").value;
        const pos = formations[f];
        if (!pos) return;
        placePlayers(players, pos, false);
    });

    document.getElementById("playerFormAway").addEventListener("submit", function(e) {
        e.preventDefault();
        const players = readPlayersFromForm(e.target);
        const f = document.getElementById("formationSelectAway").value;
        const pos = formations[f];
        if (!pos) return;
        const flipped = pos.map(([x, y]) => [100 - x, 100 - y]);
        placePlayers(players, flipped, true);
    });
}
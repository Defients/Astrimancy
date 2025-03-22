/**
 * Enhanced StarryBackground component with dynamic space effects
 * Includes shooting stars, rare UFOs, nebula pulses, and other cosmic events
 * Browser-compatible version
 */
import React, { useState, useEffect, useRef, useMemo } from "react";
import { createStars } from "../utils/utils";

const StarryBackground = () => {
  const [specialEffects, setSpecialEffects] = useState([]);
  const effectsTimerRef = useRef(null);
  const stars = useMemo(() => createStars(200), []); // Increased star count

  // Set up event timers for special effects
  useEffect(() => {
    // Timer for shooting stars (frequent)
    const shootingStarTimer = setInterval(() => {
      if (Math.random() < 0.3) {
        // 30% chance every interval
        addShootingStar();
      }
    }, 2000);

    // Timer for UFO sightings (rare)
    const ufoTimer = setInterval(() => {
      if (
        Math.random() < 0.05 &&
        !specialEffects.some((effect) => effect.type === "ufo")
      ) {
        addUFO();
      }
    }, 15000);

    // Timer for nebula pulses (occasional)
    const nebulaTimer = setInterval(() => {
      if (
        Math.random() < 0.1 &&
        !specialEffects.some((effect) => effect.type === "nebula")
      ) {
        addNebulaPulse();
      }
    }, 8000);

    // Timer for cosmic flares (semi-rare)
    const flareTimer = setInterval(() => {
      if (Math.random() < 0.08) {
        addCosmicFlare();
      }
    }, 10000);

    // Timer for cleanup of expired effects
    effectsTimerRef.current = setInterval(() => {
      setSpecialEffects((prev) =>
        prev.filter((effect) => Date.now() < effect.createdAt + effect.duration)
      );
    }, 1000);

    // Clean up timers
    return () => {
      clearInterval(shootingStarTimer);
      clearInterval(ufoTimer);
      clearInterval(nebulaTimer);
      clearInterval(flareTimer);
      if (effectsTimerRef.current) {
        clearInterval(effectsTimerRef.current);
      }
    };
  }, [specialEffects]); // Include specialEffects in dependency array

  // Add a shooting star to the effects array
  const addShootingStar = () => {
    const startX = Math.random() * 100;
    const startY = Math.random() * 50;
    const angle = Math.random() * 45 + 20; // 20-65 degrees
    const speed = Math.random() * 1.5 + 1; // 1-2.5s duration
    const size = Math.random() * 3 + 2; // 2-5px
    const length = Math.random() * 80 + 50; // 50-130px trail length

    setSpecialEffects((prev) => {
      // Limit to max 5 shooting stars to avoid performance issues
      if (prev.filter((e) => e.type === "shooting-star").length >= 5) {
        return prev;
      }
      return [
        ...prev,
        {
          id: `shooting-star-${Date.now()}-${Math.random()}`,
          type: "shooting-star",
          startX,
          startY,
          angle,
          speed,
          size,
          length,
          createdAt: Date.now(),
          duration: speed * 1000, // Convert to ms
        },
      ];
    });
  };

  // Add a UFO sighting
  const addUFO = () => {
    const startX = -10;
    const startY = Math.random() * 40 + 10;
    const speed = Math.random() * 10 + 15; // 15-25s to cross screen

    setSpecialEffects((prev) => [
      ...prev,
      {
        id: `ufo-${Date.now()}`,
        type: "ufo",
        startX,
        startY,
        speed,
        size: Math.random() * 5 + 15, // 15-20px
        createdAt: Date.now(),
        duration: speed * 1000,
        pulseSpeed: Math.random() * 1.5 + 0.8, // 0.8-2.3s pulse interval
        doublePulse: Math.random() > 0.5, // 50% chance of double-pulse effect
      },
    ]);
  };

  // Add a nebula pulse effect
  const addNebulaPulse = () => {
    const x = Math.random() * 90 + 5;
    const y = Math.random() * 90 + 5;
    const size = Math.random() * 120 + 80; // 80-200px
    const hue = Math.floor(Math.random() * 360); // Random hue

    setSpecialEffects((prev) => [
      ...prev,
      {
        id: `nebula-${Date.now()}`,
        type: "nebula",
        x,
        y,
        size,
        hue,
        createdAt: Date.now(),
        duration: 7000, // 7s duration
        fadeInDuration: 1500,
        holdDuration: 4000,
        fadeOutDuration: 1500,
      },
    ]);
  };

  // Add a cosmic flare
  const addCosmicFlare = () => {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const radius = Math.random() * 2 + 1; // 1-3px

    setSpecialEffects((prev) => {
      // Limit to max 10 flares to avoid performance issues
      if (prev.filter((e) => e.type === "flare").length >= 10) {
        return prev;
      }
      return [
        ...prev,
        {
          id: `flare-${Date.now()}-${Math.random()}`,
          type: "flare",
          x,
          y,
          radius,
          createdAt: Date.now(),
          duration: 1000, // 1s flare
        },
      ];
    });
  };

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Base stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="star absolute"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}%`,
            top: `${star.y}%`,
            animationDuration: `${star.animationDuration}s`,
            animationDelay: `${star.animationDelay}s`,
            backgroundColor: "#fff",
            borderRadius: "50%",
            animation: `twinkle ${star.animationDuration}s infinite ease-in-out`,
          }}
        />
      ))}

      {/* Special effects */}
      {specialEffects.map((effect) => {
        const now = Date.now();
        const elapsed = now - effect.createdAt;

        if (effect.type === "shooting-star") {
          const progress = Math.min(elapsed / effect.duration, 1);
          const distance = progress * 150; // Max travel distance
          const radians = effect.angle * (Math.PI / 180);
          const endX = effect.startX + Math.cos(radians) * distance;
          const endY = effect.startY + Math.sin(radians) * distance;

          return (
            <div
              key={effect.id}
              style={{
                position: "absolute",
                left: `${effect.startX}%`,
                top: `${effect.startY}%`,
                width: "0px",
                height: "0px",
                opacity: progress > 0.8 ? 1 - (progress - 0.8) * 5 : 1,
                zIndex: 1,
              }}
            >
              {/* Star head */}
              <div
                style={{
                  position: "absolute",
                  width: `${effect.size}px`,
                  height: `${effect.size}px`,
                  borderRadius: "50%",
                  backgroundColor: "white",
                  boxShadow: `0 0 ${effect.size * 2}px ${
                    effect.size
                  }px rgba(255, 255, 255, 0.8)`,
                  left: `${distance * Math.cos(radians)}px`,
                  top: `${distance * Math.sin(radians)}px`,
                  transform: "translate(-50%, -50%)",
                  zIndex: 2,
                }}
              />
              {/* Star trail */}
              <div
                style={{
                  position: "absolute",
                  width: `${effect.length}px`,
                  height: "2px",
                  background:
                    "linear-gradient(to left, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0))",
                  left: "0px",
                  top: "0px",
                  transform: `rotate(${effect.angle}deg)`,
                  transformOrigin: "0 0",
                  zIndex: 1,
                }}
              />
            </div>
          );
        }

        if (effect.type === "ufo") {
          const progress = Math.min(elapsed / effect.duration, 1);
          const xPos = effect.startX + progress * 120; // Move from left to right
          const yOffset = Math.sin(elapsed / 1000) * 2; // Vertical oscillation

          return (
            <div
              key={effect.id}
              style={{
                position: "absolute",
                left: `${xPos}%`,
                top: `${effect.startY + yOffset}%`,
                width: `${effect.size}px`,
                height: `${effect.size * 0.4}px`,
                zIndex: 2,
              }}
            >
              {/* UFO Body */}
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "35%",
                  bottom: "30%",
                  left: "0",
                  background:
                    "linear-gradient(to bottom, rgba(160, 160, 180, 0.9), rgba(100, 100, 110, 0.9))",
                  borderRadius: "50% 50% 20% 20% / 30% 30% 70% 70%",
                }}
              />

              {/* UFO Dome */}
              <div
                style={{
                  position: "absolute",
                  width: "60%",
                  height: "40%",
                  bottom: "60%",
                  left: "20%",
                  background:
                    "linear-gradient(to bottom, rgba(130, 200, 255, 0.9), rgba(80, 120, 200, 0.8))",
                  borderRadius: "120% 120% 30% 30% / 100% 100% 30% 30%",
                }}
              />

              {/* UFO Lights - pulsing */}
              {[0, 1, 2].map((i) => {
                const lightPhase =
                  (elapsed / (effect.pulseSpeed * 1000) + i * 0.33) % 1;
                const opacity = 0.4 + Math.sin(lightPhase * Math.PI * 2) * 0.6;
                const colors = [
                  "rgba(255, 255, 50, ",
                  "rgba(50, 255, 80, ",
                  "rgba(255, 80, 255, ",
                ];

                return (
                  <div
                    key={`light-${i}`}
                    style={{
                      position: "absolute",
                      width: "15%",
                      height: "10%",
                      bottom: "25%",
                      left: `${20 + i * 30}%`,
                      background: `${colors[i]}${opacity})`,
                      borderRadius: "50%",
                      boxShadow: `0 0 6px 3px ${colors[i]}${opacity * 0.7})`,
                    }}
                  />
                );
              })}
            </div>
          );
        }

        if (effect.type === "nebula") {
          // Calculate phase based on timing
          let opacity = 0;
          if (elapsed < effect.fadeInDuration) {
            // Fade in phase
            opacity = (elapsed / effect.fadeInDuration) * 0.7;
          } else if (elapsed < effect.fadeInDuration + effect.holdDuration) {
            // Hold phase
            opacity = 0.7;
          } else {
            // Fade out phase
            const fadeOutProgress =
              (elapsed - effect.fadeInDuration - effect.holdDuration) /
              effect.fadeOutDuration;
            opacity = 0.7 * (1 - fadeOutProgress);
          }

          return (
            <div
              key={effect.id}
              style={{
                position: "absolute",
                left: `${effect.x}%`,
                top: `${effect.y}%`,
                width: `${effect.size}px`,
                height: `${effect.size}px`,
                opacity,
                background: `radial-gradient(circle, hsla(${
                  effect.hue
                }, 100%, 75%, ${opacity}) 0%, hsla(${
                  effect.hue + 30
                }, 100%, 60%, ${opacity * 0.6}) 30%, transparent 70%)`,
                borderRadius: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 0,
                pointerEvents: "none",
              }}
            />
          );
        }

        if (effect.type === "flare") {
          const progress = Math.min(elapsed / effect.duration, 1);

          // Flash pattern: quick rise, hold briefly, quick fall
          let opacity = 0;
          if (progress < 0.2) {
            opacity = progress / 0.2; // Rise to full
          } else if (progress < 0.8) {
            opacity = 1; // Hold at full
          } else {
            opacity = (1 - progress) / 0.2; // Fall to zero
          }

          // Random color for the flare
          const hue = effect.id.charCodeAt(6) % 360; // Use part of the ID for consistent hue

          return (
            <div
              key={effect.id}
              style={{
                position: "absolute",
                left: `${effect.x}%`,
                top: `${effect.y}%`,
                width: `${effect.radius * 2}px`,
                height: `${effect.radius * 2}px`,
                background: `hsla(${hue}, 100%, 70%, ${opacity})`,
                boxShadow: `0 0 ${effect.radius * 8}px ${
                  effect.radius * 4
                }px hsla(${hue}, 100%, 70%, ${opacity * 0.6})`,
                borderRadius: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 1,
              }}
            />
          );
        }

        return null;
      })}
    </div>
  );
};

export default StarryBackground;

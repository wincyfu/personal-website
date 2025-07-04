'use client';

import { useRef, useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface FallingTextProps {
  text?: string;
  highlightWords?: string[];
  highlightClass?: string;
  trigger?: "auto" | "hover" | "click" | "scroll";
  backgroundColor?: string;
  wireframes?: boolean;
  gravity?: number;
  mouseConstraintStiffness?: number;
  fontSize?: string;
}

const FallingText = ({
  text = 'WincyFu, a creator exploring AIGC applications, empowering creativity with AI and shaping the one-person-one-team future.',
  highlightWords = ["WincyFu", "AIGC", "AI", "one-person-one-team"],
  highlightClass = "highlighted",
  trigger = "auto",
  backgroundColor = "transparent",
  wireframes = false,
  gravity = 1,
  mouseConstraintStiffness = 0.2,
  fontSize = "1rem"
}: FallingTextProps) => {
  const { isDarkTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const [effectStarted, setEffectStarted] = useState(false);

  useEffect(() => {
    if (!textRef.current) return;
    const words = text.split(" ");
    const newHTML = words
      .map((word) => {
        const isHighlighted = highlightWords.some((hw) => word.includes(hw));
        return `<span class="word ${isHighlighted ? highlightClass : ""}">${word}</span>`;
      })
      .join(" ");
    textRef.current.innerHTML = newHTML;
  }, [text, highlightWords, highlightClass]);

  useEffect(() => {
    if (trigger === "auto") {
      setEffectStarted(true);
      return;
    }
    if (trigger === "scroll" && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setEffectStarted(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [trigger]);

  useEffect(() => {
    if (!effectStarted || !containerRef.current) return;

    const loadMatter = async () => {
      try {
        const Matter = await import('matter-js');
        
        const {
          Engine,
          Render,
          World,
          Bodies,
          Runner,
          Mouse,
          MouseConstraint,
          Body
        } = Matter;

        const containerRect = containerRef.current!.getBoundingClientRect();
        const width = containerRect.width;
        const height = containerRect.height;

        if (width <= 0 || height <= 0) {
          return;
        }

        const engine = Engine.create();
        engine.world.gravity.y = gravity;

        // Create canvas container if it doesn't exist
        if (!canvasContainerRef.current && containerRef.current) {
          const canvasContainer = document.createElement('div');
          canvasContainer.className = 'falling-text-canvas';
          containerRef.current.appendChild(canvasContainer);
          // @ts-ignore - This is a valid operation but TS doesn't like it
          canvasContainerRef.current = canvasContainer;
        }

        const render = Render.create({
          element: canvasContainerRef.current!,
          engine,
          options: {
            width,
            height,
            background: backgroundColor,
            wireframes,
          },
        });

        const boundaryOptions = {
          isStatic: true,
          render: { fillStyle: "transparent" },
        };
        const floor = Bodies.rectangle(width / 2, height + 25, width, 50, boundaryOptions);
        const leftWall = Bodies.rectangle(-25, height / 2, 50, height, boundaryOptions);
        const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, boundaryOptions);
        const ceiling = Bodies.rectangle(width / 2, -25, width, 50, boundaryOptions);

        if (!textRef.current) return;
        const wordSpans = textRef.current.querySelectorAll(".word");
        const wordBodies = [...wordSpans].map((elem) => {
          const rect = elem.getBoundingClientRect();

          const x = rect.left - containerRect.left + rect.width / 2;
          const y = rect.top - containerRect.top + rect.height / 2;

          const body = Bodies.rectangle(x, y, rect.width, rect.height, {
            render: { fillStyle: "transparent" },
            restitution: 0.8,
            frictionAir: 0.01,
            friction: 0.2,
          });

          Body.setVelocity(body, {
            x: (Math.random() - 0.5) * 5,
            y: 0
          });
          Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);
          return { elem, body };
        });

        wordBodies.forEach(({ elem, body }) => {
          const htmlElem = elem as HTMLElement;
          htmlElem.style.position = "absolute";
          htmlElem.style.left = `${body.position.x - body.bounds.max.x + body.bounds.min.x / 2}px`;
          htmlElem.style.top = `${body.position.y - body.bounds.max.y + body.bounds.min.y / 2}px`;
          htmlElem.style.transform = "none";
          
          // Set color based on whether it's highlighted or theme
          const isHighlighted = htmlElem.classList.contains(highlightClass);
          if (!isHighlighted) {
            htmlElem.style.color = isDarkTheme ? '#fff' : '#000';
          }
        });

        const mouse = Mouse.create(containerRef.current!);
        const mouseConstraint = MouseConstraint.create(engine, {
          mouse,
          constraint: {
            stiffness: mouseConstraintStiffness,
            render: { visible: false },
          },
        });
        render.mouse = mouse;

        World.add(engine.world, [
          floor,
          leftWall,
          rightWall,
          ceiling,
          mouseConstraint,
          ...wordBodies.map((wb) => wb.body),
        ]);

        const runner = Runner.create();
        Runner.run(runner, engine);
        Render.run(render);

        const updateLoop = () => {
          wordBodies.forEach(({ body, elem }) => {
            const { x, y } = body.position;
            const htmlElem = elem as HTMLElement;
            htmlElem.style.left = `${x}px`;
            htmlElem.style.top = `${y}px`;
            htmlElem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
            
            // Ensure text remains visible when theme changes
            const isHighlighted = htmlElem.classList.contains(highlightClass);
            if (!isHighlighted) {
              htmlElem.style.color = isDarkTheme ? '#fff' : '#000';
            }
          });
          Engine.update(engine);
          return requestAnimationFrame(updateLoop);
        };
        
        const animationId = updateLoop();

        return () => {
          cancelAnimationFrame(animationId);
          Render.stop(render);
          Runner.stop(runner);
          if (render.canvas && canvasContainerRef.current) {
            canvasContainerRef.current.removeChild(render.canvas);
          }
          World.clear(engine.world, false);
          Engine.clear(engine);
        };
      } catch (error) {
        console.error("Error initializing Matter.js:", error);
      }
    };

    loadMatter();
  }, [
    effectStarted,
    gravity,
    wireframes,
    backgroundColor,
    mouseConstraintStiffness,
    isDarkTheme,
    highlightClass
  ]);

  // Update text colors when theme changes
  useEffect(() => {
    if (textRef.current) {
      const wordElements = textRef.current.querySelectorAll(".word");
      wordElements.forEach(elem => {
        const htmlElem = elem as HTMLElement;
        const isHighlighted = htmlElem.classList.contains(highlightClass);
        if (!isHighlighted) {
          htmlElem.style.color = isDarkTheme ? '#fff' : '#000';
        }
      });
    }
  }, [isDarkTheme, highlightClass]);

  const handleTrigger = () => {
    if (!effectStarted && (trigger === "click" || trigger === "hover")) {
      setEffectStarted(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className="falling-text-container"
      onClick={trigger === "click" ? handleTrigger : undefined}
      onMouseOver={trigger === "hover" ? handleTrigger : undefined}
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor
      }}
    >
      <div
        ref={textRef}
        className="falling-text-target"
        style={{
          fontSize: fontSize,
          lineHeight: 1.4,
          color: isDarkTheme ? '#fff' : '#000'
        }}
      />
      <div ref={canvasContainerRef} className="falling-text-canvas" />
    </div>
  );
};

export default FallingText; 
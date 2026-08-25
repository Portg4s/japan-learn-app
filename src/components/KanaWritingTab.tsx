import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2, Check, Volume2 } from "lucide-react";
import { speak } from "@/lib/speech";
import type { Kana } from "@/data/japanese";

interface KanaWritingTabProps {
  kana: Kana;
  onClose: () => void;
}

export default function KanaWritingTab({ kana, onClose }: KanaWritingTabProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);

  // Resize canvas on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "#c73e3a";
      ctx.lineWidth = 5;
    }
  }, []);

  const getPos = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0 };
      const rect = canvas.getBoundingClientRect();
      if ("touches" in e) {
        return {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        };
      }
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    },
    []
  );

  const startDraw = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      const { x, y } = getPos(e);
      setIsDrawing(true);
      setLastX(x);
      setLastY(y);
      setHasDrawn(true);
    },
    [getPos]
  );

  const draw = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDrawing) return;
      e.preventDefault();
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const { x, y } = getPos(e);
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.stroke();
      setLastX(x);
      setLastY(y);
    },
    [isDrawing, lastX, lastY, getPos]
  );

  const stopDraw = useCallback(() => {
    setIsDrawing(false);
  }, []);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-background flex flex-col"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <button
          onClick={onClose}
          className="text-sm text-muted-foreground hover:text-foreground font-medium cursor-pointer"
        >
          ← Retour
        </button>
        <span className="font-bold text-foreground font-display">
          Écrire {kana.character}
        </span>
        <button
          onClick={() => speak(kana.character, kana.type === "hangeul" ? "ko-KR" : "ja-JP")}
          className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center cursor-pointer hover:bg-primary/20"
        >
          <Volume2 className="w-4 h-4 text-primary" />
        </button>
      </div>

      {/* Info bar */}
      <div className="px-4 py-2 text-center bg-primary/5 border-b border-border">
        <p className="text-sm text-muted-foreground">
          Trace le caractère sur le guide. C'est en écrivant qu'on mémorise le mieux !
        </p>
      </div>

      {/* Drawing area */}
      <div className="flex-1 relative flex items-center justify-center mx-4 my-4">
        <div className="relative w-full max-w-[320px] aspect-square">
          {/* SVG guide (ghost character) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-[180px] leading-none font-bold text-muted-foreground/15 select-none">
              {kana.character}
            </span>
          </div>

          {/* Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full touch-none rounded-2xl"
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={stopDraw}
            onMouseLeave={stopDraw}
            onTouchStart={startDraw}
            onTouchMove={draw}
            onTouchEnd={stopDraw}
            style={{ cursor: "crosshair" }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="px-4 py-4 border-t border-border flex items-center justify-center gap-4">
        <button
          onClick={clearCanvas}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
          Effacer
        </button>
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer"
        >
          <Check className="w-4 h-4" />
          {hasDrawn ? "J'ai fini !" : "Retour"}
        </button>
      </div>

      {/* Romaji hint */}
      <div className="px-4 pb-6 text-center">
        <p className="text-sm text-muted-foreground">
          Romaji : <span className="font-semibold text-foreground">{kana.romaji}</span>
          {kana.rowLabel && (
            <>
              {" · "}
              Rangée : <span className="font-semibold text-foreground">{kana.rowLabel}</span>
            </>
          )}
        </p>
      </div>
    </motion.div>
  );
}

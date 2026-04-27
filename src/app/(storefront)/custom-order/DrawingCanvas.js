'use client';
import { useRef, useState, useEffect } from 'react';
import styles from './custom.module.css';

export default function DrawingCanvas({ onSave, onCancel }) {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('pencil'); 
  const [color, setColor] = useState('#0E300E');
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [snapshot, setSnapshot] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    // Set display size
    canvas.style.width = '100%';
    canvas.style.height = '300px';
    // Set actual resolution
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = 300 * 2;
    
    const context = canvas.getContext('2d');
    context.scale(2, 2);
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);

    contextRef.current = context;
  }, []);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    if (e.touches && e.touches.length > 0) {
      return { 
        offsetX: e.touches[0].clientX - rect.left, 
        offsetY: e.touches[0].clientY - rect.top 
      };
    }
    return { offsetX: e.nativeEvent.offsetX, offsetY: e.nativeEvent.offsetY };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    const { offsetX, offsetY } = getCoordinates(e);
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    setSnapshot(context.getImageData(0, 0, canvas.width, canvas.height));
    
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    
    setStartPos({ x: offsetX, y: offsetY });
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const { offsetX, offsetY } = getCoordinates(e);
    const context = contextRef.current;

    if (tool === 'pencil' || tool === 'eraser') {
      context.strokeStyle = tool === 'eraser' ? '#ffffff' : color;
      context.lineWidth = tool === 'eraser' ? 15 : 3;
      context.lineTo(offsetX, offsetY);
      context.stroke();
    } else {
      const canvas = canvasRef.current;
      context.putImageData(snapshot, 0, 0);
      context.strokeStyle = color;
      context.lineWidth = 3;
      
      context.beginPath();
      if (tool === 'line') {
        context.moveTo(startPos.x, startPos.y);
        context.lineTo(offsetX, offsetY);
      } else if (tool === 'rect') {
        context.rect(startPos.x, startPos.y, offsetX - startPos.x, offsetY - startPos.y);
      } else if (tool === 'square') {
        const side = Math.max(Math.abs(offsetX - startPos.x), Math.abs(offsetY - startPos.y));
        const signX = offsetX > startPos.x ? 1 : -1;
        const signY = offsetY > startPos.y ? 1 : -1;
        context.rect(startPos.x, startPos.y, side * signX, side * signY);
      }
      context.stroke();
    }
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL('image/png');
    onSave(dataUrl);
  };

  return (
    <div className={styles.canvasContainer}>
      <div className={styles.canvasToolbar}>
        <div className={styles.canvasTools}>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} title="Color Palette" className={styles.colorPicker} />
          <button type="button" className={tool === 'pencil' ? styles.toolActive : ''} onClick={() => setTool('pencil')}>✏️ Pencil</button>
          <button type="button" className={tool === 'line' ? styles.toolActive : ''} onClick={() => setTool('line')}>📏 Line</button>
          <button type="button" className={tool === 'rect' ? styles.toolActive : ''} onClick={() => setTool('rect')}>▭ Rect</button>
          <button type="button" className={tool === 'square' ? styles.toolActive : ''} onClick={() => setTool('square')}>⃞ Square</button>
          <button type="button" className={tool === 'eraser' ? styles.toolActive : ''} onClick={() => setTool('eraser')}>🧽 Eraser</button>
          <button type="button" onClick={clearCanvas}>🗑 Clear</button>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        className={styles.drawingCanvas}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
      <div className={styles.canvasActions}>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        <button type="button" className="btn btn-primary" onClick={handleSave}>Save Drawing</button>
      </div>
    </div>
  );
}

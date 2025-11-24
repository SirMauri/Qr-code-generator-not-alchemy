'use client';

import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Download, Sparkles, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import {
  trackQRGeneration,
  trackQRDownload,
  trackFormatChange,
  trackColorChange,
  trackGenerationError,
} from '@/lib/analytics';

type QRStyle = 'square' | 'rounded' | 'dots';
type QRFormat = 'png' | 'svg' | 'jpg';

export const QRGenerator: React.FC = () => {
  const [url, setUrl] = useState('');
  const [fgColor, setFgColor] = useState('#284023');
  const [bgColor, setBgColor] = useState('#F7F7F0');
  const [style, setStyle] = useState<QRStyle>('square');
  const [formats, setFormats] = useState<QRFormat[]>(['png']);
  const [qrDataURL, setQrDataURL] = useState<string>('');
  const [qrSVG, setQrSVG] = useState<string>('');
  const [qrJPG, setQrJPG] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const generateQR = async () => {
    if (!url.trim()) return;

    setIsGenerating(true);
    setShowScrollIndicator(false);

    try {
      const options = {
        errorCorrectionLevel: 'H' as const,
        margin: 2,
        color: {
          dark: fgColor,
          light: bgColor,
        },
        width: 400,
      };

      // Generate PNG
      if (formats.includes('png')) {
        const dataURL = await QRCode.toDataURL(url, options);
        setQrDataURL(dataURL);
      }

      // Generate SVG
      if (formats.includes('svg')) {
        const svgString = await QRCode.toString(url, {
          ...options,
          type: 'svg',
        });
        setQrSVG(svgString);
      }

      // Generate JPG
      if (formats.includes('jpg')) {
        const canvas = canvasRef.current;
        if (canvas) {
          await QRCode.toCanvas(canvas, url, options);

          // Convert to JPG
          canvas.toBlob((blob) => {
            if (blob) {
              const jpgURL = URL.createObjectURL(blob);
              setQrJPG(jpgURL);
            }
          }, 'image/jpeg', 0.95);
        }
      }

      // Show scroll indicator on mobile after generation
      if (window.innerWidth < 768) {
        setShowScrollIndicator(true);
      }

      // Track successful QR generation
      const hasCustomColors = fgColor !== '#284023' || bgColor !== '#F7F7F0';
      formats.forEach((format) => {
        trackQRGeneration(format, hasCustomColors);
      });
    } catch (error) {
      console.error('Error generating QR code:', error);
      // Track generation error
      trackGenerationError(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQR = (format: QRFormat) => {
    const fileName = `qr-code-${Date.now()}`;

    // Track download
    trackQRDownload(format);

    if (format === 'png' && qrDataURL) {
      const link = document.createElement('a');
      link.href = qrDataURL;
      link.download = `${fileName}.png`;
      link.click();
    } else if (format === 'svg' && qrSVG) {
      const blob = new Blob([qrSVG], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${fileName}.svg`;
      link.click();
      URL.revokeObjectURL(url);
    } else if (format === 'jpg' && qrJPG) {
      const link = document.createElement('a');
      link.href = qrJPG;
      link.download = `${fileName}.jpg`;
      link.click();
    }
  };

  const toggleFormat = (format: QRFormat) => {
    const newFormats = formats.includes(format)
      ? formats.filter(f => f !== format)
      : [...formats, format];

    setFormats(newFormats);

    // Track format selection change (only if it's being added)
    if (!formats.includes(format)) {
      trackFormatChange(format);
    }
  };

  const hasGeneratedQR = qrDataURL || qrSVG || qrJPG;

  // Hide scroll indicator when user scrolls to preview
  useEffect(() => {
    const handleScroll = () => {
      if (previewRef.current && showScrollIndicator) {
        const rect = previewRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.5) {
          setShowScrollIndicator(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showScrollIndicator]);

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* 2-Column Layout on Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Left Column - Form Section */}
        <div className="bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-lg border border-[hsl(var(--border))]">
          <div className="space-y-3 sm:space-y-4">
            {/* URL Input */}
            <div className="space-y-1.5">
              <label htmlFor="url" className="block text-sm sm:text-base font-semibold text-[hsl(var(--foreground))]">
                Enter URL
              </label>
              <motion.input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                whileFocus={{ scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border-2 border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] focus:outline-none transition-colors bg-[hsl(var(--background))]"
              />
            </div>

            {/* Color Inputs */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="space-y-1.5">
                <label htmlFor="fgColor" className="block text-xs sm:text-sm font-medium text-[hsl(var(--foreground))]">
                  Foreground
                </label>
                <div className="flex items-center gap-2">
                  <motion.input
                    id="fgColor"
                    type="color"
                    value={fgColor}
                    onChange={(e) => {
                      setFgColor(e.target.value);
                      trackColorChange('foreground');
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    className="w-12 h-12 md:w-10 md:h-10 flex-shrink-0 rounded-md cursor-pointer border-2 border-[hsl(var(--border))]"
                  />
                  <motion.input
                    type="text"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="flex-1 min-w-0 px-2 py-2.5 text-xs sm:text-sm rounded-md border-2 border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] focus:outline-none transition-colors bg-[hsl(var(--background))]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="bgColor" className="block text-xs sm:text-sm font-medium text-[hsl(var(--foreground))]">
                  Background
                </label>
                <div className="flex items-center gap-2">
                  <motion.input
                    id="bgColor"
                    type="color"
                    value={bgColor}
                    onChange={(e) => {
                      setBgColor(e.target.value);
                      trackColorChange('background');
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    className="w-12 h-12 md:w-10 md:h-10 flex-shrink-0 rounded-md cursor-pointer border-2 border-[hsl(var(--border))]"
                  />
                  <motion.input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="flex-1 min-w-0 px-2 py-2.5 text-xs sm:text-sm rounded-md border-2 border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] focus:outline-none transition-colors bg-[hsl(var(--background))]"
                  />
                </div>
              </div>
            </div>

            {/* Format Selection */}
            <div className="space-y-1.5">
              <label className="block text-xs sm:text-sm font-medium text-[hsl(var(--foreground))]">
                Output Formats
              </label>
              <div className="flex flex-wrap gap-2">
                {(['png', 'svg', 'jpg'] as QRFormat[]).map((format) => (
                  <motion.button
                    key={format}
                    type="button"
                    onClick={() => toggleFormat(format)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      scale: formats.includes(format) ? 1 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    className={cn(
                      'px-5 py-2 rounded-md font-medium transition-all text-xs sm:text-sm uppercase tracking-wide',
                      formats.includes(format)
                        ? 'bg-[hsl(var(--primary))] text-white shadow-md'
                        : 'bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))]'
                    )}
                  >
                    {format}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <motion.button
              onClick={generateQR}
              disabled={!url.trim() || formats.length === 0 || isGenerating}
              whileHover={url.trim() && formats.length > 0 && !isGenerating ? { scale: 1.02 } : {}}
              whileTap={url.trim() && formats.length > 0 && !isGenerating ? { scale: 0.98 } : {}}
              animate={
                url.trim() && formats.length > 0 && !isGenerating
                  ? {
                      boxShadow: [
                        '0 10px 25px rgba(185, 137, 108, 0.3)',
                        '0 10px 30px rgba(185, 137, 108, 0.5)',
                        '0 10px 25px rgba(185, 137, 108, 0.3)',
                      ],
                    }
                  : {}
              }
              transition={
                url.trim() && formats.length > 0 && !isGenerating
                  ? {
                      boxShadow: {
                        duration: 2,
                        repeat: Infinity,
                        repeatType: 'loop',
                      },
                      scale: { type: 'spring', stiffness: 400, damping: 17 },
                    }
                  : { type: 'spring', stiffness: 400, damping: 17 }
              }
              className={cn(
                'w-full py-3 sm:py-3.5 rounded-lg font-semibold text-sm sm:text-base transition-all flex items-center justify-center gap-2',
                url.trim() && formats.length > 0 && !isGenerating
                  ? 'bg-[hsl(var(--accent))] text-white hover:opacity-90 shadow-lg'
                  : 'bg-[hsl(var(--muted))] text-gray-400 cursor-not-allowed'
              )}
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                  Generate QR Code
                </>
              )}
            </motion.button>
          </div>

          {/* Mobile Scroll Indicator */}
          {showScrollIndicator && (
            <div className="md:hidden mt-4 pt-4 border-t border-[hsl(var(--border))] flex flex-col items-center animate-bounce">
              <p className="text-xs sm:text-sm text-[hsl(var(--foreground))] opacity-60 mb-2">
                Scroll down to see your QR code
              </p>
              <ChevronDown className="w-5 h-5 text-[hsl(var(--primary))]" />
            </div>
          )}
        </div>

        {/* Right Column - Preview Section */}
        <div
          ref={previewRef}
          className="bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-lg border border-[hsl(var(--border))]"
        >
          <h3 className="text-base sm:text-lg font-semibold text-[hsl(var(--foreground))] mb-3 sm:mb-4">
            Preview
          </h3>

          {/* QR Code Preview */}
          <div className="flex justify-center items-center p-4 sm:p-6 bg-[hsl(var(--background))] rounded-lg min-h-[180px] sm:min-h-[220px]">
            {hasGeneratedQR ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="space-y-4"
              >
                {qrDataURL && (
                  <motion.img
                    src={qrDataURL}
                    alt="Generated QR Code"
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="max-w-full h-auto mx-auto"
                    style={{ maxWidth: '200px' }}
                  />
                )}
              </motion.div>
            ) : (
              <div className="text-center space-y-3">
                <div className="w-28 h-28 sm:w-32 sm:h-32 mx-auto border-2 border-dashed border-[hsl(var(--border))] rounded-lg flex items-center justify-center">
                  <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-[hsl(var(--muted))]" />
                </div>
                <p className="text-xs sm:text-sm text-[hsl(var(--foreground))] opacity-60">
                  Your QR code will appear here
                </p>
              </div>
            )}
          </div>

          {/* Download Buttons */}
          {hasGeneratedQR && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="mt-4 sm:mt-5 space-y-2"
            >
              <p className="text-xs sm:text-sm font-medium text-[hsl(var(--foreground))] opacity-75">
                Download as:
              </p>
              <div className="flex flex-wrap gap-2">
                {formats.includes('png') && qrDataURL && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 20 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => downloadQR('png')}
                    className="flex-1 min-w-[100px] px-4 py-2.5 sm:py-3 bg-[hsl(var(--primary))] text-white rounded-lg font-medium hover:opacity-90 transition-all flex items-center justify-center gap-1.5 sm:gap-2 shadow-md hover:shadow-lg text-xs sm:text-sm"
                  >
                    <Download className="w-4 h-4" />
                    PNG
                  </motion.button>
                )}
                {formats.includes('svg') && qrSVG && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, type: 'spring', stiffness: 300, damping: 20 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => downloadQR('svg')}
                    className="flex-1 min-w-[100px] px-4 py-2.5 sm:py-3 bg-[hsl(var(--primary))] text-white rounded-lg font-medium hover:opacity-90 transition-all flex items-center justify-center gap-1.5 sm:gap-2 shadow-md hover:shadow-lg text-xs sm:text-sm"
                  >
                    <Download className="w-4 h-4" />
                    SVG
                  </motion.button>
                )}
                {formats.includes('jpg') && qrJPG && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, type: 'spring', stiffness: 300, damping: 20 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => downloadQR('jpg')}
                    className="flex-1 min-w-[100px] px-4 py-2.5 sm:py-3 bg-[hsl(var(--primary))] text-white rounded-lg font-medium hover:opacity-90 transition-all flex items-center justify-center gap-1.5 sm:gap-2 shadow-md hover:shadow-lg text-xs sm:text-sm"
                  >
                    <Download className="w-4 h-4" />
                    JPG
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

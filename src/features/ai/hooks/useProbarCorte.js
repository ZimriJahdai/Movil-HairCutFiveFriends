import { useCallback, useState } from 'react';

import { aiClient, getApiError } from '../../../shared/api';
import { imageUriToBase64Parts } from '../../../shared/utils/imagePicker';

// Forma real de la respuesta de POST /ai-haircut/analyze (el Swagger del AI
// Service documenta los request bodies pero no los responses):
//   { success, faceSummary: { faceShape, hairTexture, hairColor, facialLines,
//     recommendedHaircutStyle }, haircutImageBase64, haircutParams }
// Los campos de faceSummary son prosa ("Rostro de forma ovalada"), no enums.
//
// POST /vision/recommend devuelve exactamente lo mismo más un `faceShape` enum
// ("OVALADO") a nivel raíz. No se llama: duplicaría la generación de imagen en
// Gemini —la parte cara y lenta— para un único dato que la pantalla no usa.
const EMPTY_SUMMARY = {};

export function useProbarCorte() {
  const [analysis, setAnalysis] = useState(null);
  const [generatedImage, setGeneratedImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageError, setImageError] = useState('');

  const reset = useCallback(() => {
    setAnalysis(null);
    setGeneratedImage('');
    setError('');
    setImageError('');
  }, []);

  const generate = useCallback(async ({ photoUri, length, style, lengthLabel, styleLabel }) => {
    setLoading(true);
    setError('');
    setImageError('');

    try {
      const { imageBase64, mimeType } = await imageUriToBase64Parts(photoUri);
      const description = [
        styleLabel ? `Corte ${styleLabel.toLowerCase()}` : '',
        lengthLabel ? `de largo ${lengthLabel.toLowerCase()}` : '',
      ]
        .filter(Boolean)
        .join(' ');

      const { data } = await aiClient.post('/ai-haircut/analyze', {
        imageBase64,
        mimeType,
        ...(length ? { length } : {}),
        ...(style ? { style } : {}),
        ...(styleLabel ? { haircutName: styleLabel } : {}),
        ...(description ? { description } : {}),
      });

      const summary = data?.faceSummary || EMPTY_SUMMARY;
      setAnalysis({
        faceShape: summary.faceShape || '',
        hairTexture: summary.hairTexture || '',
        hairColor: summary.hairColor || '',
        facialLines: summary.facialLines || '',
        recommendedHaircutStyle: summary.recommendedHaircutStyle || '',
      });

      // El servicio no informa el mimeType de lo que genera; en la práctica
      // devuelve PNG (el base64 empieza por iVBORw0, cabecera PNG).
      if (data?.haircutImageBase64) {
        setGeneratedImage(`data:image/png;base64,${data.haircutImageBase64}`);
      } else {
        setImageError('El servicio no devolvió una imagen generada.');
      }

      return { ok: true };
    } catch (err) {
      const message = getApiError(err, 'No fue posible analizar la foto.');
      setError(message);
      return { ok: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  return { analysis, generatedImage, loading, error, imageError, generate, reset };
}

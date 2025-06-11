'use client';

import { ChefHat, ImageIcon, Utensils, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface Suggestion {
  dishName?: string;
  imageDescription?: string;
  imageUrl?: string;
  recipe?: string;
}

export default function AISuggestionBox() {
  const [userInput, setUserInput] = useState('');
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) {
      setError('Please tell us what you feel like eating.');
      return;
    }

    setLoading(true);
    setError('');
    setSuggestion(null);
    setImageError('');

    try {
      // Get the dish suggestion first
      const response = await fetch('/api/suggest-dish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const suggestionText = data.suggestion || '';

      // Parse the suggestion text
      const dishNameMatch = suggestionText.match(/\*\*Dish Suggestion:\*\*\s*([^\n]+)/i);
      const imageDescMatch = suggestionText.match(/\*\*Image Description:\*\*\s*([^\n]+(?:\n(?!\*\*)[^\n]+)*)/i);
      const recipeMatch = suggestionText.match(/\*\*Recipe:\*\*\s*([^]+)/i);

      const parsed: Suggestion = {
        dishName: dishNameMatch ? dishNameMatch[1].trim() : 'Could not parse dish name.',
        imageDescription: imageDescMatch ? imageDescMatch[1].trim() : 'Could not parse image description.',
        recipe: recipeMatch ? recipeMatch[1].trim() : 'Could not parse recipe.',
      };

      setSuggestion(parsed);

      // Generate image after setting the suggestion
      if (imageDescMatch && imageDescMatch[1]) {
        setImageLoading(true);
        setImageError('');
        
        try {
          const imageRes = await fetch('/api/generate-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: imageDescMatch[1].trim() }),
          });

          if (imageRes.ok) {
            const { imageUrl } = await imageRes.json();
            setSuggestion((prev) => ({ ...prev, imageUrl }));
          } else {
            const errorData = await imageRes.json();
            console.warn('Image generation failed:', errorData);
            setImageError(errorData.details || 'Failed to generate image. Try a different description.');
          }
        } catch (imageErr) {
          console.warn('Image generation error:', imageErr);
          setImageError('Image generation temporarily unavailable.');
        } finally {
          setImageLoading(false);
        }
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl font-bold text-center">Feeling Creative?</CardTitle>
            <CardDescription className="text-center">
              Tell us what you're in the mood for, and our AI chef will whip up a suggestion!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="e.g., 'something spicy and vegetarian' or 'a light seafood pasta'"
                className="w-full"
                disabled={loading}
              />
              <Button type="submit" className="w-full sm:w-80 mx-auto block flex items-center justify-center gap-2" disabled={loading}>
  {loading ? (
    <>
      <Sparkles className="animate-spin h-4 w-4" />
      Getting Suggestion...
    </>
  ) : (
    <>
      <Sparkles className="h-4 w-4" />
      Ask AI Chef
    </>
  )}
</Button>
            </form>

            {error && <p className="mt-4 text-sm font-medium text-red-600 text-center">{error}</p>}

            {suggestion && (
  <div className="mt-6 space-y-6">
    {suggestion.dishName && (
      <div className="flex items-start gap-2">
        <ChefHat className="text-green-600 mt-1" size={20} />
        <div>
          <h3 className="text-lg sm:text-xl font-semibold">Dish Suggestion:</h3>
          <p>{suggestion.dishName}</p>
        </div>
      </div>
    )}

    {suggestion.imageDescription && (
      <div className="flex items-start gap-2">
        <ImageIcon className="text-blue-600 mt-1" size={20} />
        <div>
          <h3 className="text-xl font-semibold">Image Idea:</h3>
          <p className="italic text-gray-700">{suggestion.imageDescription}</p>

          {imageLoading && (
            <div className="mt-2 p-4 bg-gray-100 rounded-md">
              <p className="text-sm text-gray-600">Generating image...</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-blue-600 h-2 rounded-full animate-pulse"></div>
              </div>
            </div>
          )}

          {!imageLoading && suggestion.imageUrl && (
            <img
              src={suggestion.imageUrl}
              alt={suggestion.dishName || 'Generated Dish'}
              className="mt-2 rounded-md w-full max-w-md mx-auto shadow-lg"
              onError={() => setImageError('Failed to load generated image.')}
            />
          )}

          {!imageLoading && imageError && (
            <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-sm text-yellow-800">{imageError}</p>
            </div>
          )}

          {!imageLoading && !suggestion.imageUrl && !imageError && (
            <p className="text-xs text-gray-400 mt-2">Image generation skipped.</p>
          )}
        </div>
      </div>
    )}

    {suggestion.recipe && (
      <div className="flex items-start gap-2">
        <Utensils className="text-orange-600 mt-1" size={20} />
        <div>
          <h3 className="text-xl font-semibold">Recipe:</h3>
          <div className="prose prose-sm max-w-none whitespace-pre-wrap bg-gray-50 p-4 rounded-md">
            {suggestion.recipe}
          </div>
        </div>
      </div>
    )}
  </div>
)}

          </CardContent>
        </Card>
      </div>
    </section>
  );
}
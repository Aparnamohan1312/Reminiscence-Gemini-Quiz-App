'use client';

import React, { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

interface AudioPlayerProps {
  audioUrl: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();
  const hasToastDisplayedRef = useRef(false);

  useEffect(() => {
    const audioElement = audioRef.current;
    hasToastDisplayedRef.current = false; 

    if (audioElement && audioUrl) {
      audioElement.src = audioUrl; // Ensure src is set/updated
      const playPromise = audioElement.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Playback started successfully
          })
          .catch((error) => {
            if (hasToastDisplayedRef.current) return;

            if (error.name === 'AbortError') {
              // Playback was interrupted, typically by component unmount or src change.
              // This is often an expected part of the lifecycle with keyed components or rapid navigation.
              // console.info(`Playback of ${audioUrl} was aborted (likely due to navigation/cleanup).`);
              // No toast needed as it's an expected interruption.
            } else if (error.name === 'NotAllowedError') {
              // Autoplay was prevented by the browser. This is a common browser policy.
              // console.warn(`Autoplay for ${audioUrl} was prevented by the browser.`);
              toast({
                variant: 'default', // Use a non-destructive variant
                title: 'Autoplay Blocked',
                description: `The browser prevented audio from playing automatically. Please use the player controls if available.`,
              });
              hasToastDisplayedRef.current = true;
            } else {
              // Other, unexpected errors during the play() call
              console.error(`Error attempting to play audio ${audioUrl} (during play initiation):`, error);
              toast({
                variant: 'destructive',
                title: 'Audio Playback Start Error',
                description: `Could not start audio: ${error.message}. Try interacting with the page or using controls.`,
              });
              hasToastDisplayedRef.current = true;
            }
          });
      }
      
      const handleErrorEvent = (e: Event) => {
        if (!hasToastDisplayedRef.current && audioElement?.error) {
            const errorCode = audioElement.error.code;
            let descriptionMessage: string;

            switch(errorCode) {
                case MediaError.MEDIA_ERR_ABORTED: 
                    // console.info(`Audio playback for "${audioUrl}" was aborted by the user or system (Code: ${errorCode}).`);
                    // No toast for aborted, as it's often user/system initiated or due to navigation.
                    hasToastDisplayedRef.current = true;
                    return; // Exit without toasting
                case MediaError.MEDIA_ERR_NETWORK: 
                    descriptionMessage = `A network error occurred while trying to load "${audioUrl}". Please check your internet connection. Ensure the file exists at 'public${audioUrl}' if it's a local file.`; 
                    break;
                case MediaError.MEDIA_ERR_DECODE: 
                    descriptionMessage = `The audio file "${audioUrl}" could not be decoded. It might be corrupted or in an unsupported format. Please verify the file integrity.`; 
                    break;
                case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED: 
                    descriptionMessage = `The audio source "${audioUrl}" is not supported or could not be found. Please ensure the file exists in the 'public/music/' directory (e.g., 'public${audioUrl}') and is a valid MP3 file.`; 
                    break;
                default:
                    descriptionMessage = `An unknown error occurred while trying to load audio "${audioUrl}" (Error code: ${errorCode ?? 'N/A'}). Please ensure the file is correctly placed (e.g., 'public${audioUrl}') and is a valid audio file.`;
            }
            
            console.error(`Media error for ${audioUrl} (Code: ${errorCode}):`, descriptionMessage, audioElement.error);
            toast({
                variant: 'destructive',
                title: 'Audio File Error',
                description: descriptionMessage,
            });
            hasToastDisplayedRef.current = true;
        }
      };

      audioElement.addEventListener('error', handleErrorEvent);

      return () => {
        audioElement.removeEventListener('error', handleErrorEvent);
        if (audioElement) {
          audioElement.pause();
          audioElement.removeAttribute('src'); // Clean up src
          audioElement.load(); // Reset media element state
        }
      };
    }
  }, [audioUrl, toast]);

  if (!audioUrl) {
    return <p className="text-muted-foreground text-sm mt-3 text-center">No mood music for this item.</p>;
  }

  return (
    <audio 
      ref={audioRef} 
      // src={audioUrl} // src is set in useEffect to allow programmatic play
      controls 
      loop 
      // autoPlay // autoPlay is handled programmatically in useEffect
      className="w-full mt-3 rounded-md shadow-sm bg-background/50 border border-input"
      // Direct onError is a fallback, main handling is in the event listener
      onError={(e) => {
        if (!hasToastDisplayedRef.current && audioRef.current?.error) {
          console.error("Audio element direct onError triggered for " + audioUrl, e, audioRef.current.error);
           toast({
                variant: 'destructive',
                title: 'Audio Element Error',
                description: `Failed to load audio: ${audioUrl}. Check console for details. (Error code: ${audioRef.current.error.code})`,
            });
          hasToastDisplayedRef.current = true;
        }
      }}
    >
      Your browser does not support the audio element. 
      Please ensure audio files are in the 'public/music' folder and your browser supports the MP3 format.
    </audio>
  );
};

export default AudioPlayer;

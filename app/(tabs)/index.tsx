import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import { setAudioModeAsync, useAudioPlayer } from 'expo-audio';

const AudioPlayer = ({ source }: { source: { uri: string } }) => {
  const player = useAudioPlayer(source); // Create player instance

  useEffect(() => {
    const playAudio = async () => {
      try {
        await player.play(); // Start playback
      } catch (error) {
        console.error('[AudioPlayer] Playback Error:', error);
        Alert.alert('Playback Error', 'An error occurred while playing the audio.');
      }
    };

    playAudio();

    return () => {
      const stopAudio = async () => {
        try {
          await player.remove(); // Stop playback
        } catch (error) {
          console.error('[AudioPlayer] Cleanup Error:', error);
        }
      };
      stopAudio();
    };
  }, [player]);

  return null; // No visible UI for the player
};

export default function HomeScreen() {
  const [audioSource, setAudioSource] = useState<{ uri: string } | null>(null);

  useEffect(() => {
    configureAudioMode('duckOthers');
  }, []);

  async function configureAudioMode(mode: 'duckOthers' | 'mixWithOthers') {
    try {
      await setAudioModeAsync({
        allowsRecording: false,
        interruptionMode: mode,
        playsInSilentMode: true,
        shouldPlayInBackground: false,
      });
    } catch (error) {
      console.error('Error configuring audio mode:', error);
    }
  }

  const handlePlayAudio = () => {
    // Example URI, replace with your actual audio file URI
    const exampleAudioUri = 'https://www.sample-videos.com/audio/mp3/crowd-cheering.mp3';
    setAudioSource({ uri: exampleAudioUri });
  };

  return (
    <View style={styles.container}>
      <Button title="Play Audio" onPress={handlePlayAudio} />
      {audioSource && <AudioPlayer source={audioSource} />}
    </View>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

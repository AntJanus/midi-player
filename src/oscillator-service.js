const attack = 0.05;
const release = 0.05;
const portamento = 0.05;

export function musicalInstrument() {
  const { oscillator, envelope } = startOscillator();

  return {
    playNote: (note) => {
      playNote(note, oscillator, envelope)
    },
    stopNote: (note) => {
      stopNote(note, oscillator, envelope)
    },
    handleActiveNotes: (activeNotes) => {
      if (activeNotes.length === 0) {
        shutOffEnvelope(envelope);
      }
    }
  };
}

function startOscillator() {
  let context = new AudioContext();
  let oscillator = context.createOscillator();
  let envelope = context.createGain();

  oscillator.frequency.setValueAtTime(110, 0);
  oscillator.connect(envelope);
  envelope.connect(context.destination);
  envelope.gain.value = 0.0;
  oscillator.start(0);

  return { oscillator, envelope};
}

function playNote(noteNumber, oscillator, envelope) {
  oscillator.frequency.cancelScheduledValues(0);
  oscillator.frequency.setTargetAtTime(noteNumber, 0, portamento);
  envelope.gain.cancelScheduledValues(0);
  envelope.gain.setTargetAtTime(1.0, 0, attack);
}

function stopNote(noteNumber, oscillator, envelope) {
  oscillator.frequency.cancelScheduledValues(0);
  oscillator.frequency.setTargetAtTime(noteNumber, 0, portamento);
}

function shutOffEnvelope(envelope) {
  envelope.gain.cancelScheduledValues(0);
  envelope.gain.setTargetAtTime(0.0, 0, release);
}
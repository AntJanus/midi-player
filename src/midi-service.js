export function getMIDIDevice() {
	return navigator.requestMIDIAccess().then(access => {
		let inputList = [];
		for (let input of access.inputs.values()) {
			inputList.push(input);
    }

    if (inputList.length == 0) {
      return {};
    }

		return inputList[0];
	})
}

// taken from https://webaudio.github.io/web-midi-api/#example-9
export function listenToMIDIInput(midiDevice, callback) {
  midiDevice.onmidimessage = (e) => {
    const { data } = e;

    const noteState = isNoteOn(data);
    const noteFrequency = getNoteFrequency(data[1]);

    const note =  {
      state: noteState,
      frequency: noteFrequency,
    };

    console.log(note);

    callback(note);
  };
}

function isNoteOn(data) {
  const maskedMidiChannel = data[0] & 0xf0;
  const couldBeOn = maskedMidiChannel === 0x90;

  return couldBeOn && data[2] !== 0;
}

function getNoteFrequency(note) {
  return 440 * Math.pow(2, (note - 69)/12);
}
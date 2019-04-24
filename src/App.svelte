<script>
	import MIDIInfo from './MidiInfo.svelte';
	import MIDIKeys from './MidiKeys.svelte';
	import { getMIDIDevice, listenToMIDIInput } from './midi-service.js';
	import { musicalInstrument } from './oscillator-service.js';

	let primaryInput = {};
	let pressedNotes = [];
	let instrument = musicalInstrument();

	getMIDIDevice()
		.then(device => {
			primaryInput = device;

			listenToMIDIInput(primaryInput, noteHandler);
		});

	function noteHandler(note) {
		if (note.state) {
			pressedNotes = [...pressedNotes, note.frequency];
			instrument.playNote(note.frequency);
		} else {
			pressedNotes = pressedNotes.filter(n => {
				return n !== note.frequency;
			});

			instrument.stopNote(note.frequency);
		}

		instrument.handleActiveNotes(pressedNotes);
	}
</script>

<style>
	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
</style>

<div class="grid">
	<div class="midi-info">
		<MIDIInfo primaryInput={primaryInput} />
	</div>
	<div class="midi-actions">
		<MIDIKeys pressedKeys={pressedNotes} />
	</div>
</div>

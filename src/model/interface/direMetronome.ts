export interface DireMetronome {
    Directive(): string;
    // Placement(): any;
    Parentheses(): string;
    DefaultY(): number;
    BeatUnit(): string;
    PerMinute(): number;
    // SoundTempo(): number;
}
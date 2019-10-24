export interface Attributes {
    Divisions(): number;
    KeyFifths(): number;
    KeyMode(): string;
    TimeBeats(): number;
    TimeBeatType(): number;
    Staves(): number;
    Clef(): Clef[];
    // StaffDetails(): StaffDetails[]; TODO
}

export interface Clef{
    Number(): number;
    Sign(): string;
    Line(): number;
}


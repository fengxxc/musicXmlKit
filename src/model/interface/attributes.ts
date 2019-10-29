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
    Sign(): string; // 谱号 'G' | 'F' | 'C' | 'TAB'
    Line(): number; // 谱号画在第几线上（从下往上数）
}


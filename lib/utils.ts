import { Mood } from "@/app/context/MoodContext";

export type HogwartsHouse = 'Gryffindor' | 'Hufflepuff' | 'Ravenclaw' | 'Slytherin' | 'Unsorted';

// Defines house alignments based on dominant moods.
export const getHouseForMood = (mood: Mood | string): HogwartsHouse => {
    switch (mood) {
        case 'anger':
        case 'joy':
            return 'Gryffindor'; // Represents passion and courage.
        case 'calm':
            return 'Hufflepuff'; // Represents patience and loyalty.
        case 'neutral':
            return 'Ravenclaw'; // Represents wit and wisdom.
        case 'sadness':
        case 'anxious':
            // Represents ambition in overcoming personal challenges.
            return 'Slytherin';
        default:
            return 'Unsorted';
    }
};

// Provides thematic colors for each house.
export const getHouseColors = (house: HogwartsHouse) => {
    switch (house) {
        case 'Gryffindor':
            return { primary: '#740001', secondary: '#AE0001', text: '#FFFFFF' };
        case 'Hufflepuff':
            return { primary: '#FFD700', secondary: '#FFDB14', text: '#000000' };
        case 'Ravenclaw':
            return { primary: '#0E1A40', secondary: '#222F5B', text: '#FFFFFF' };
        case 'Slytherin':
            return { primary: '#1A472A', secondary: '#2A623D', text: '#FFFFFF' };
        default:
            return { primary: '#374151', secondary: '#4b5563', text: '#FFFFFF' };
    }
}
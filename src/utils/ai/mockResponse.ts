import { QuestionType } from '@/modules/qnai/qnai.model';

export const mockQNAIResponse = [
  {
    id: 1,
    type: QuestionType.MULTIPLE_CHOICE,
    question: "What did Maxwell demonstrate about photons?",
    options: [
      "They have charge",
      "They are electric fields traveling through space",
      "They have resting mass",
      "They travel at the speed of sound"
    ],
    answer: 1,
    context: "As shown by Maxwell, photons are just electric fields traveling through space."
  },
  {
    id: 2,
    type: QuestionType.MULTIPLE_CHOICE,
    question: "What do photons have no?",
    options: [
      "Charge",
      "Resting mass",
      "Speed",
      "Energy"
    ],
    answer: 0,
    context: "Photons have no charge, no resting mass, and travel at the speed of light."
  },
  {
    id: 3,
    type: QuestionType.TRUE_OR_FALSE,
    question: "Photon's contribution of wavelike characteristics to their behavior is insignificant. (True/False)",
    options: [
      "True",
      "False"
    ],
    answer: 1,
    context: "Since they are extremely small particles, the contribution of wavelike characteristics to the behavior of photons is significant."
  },
  {
    id: 4,
    type: QuestionType.MULTIPLE_CHOICE,
    question: "What is the energy stored as in a photon?",
    options: [
      "Magnetic field",
      "Rest mass",
      "Electric field",
      "Radioactive decay"
    ],
    answer: 2,
    context: "This energy is stored as an oscillating electric field."
  },
  {
    id: 5,
    type: QuestionType.MULTIPLE_CHOICE,
    question: "What is the longest theoretical wavelength of light?",
    options: [
      "Size of the universe",
      "Planck length",
      "Visible light",
      "Radio waves"
    ],
    answer: 0,
    context: "Although they have never been observed, the longest theoretical wavelength of light is the size of the universe."
  },
  {
    id: 6,
    type: QuestionType.MULTIPLE_CHOICE,
    question: "What is the speed of light in empty space?",
    options: [
      "3x108 m/s",
      "2x108 m/s",
      "2.997x108 m/s",
      "3.5x108 m/s"
    ],
    answer: 2,
    context: "Photons travel at the speed of light, 2.997x108 m/s in empty space."
  },
  {
    id: 7,
    type: QuestionType.TRUE_OR_FALSE,
    question: "Photons have mass. (True/False)",
    options: [
      "True",
      "False"
    ],
    answer: 1,
    context: "Even though photons have no mass, they have an observable momentum which follows the de Broglie equation."
  },
  {
    id: 8,
    type: QuestionType.MULTIPLE_CHOICE,
    question: "What defines the frequency of a photon?",
    options: [
      "Wavelength",
      "Electric field",
      "Frequency",
      "Rest mass"
    ],
    answer: 2,
    context: "The frequency of a photon is defined as how many wavelengths a photon propagates each second."
  },
  {
    id: 9,
    type: QuestionType.MULTIPLE_CHOICE,
    question: "What equation does the observable momentum of photons follow?",
    options: [
      "Maxwell's equation",
      "Newton's equation",
      "Planck's equation",
      "de Broglie equation"
    ],
    answer: 3,
    context: "The momentum of photons leads to interesting practical applications such as optical tweezers."
  },
  {
    id: 10,
    type: QuestionType.TRUE_OR_FALSE,
    question: "Each photon has a wavelength and a frequency. (True/False)",
    options: [
      "True",
      "False"
    ],
    answer: 0,
    context: "Generally speaking, photons have similar properties to electromagnetic waves. Each photon has a wavelength and a frequency."
  }
];

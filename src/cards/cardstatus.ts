import { FlashCard } from './flashcard.js';

interface CardStatus {
  timestamps: Date[]; // Change timestamp to timestamps (array)
  
  /**
   * Retrieves the {@link edu.cmu.cs214.hw1.cards.FlashCard} associated with this {@code CardStatus}.
   *
   * @return The associated {@link edu.cmu.cs214.hw1.cards.FlashCard}.
   */
  getCard: () => FlashCard;

  /**
   * Retrieves the record of past successes at answering this card.
   *
   * @return A list of boolean's indicating the recorded outcome of previous attempts to answer this card.
   */
  getResults: () => boolean[];

  /**
   * Updates the internal success tracker with a new answering outcome.
   *
   * @param success {@code true} if this card was answered correctly.
   */
  recordResult: (success: boolean) => void;

  /**
   * Resets the record of past answering outcomes.
   */
  clearResults: () => void;
};

/**
 * Creates a new {@link CardStatus} instance.
 *
 * @param card The {@link FlashCard} card to track answer correctness for.
 */
function newCardStatus(card: FlashCard): CardStatus {
  let successes: boolean[] = [];
  let timestamps: Date[] = []; // Store multiple timestamps

  return {
    timestamps, // Use the array
    getCard: function (): FlashCard {
      return card;
    },
    getResults: function (): boolean[] {
      return successes.slice();
    },
    recordResult: function (success: boolean): void {
      successes.push(success);
      timestamps.push(new Date()); // Store timestamp for each result
    },
    clearResults: function (): void {
      successes = [];
      timestamps = [];
    }
  };
};

export { CardStatus, newCardStatus };
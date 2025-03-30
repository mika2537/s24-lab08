import { CardStatus } from '../../cards/cardstatus.js'
import { CardOrganizer } from '../cardorganizer.js'

function newRecentMistakesFirstSorter(): CardOrganizer {
  function lastMistakeTime(cardStatus: CardStatus): number {
    const results = cardStatus.getResults();
    const timestamps: Date[] = Array.isArray(cardStatus.timestamps) ? cardStatus.timestamps : ([] as Date[]);

    let lastMistakeTimestamp = -Infinity;
    for (let i = 0; i < results.length; i++) {
      if (!results[i] && timestamps[i] instanceof Date) {
        lastMistakeTimestamp = Math.max(lastMistakeTimestamp, timestamps[i].getTime());
      }
    }
    return lastMistakeTimestamp;
  }

  return {
    /**
     * Orders the cards by the most recent mistake timestamp.
     *
     * @param cards The {@link CardStatus} objects to order.
     * @return The ordered cards.
     */
    reorganize: function (cards: CardStatus[]): CardStatus[] {
      return [...cards].sort((a, b) => lastMistakeTime(b) - lastMistakeTime(a));
    }
  };
}

export { newRecentMistakesFirstSorter };
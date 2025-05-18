const playerCount = 11;
const courtCount = 2;
const pairsPerRound = courtCount * 2;

const players = Array.from(Array(playerCount)).map((_, idx) => idx);

console.log("Players: ", players);

const matchesPlayedTally = {};
const availablePartnersRecord = {};
for (let i = 0; i < players.length; i++) {
  let currentPlayer = players[i];

  const playerListCopy = [...players.slice(i + 1), ...players.slice(0, i)];

  availablePartnersRecord[currentPlayer] = playerListCopy;
  matchesPlayedTally[currentPlayer] = 0;
}

console.log("Partners list: ", JSON.stringify(availablePartnersRecord));
console.log("Tally: ", JSON.stringify(matchesPlayedTally));

function sortPlayersByPreferred(players) {
  return players.slice().sort((a, b) => {
    const aMatchesPlayed = matchesPlayedTally[a];
    const bMatchesPlayed = matchesPlayedTally[b];
    if (aMatchesPlayed === bMatchesPlayed) {
      return 0;
    }

    return aMatchesPlayed < bMatchesPlayed ? -1 : 1;
  });
}

function recordMatchup(player1, player2) {
  availablePartnersRecord[player1] = availablePartnersRecord[player1].filter(
    (player) => player !== player2
  );
  availablePartnersRecord[player2] = availablePartnersRecord[player2].filter(
    (player) => player !== player1
  );
}

function undoRecordMatchup(player1, player2) {
  availablePartnersRecord[player1].push(player2);
  availablePartnersRecord[player2].push(player1);
}

const rounds = [];
let hasValidPairings = true;
while (hasValidPairings) {
  const bannedPartnersRecord = players.reduce((acc, item) => {
    acc[item] = [];
    return acc;
  }, {});
  const pairs = [];

  while (pairs.length < pairsPerRound && hasValidPairings) {
    console.log(pairs);
    const unpaired = players.filter((player) => !pairs.flat().includes(player));

    let playersByPriority = sortPlayersByPreferred(unpaired);
    const player1 = playersByPriority[0];

    const availablePartners = availablePartnersRecord[player1].filter(
      (player) =>
        !pairs.flat().includes(player) &&
        !bannedPartnersRecord[player1].includes(player)
    );
    const player2 = sortPlayersByPreferred(availablePartners)[0];
    if (player2 === undefined) {
      if (pairs.length > 0) {
        const [lastPair] = pairs.splice(-1);

        matchesPlayedTally[lastPair[0]] -= 1;
        matchesPlayedTally[lastPair[1]] -= 1;
        undoRecordMatchup(lastPair[0], lastPair[1]);

        bannedPartnersRecord[lastPair[0]].push(lastPair[1]);
      } else {
        hasValidPairings = false;
      }
    } else {
      matchesPlayedTally[player1] += 1;
      matchesPlayedTally[player2] += 1;
      recordMatchup(player1, player2);

      const bannedRecordKeys = Object.keys(bannedPartnersRecord);
      bannedRecordKeys.forEach((key) => {
        if (Number(key) > Number(player1)) {
          bannedPartnersRecord[key] = [];
        }
      });

      pairs.push([player1, player2]);
    }
  }

  if (pairs.length === pairsPerRound) {
  }
  rounds.push(pairs);
}

console.log(rounds);
console.log(availablePartnersRecord);

// console.log(availablePartnersRecord);

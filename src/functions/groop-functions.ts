import { NULL_PLAYER } from "@/store/constants";

const shuffle = (array: Array<any>) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const createNumberArray = (len: number) => {
  var newArr = [];
  for (let i = 0; i < len; i++) {
    newArr.push(i + 1);
  }

  return newArr;
};

interface PartnerListObject {
  [key: string]: Array<string>;
}
const generateRounds = (originalPlayerList: Array<string>) => {
  let playerList = [...originalPlayerList];
  if (playerList.length % 2 !== 0) {
    playerList.push(NULL_PLAYER);
  }
  let numberOfRounds = playerList.length - 1;
  let groupsPerRound = playerList.length / 2;
  let roundsAndGroups = [];

  // build the list of potential partners for each player
  let partners: PartnerListObject = {};
  for (let i = 0; i < playerList.length; i++) {
    let currentPlayer = playerList[i];
    let playerListCopy = [...playerList];
    playerListCopy.splice(i, 1);

    partners[currentPlayer] = playerListCopy;
  }

  for (let i = 0; i < numberOfRounds; i++) {
    let playerListTemp = playerList.map((player) => ({
      name: player,
      paired: false,
    }));

    let generatedGroups: Array<Array<string>> = [];
    // begin generating groups for a single round
    let bannedGroups: Array<Array<string>> = [];
    while (generatedGroups.length < groupsPerRound) {
      // get the first unpaired player
      let player1 = playerListTemp.find((player) => player.paired === false);

      if (!player1) break;

      // get the list of players they have not been matched with yet
      let potentialPartners = partners[player1.name];

      // start finding a player to pair with
      let potentialGroup = [player1.name];

      // loop through each of the potential partners
      for (let i = 0; i < potentialPartners.length; i++) {
        // find the player object of the partner
        let player2 = playerListTemp.find(
          (player) => player.name === potentialPartners[i]
        );

        if (!player2) break;

        // check if the player has been paired this round
        if (!player2.paired) {
          // if the player is available, add them to the temporary group
          potentialGroup.push(player2.name);

          // check if this pairing has caused a future matching error before
          if (
            !JSON.stringify(bannedGroups).includes(
              JSON.stringify(potentialGroup)
            )
          ) {
            // then, add the group to the list of generated groups
            generatedGroups.push(potentialGroup);

            // mark the players as paired
            let indexOfFirstPlayer = playerList.indexOf(potentialGroup[0]);
            let indexOfSecondPlayer = playerList.indexOf(potentialGroup[1]);
            playerListTemp[indexOfFirstPlayer].paired = true;
            playerListTemp[indexOfSecondPlayer].paired = true;

            // stop traversing the partner list
            break;
          } else {
            // if yes, move on to the next partner
            potentialGroup.pop();
          }
        }
      }

      // check if a partner was found
      if (potentialGroup.length < 2) {
        //console.log(potentialGroup);
        // if no partner was found, break up the previous group
        let lastGroup = generatedGroups.pop() || [];
        if (lastGroup.length === 0) break;

        // add the group to the list of banned pairings
        bannedGroups.push(lastGroup);

        // remove the banned groups not of the same player1
        // when I pop CE, I want to remove banned groups for D
        // however, when I pop DE, I want to retain CE, but clear I
        bannedGroups = bannedGroups.filter((group) => {
          let poppedPlayer1Index = playerList.indexOf(lastGroup[0]);
          let groupPlayer1Index = playerList.indexOf(group[0]);
          return groupPlayer1Index <= poppedPlayer1Index;
        });

        // unset the paired status of these players
        let indexOfFirstPlayer = playerList.indexOf(lastGroup[0]);
        let indexOfSecondPlayer = playerList.indexOf(lastGroup[1]);

        playerListTemp[indexOfFirstPlayer].paired = false;
        playerListTemp[indexOfSecondPlayer].paired = false;
      }
    }

    // update the potential partner lists
    for (let i = 0; i < generatedGroups.length; i++) {
      let player1 = generatedGroups[i][0];
      let player2 = generatedGroups[i][1];

      let player1Partners = partners[player1];
      let player2Partners = partners[player2];

      player1Partners.splice(player1Partners.indexOf(player2), 1);
      player2Partners.splice(player2Partners.indexOf(player1), 1);

      partners[player1] = player1Partners;
      partners[player2] = player2Partners;
    }

    roundsAndGroups.push(generatedGroups);
  }

  return roundsAndGroups;
};

function getMatchesAndLeftover<T>(teamList: T[]) {
  const teamsCopy = teamList.slice();
  const pairedTeams: T[] = [];
  while (teamsCopy.length >= 2) {
    const matchup = teamsCopy.splice(0, 2);
    matchup.forEach((team) => pairedTeams.push(team));
  }

  return { matches: pairedTeams, leftover: teamsCopy.flat() };
}

function reorderPairsInRounds(rounds: string[][][]) {
  // create a copy of the rounds with NULL_PLAYER pairs removed
  const validRounds = rounds.map((round) =>
    round.filter((pair) => !pair.includes("NULL_PLAYER"))
  );

  const roundsSortingOrder: Array<string[][] | null> = [];
  let playersRestedLastRound: string[] = [];

  console.log(validRounds);

  // strategy: swap the leftover pair with each other pair until they don't rest 2 rounds in a row
  validRounds.forEach((pairList) => {
    let swapIndex = pairList.length - 1;
    let orderValidated = false;

    while (!orderValidated && swapIndex >= 0) {
      const reorderedPairs = pairList.slice(0, -1);
      reorderedPairs.splice(swapIndex, 0, pairList[pairList.length - 1]);
      console.log(reorderedPairs);
      const { leftover } = getMatchesAndLeftover(reorderedPairs);

      const hasRestedPlayer = leftover.some((player) =>
        playersRestedLastRound.includes(player)
      );

      if (hasRestedPlayer) {
        swapIndex -= 1;
      } else {
        playersRestedLastRound = leftover;
        orderValidated = true;
      }
    }

    if (orderValidated) {
      const pairOrder = pairList.slice(0, -1);
      pairOrder.splice(swapIndex, 0, pairList[pairList.length - 1]);
      roundsSortingOrder.push(pairOrder);
    } else {
      roundsSortingOrder.push(null);
    }
  });

  const roundsSortingOrderStrings = roundsSortingOrder.map((round) => {
    return round ? round.map((pair) => JSON.stringify(pair)) : null;
  });

  console.log(roundsSortingOrderStrings);

  const reorderedRounds: Array<string[][] | null> = [];
  rounds.forEach((round, index) => {
    const sortingOrder = roundsSortingOrderStrings[index];

    if (sortingOrder) {
      const sorted = round.sort((a, b) => {
        const aIndex = sortingOrder.indexOf(JSON.stringify(a));
        const bIndex = sortingOrder.indexOf(JSON.stringify(b));
        if (aIndex < 0) return 1;
        if (bIndex < 0) return -1;
        if (aIndex === bIndex) return 0;

        return aIndex < bIndex ? -1 : 1;
      });

      reorderedRounds.push(sorted);
    }

    reorderedRounds.push(null);
  });

  return reorderedRounds;
}

export { shuffle, createNumberArray, generateRounds, reorderPairsInRounds };

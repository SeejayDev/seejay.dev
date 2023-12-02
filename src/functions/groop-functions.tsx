import { NULL_PLAYER } from "@/store/constants";

const shuffle = (array: Array<string | number>) => {
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
  let playerList = [...originalPlayerList].map((player) => player.toString());
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
    playerListCopy.splice(playerList.indexOf(currentPlayer), 1);

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
          let poppedPlayer1 = lastGroup[0];
          let groupPlayer1 = group[0];
          let poppedPlayer1Index = playerList.indexOf(poppedPlayer1);
          let groupPlayer1Index = playerList.indexOf(groupPlayer1);
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

export { shuffle, createNumberArray, generateRounds };

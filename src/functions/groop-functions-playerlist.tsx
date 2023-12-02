const PLAYER_LIST = "playerList";

const fetchPlayerList = () => {
  var playerListRaw = localStorage.getItem(PLAYER_LIST);

  // check if the item exists
  if (playerListRaw === null) {
    // if it does not exist yet, set it as an empty array
    localStorage.setItem(PLAYER_LIST, JSON.stringify([]));

    // and return an empty array
    return [];
  }

  // if the item exists, parse it
  var playerList = JSON.parse(playerListRaw);
  return [...playerList];
};

const addToPlayerList = (newPlayer: string) => {
  var currentList = fetchPlayerList();

  newPlayer = newPlayer.toUpperCase();
  // check if name already exists
  if (currentList.indexOf(newPlayer) >= 0) {
    alert("Duplicate player name");
  } else {
    currentList.push(newPlayer);
    localStorage.setItem(PLAYER_LIST, JSON.stringify(currentList));
  }
};

const removeFromPlayerList = (index: number) => {
  var currentList = fetchPlayerList();

  var confirmAction = confirm(
    "Are you sure you want to remove " + currentList[index] + " from the list?"
  );
  if (confirmAction) {
    currentList.splice(index, 1);
    localStorage.setItem(PLAYER_LIST, JSON.stringify(currentList));
  }
};

export { fetchPlayerList, addToPlayerList, removeFromPlayerList };

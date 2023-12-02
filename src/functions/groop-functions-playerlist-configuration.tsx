const PLAYERLIST_CONFIGURATION = "groop_playerlist_configuration";

const fetchConfiguration = () => {
  var playerlistConfiguration = localStorage.getItem(PLAYERLIST_CONFIGURATION);

  // check if the item exists
  if (playerlistConfiguration !== null) {
    // if the item exists, parse it
    var playerList = JSON.parse(playerlistConfiguration);
    return [...playerList];
  }

  return null;
};

const setConfiguration = (playerList: Array<string>) => {
  localStorage.setItem(PLAYERLIST_CONFIGURATION, JSON.stringify(playerList));
};

const clearConfiguration = () => {
  localStorage.removeItem(PLAYERLIST_CONFIGURATION);
};

export { fetchConfiguration, setConfiguration, clearConfiguration };

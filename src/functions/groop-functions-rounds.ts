const GROOP_ROUNDS = "groop-rounds";

const fetchStorageRounds = () => {
  var rounds = localStorage.getItem(GROOP_ROUNDS);

  // check if the item exists
  if (rounds !== null) {
    // if the item exists, parse it
    var generatedRounds = JSON.parse(rounds);
    return generatedRounds;
  }

  return null;
};

const setStorageRounds = (rounds: Array<any>) => {
  localStorage.setItem(GROOP_ROUNDS, JSON.stringify(rounds));
};

const clearStorageRounds = () => {
  localStorage.removeItem(GROOP_ROUNDS);
};

export { fetchStorageRounds, setStorageRounds, clearStorageRounds };

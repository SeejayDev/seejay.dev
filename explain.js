players = [A, B, C, D, E, F];

partners = {
  A: [B, C, D, E, F],
  B: [A, C, D, E, F],
  C: [A, B, D, E, F],
  D: [A, B, C, E, F],
  E: [A, B, C, D, F],
  F: [A, B, C, D, E],
};

let list = [
  { name: A, paired: false },
  { name: B, paired: false },
  { name: C, paired: false },
  { name: D, paired: false },
  { name: E, paired: false },
  { name: F, paired: false },
];

let player1 = A;
potential_partners = [B, C, D, E, F];
potential_group = [A, B];
generated_groups = [[A, B]];

player1 = C;
potential_partners = [A, B, D, E, F];
potential_group = [C, D];
generated_groups = [
  [A, B],
  [C, D],
];

player1 = E;
potential_partners = [A, B, C, D, F];
potential_group = [E, F];
generated_groups = [
  [A, B],
  [C, D],
  [E, F],
];

player1 = A;
potential_partners = [C, D, E, F];
potential_group = [A, C];
generated_groups = [[A, C]];

player1 = B;
potential_partners = [C, D, E, F];
potential_group = [B, D];
generated_groups = [
  [A, C],
  [B, D],
];

player1 = E;
potential_partners = [A, B, C, D];
potential_group = [E];
// unable to form a group, no more available partners
// therefore, break up the previous group (B, D)
// ban the combination [B, D]

player1 = E;
potential_partners = [A, B, C, D, F];
potential_group = [E, F];
generated_groups = [
  [A, B],
  [C, D],
  [E, F],
];

AC, BD, EF, GH;

AC, BG, EF, GD;

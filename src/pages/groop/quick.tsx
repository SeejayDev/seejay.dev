import { createNumberArray, shuffle } from "@/functions/groop-functions";
import React, { useState } from "react";

const quick = () => {
  const [count, setCount] = useState("");
  const [groups, setGroups] = useState<Array<Array<number>>>();
  const [extras, setExtras] = useState<Array<number>>();
  const numberPerGroup = 2;

  const _onSubmit = () => {
    if (!count) {
      alert("No number entered!");
      return;
    }

    let numberOfPeople = parseInt(count);
    if (numberPerGroup > numberOfPeople) {
      alert(
        `How the heck do I split ${numberOfPeople} into groups with ${numberPerGroup} people???`
      );
      return;
    }

    // create the array
    var arrayOfPeople = createNumberArray(numberOfPeople);
    shuffle(arrayOfPeople);

    // generate the groups
    var arrayOfGroups = [];
    var remainingPeople = arrayOfPeople.length;
    var index = 0;
    while (remainingPeople >= numberPerGroup) {
      var newGroup = [];
      for (let i = 0; i < numberPerGroup; i++) {
        newGroup.push(arrayOfPeople[index]);
        remainingPeople--;
        index++;
      }
      arrayOfGroups.push(newGroup);
    }

    var arrayOfExtras = [];
    for (let i = 0; i < remainingPeople; i++) {
      let indexFromBack = arrayOfPeople.length - 1 - i;
      arrayOfExtras.push(arrayOfPeople[indexFromBack]);
    }

    setGroups(arrayOfGroups);
    setExtras(arrayOfExtras);
  };

  return (
    <>
      <div className="px-2 w-full mx-auto max-w-xs mt-8">
        <a href="./">
          <p className="font-bold text-6xl text-purple-600 text-center">
            GROOP
          </p>
          <p className="text-center text-sm font-bold italic text-purple-600">
            A grouping app for badminton
          </p>
        </a>

        <div className="flex flex-col mt-8">
          <input
            value={count}
            onChange={(e) => setCount(e.target.value)}
            type="number"
            className="border-2 rounded-md p-2 text-center"
            placeholder="How many people?"
            name="numberOfPeople"
          />
          <input
            required
            type="number"
            className="border-2 rounded-md p-2 text-center mt-2 hidden"
            value="2"
            readOnly
            placeholder="How many per group?"
            name="numberPerGroup"
          />

          <button
            className="border-2 cursor-pointer border-purple-600 rounded-md mt-4 py-2 font-bold text-purple-600"
            onClick={_onSubmit}
          >
            GROOP
          </button>
        </div>

        <div className="mt-8">
          <p className="font-bold text-lg">Extras:</p>

          <div className="space-y-3 ">
            {extras
              ? extras.map((extra, idx) => {
                  return (
                    <p
                      key={`extra_${idx}`}
                      className="font-bold text-purple-600"
                    >
                      Player {extra}
                    </p>
                  );
                })
              : "-"}
          </div>
        </div>

        <div className="mt-4">
          <p className="font-bold text-lg">Groups:</p>

          <div className="mt-2 gap-4 grid grid-cols-2" id="container-groups">
            {groups
              ? groups.map((group, idx) => (
                  <div
                    key={`group_${idx}`}
                    className="py-3 items-center justify-between text-center font-medium text-lg text-white bg-purple-600 rounded-md"
                  >
                    <p>Player {group[0]}</p>
                    <p>Player {group[1]}</p>
                  </div>
                ))
              : "-"}
          </div>
        </div>
      </div>
    </>
  );
};

export default quick;

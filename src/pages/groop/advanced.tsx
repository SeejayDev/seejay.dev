import { generateRounds, shuffle } from "@/functions/groop-functions";
import {
  addToPlayerList,
  fetchPlayerList,
  removeFromPlayerList,
} from "@/functions/groop-functions-playerlist";
import React, { useEffect, useState } from "react";
import { NULL_PLAYER } from "../../store/constants";
import Link from "next/link";
import GroopHeader from "./components/header";
import PersonIcon from "@/icons/PersonIcon";
import CrossIcon from "@/icons/CrossIcon";
import PersonAddIcon from "@/icons/PersonAddIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  fetchConfiguration,
  setConfiguration,
} from "@/functions/groop-functions-playerlist-configuration";
import CrossedSwordsIcon from "@/icons/CrossedSwordsIcon";

const advanced = () => {
  const [players, setPlayers] = useState<Array<string>>([]);
  const [nameInput, setNameInput] = useState("");
  const [rounds, setRounds] = useState<Array<Array<Array<string>>>>([]);

  const _addNewPlayer = () => {
    if (nameInput !== "" && nameInput !== NULL_PLAYER) {
      addToPlayerList(nameInput);
      setNameInput("");
      syncStateWithStorage();
    }
  };

  const _removePlayer = (idx: number) => {
    removeFromPlayerList(idx);
    syncStateWithStorage();
  };

  const _generateGroups = (playerList: Array<string>) => {
    let shuffled = shuffle([...playerList]);
    let roundsAndGroups = generateRounds(
      shuffled.map((player) => player.toString())
    );
    setConfiguration(playerList);
    setRounds(roundsAndGroups);
  };

  const syncStateWithStorage = () => {
    setPlayers(fetchPlayerList());
  };

  useEffect(() => {
    let playerList = fetchPlayerList();
    setPlayers(playerList);
    let playerlistConfiguration = fetchConfiguration();
    if (playerlistConfiguration) {
      let roundsAndGroups = generateRounds(playerList);
      setRounds(roundsAndGroups);
    }
  }, []);

  return (
    <div className="px-6 w-full mx-auto max-w-sm">
      <GroopHeader />

      {rounds.length === 0 ? (
        <div>
          <div className="flex items-center justify-between mt-4">
            <p className="uppercase font-bold">List of players</p>
            <div
              className=" font-bold bg-purple-600 px-3 py-1 text-white rounded-md flex items-center justify-center"
              id="player-count"
            >
              {players.length}
            </div>
          </div>
          {players?.length > 0 && (
            <div className="mt-2 text-purple-600 w-full px-4 py-1 shadow-lg border border-purple-600 rounded-lg">
              {players.map((player, idx) => {
                return (
                  <div
                    key={player}
                    className="py-2 flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <PersonIcon className="mr-2 text-xl" />
                      <p className="uppercase font-bold">{player}</p>
                    </div>
                    <button
                      className="text-red-600 touchable-opacity"
                      onClick={() => _removePlayer(idx)}
                    >
                      <CrossIcon className="text-2xl" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex mt-4 items-center w-full space-x-2">
            <div className="flex-1">
              <input
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                type="text"
                className="border-b-2 px-2 h-10 w-full"
                placeholder="Player Name"
              />
            </div>
            <button
              className="bg-green-700 touchable-opacity rounded-full p-2 w-10 h-10 justify-center flex items-center"
              onClick={_addNewPlayer}
            >
              <PersonAddIcon className="text-white text-xl" />
            </button>
          </div>

          <button
            className="border-2 w-full cursor-pointer border-purple-600 rounded-md mt-4 py-2 font-bold text-purple-600"
            onClick={() => _generateGroups(players)}
          >
            GROOP
          </button>
        </div>
      ) : (
        <>
          <Swiper slidesPerView={1} className="mt-4" spaceBetween={20}>
            {rounds.map((round, idx) => {
              return (
                <SwiperSlide key={`round_${idx}`} className="">
                  <div className="py-4">
                    <div className="border-4 border-purple-600 px-4 pt-5 rounded-lg relative">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <p className="font-bold bg-purple-600 px-8 py-1 rounded-full text-white inline-block text-sm">
                          Round {idx + 1}
                        </p>
                      </div>

                      {round.map((group, idx2) => {
                        let isOddPair = idx2 % 2 !== 0;
                        return (
                          <div key={`pair_${idx}`} className="relative">
                            <div
                              className={`p-3 w-full mt-3 ${
                                !isOddPair
                                  ? "bg-purple-600 mb-3"
                                  : "bg-purple-900 mb-6"
                              } items-center justify-between font-medium overflow-hidden uppercase text-white rounded-md`}
                            >
                              <p>{group[0].replace(NULL_PLAYER, "-")}</p>
                              <p>{group[1].replace(NULL_PLAYER, "-")}</p>

                              <div className="rounded-full border-8 border-white absolute w-20 h-20 -right-1 top-1 flex items-center justify-center opacity-70 rotate-12">
                                <p className="font-bold text-2xl">{idx2 + 1}</p>
                              </div>
                            </div>

                            {isOddPair && (
                              <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 pb-2">
                                <div
                                  className={`bg-purple-900 w-16 h-16 p-3 rounded-full border-8 border-white flex items-center justify-center z-20`}
                                >
                                  <CrossedSwordsIcon className="text-xl text-white" />
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <button
            className="border-2 w-full cursor-pointer touchable-opacity border-purple-600 rounded-md py-2 font-bold text-purple-600"
            onClick={() => setRounds([])}
          >
            Edit Player List
          </button>
        </>
      )}
    </div>
  );
};

export default advanced;

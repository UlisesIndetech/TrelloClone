"use client";

import Image from "next/image";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import Avatar from "react-avatar";
import { useBoardStore } from "@/store/BoardStore";
import { useEffect, useState } from "react";
import fetchSuggestion from "@/lib/fetchSuggestion";

function Header() {
  const [board, searchString, setSearchString] = useBoardStore((state) => [
    state.board,
    state.searchString,
    state.setSearchString
  ])

  const [loading, setLoading] = useState<boolean>(false);
  const [suggestion, setSuggestion] = useState<any[]>([]);

  useEffect(() => {
    if (board.columns.size === 0) return;
    setLoading(true);
    const fetchSuggestionFunc = async () => {
      const suggestion = await fetchSuggestion(board);
      setSuggestion(suggestion);
      setLoading(false);
    }

    setTimeout(() => {
      fetchSuggestionFunc()
    }, 3000);
    

  }, [board])



  return (
    <header>
      <div className="flex flex-col md:flex-row items-center p-5 bg-gray-400">
        <div className="absolute top-0 left-0 h-96 w-full  rounded-b-md -z-50 opacity-50 " />
        <Image
          src="https://upload.wikimedia.org/wikipedia/en/8/8c/Trello_logo.svg"
          alt="Trello logo"
          width={300}
          height={100}
          className="w-44 md:w-56 pb-10 md:pb-0 object-contain"
        />
        <div className="flex items-center space-x-5 flex-1 justify-end w-full">
          <form className="flex items-center space-x-5 bg-white  p-2 shadow-md flex-1 md:flex-initial">
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
            <input type="text" placeholder="Search" value={searchString} onChange={e => setSearchString(e.target.value)} className="flex-1" />
            <button type="submit" hidden>
              Search
            </button>
          </form>
          {/*Mejorar este componente que sea un desplegable cuando hagas la autentificacion*/}
          <a href="/"><Avatar name="Ulises Lupercio" round size="50" color="#0055D1" /></a>
        </div>
      </div>
    </header>
  );
}

export default Header;

"use client";

import Image from "next/image";

function Footer() {
  return (
    <div className="fixed justify-between flex bottom-0 w-full p-2 border-t bg-slate-300">
      <img
          src="./images/Trello-icon.svg"
          alt="Trello logo"
          width={20}
        />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <button>Politicas de Privacidad</button>
          <button>Terminos de Servicio</button>
        </div>
    </div>
  );
}

export default Footer;

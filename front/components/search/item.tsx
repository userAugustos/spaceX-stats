import Image from 'next/image';
import {Launch} from "@/types";
import ytLogo from '../../public/youtube-svgrepo-com.svg'

export default function Item({launch}: { launch: Launch }) {
  return (
    <div className="w-full bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 item flex flex-wrap">
      <section className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white w-1/2 md:w-[14.2%]">
        {launch.flight_number}
      </section>
      <section className="px-6 py-4 w-1/2 md:w-[14.2%]">
        <img className="max-w-[48px]" src={launch.links.patch.small} alt="logo de lançamento" />
      </section>
      <section className="px-6 py-4 w-1/2 md:w-[14.2%]">
        {launch.name}
      </section>
      <section className="px-6 py-4 w-1/2 md:w-[14.2%]">
        {new Date(launch.date_utc).toLocaleDateString('pt-BR')}
      </section>
      <section className="px-6 py-4 w-1/2 md:w-[14.2%]">
        {launch.rocketData.name}
      </section>
      <section className="px-6 py-4 w-1/2 md:w-[14.2%]">
        {launch.success ? <span className="text-green-400 font-bold">Sucesso</span>
          : <span className="text-red-500 font-bold">Falha</span>}
      </section>
      <section className="px-6 py-4 text-right w-1/2 md:w-[14.2%]">
        <a href={launch.links.webcast} target="_blank" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
          <Image
            className="max-w-[48px]"
            src={ytLogo}
            alt="logo de lançamento"
          />
        </a>
      </section>
    </div>
  );
}

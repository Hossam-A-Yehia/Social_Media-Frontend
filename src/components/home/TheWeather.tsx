import {
  CloudHail,
  CloudLightning,
  CloudMoon,
  CloudRainWind,
  CloudSun,
  Haze,
  MapPin,
  Sun,
} from "lucide-react";

export default function TheWeather() {
  return (
    <div className="flex flex-col bg-sky-500 py-6 text-center  rounded-xl w-full bg-[url(https://friendkit.cssninja.io/assets/img/illustrations/cards/weather-bg.svg)] bg-no-repeat bg-cover bg-center mx-auto justify-center text-slate-100  ">
      <span className="text-3xl font-semibold ">
        71<sup>o</sup>
      </span>
      <Sun size={50} className="mx-auto my-3" />
      <h3 className="text-xl font-medium mb-2">Sunny</h3>
      <div className="flex items-center justify-center gap-4 mb-3">
        <span className="text-sm">Real Feel: 78°</span>
        <span className="text-sm">Rain Chance: 5%</span>
      </div>
      <div className=" bg-[#c3bebe8c] px-2 py-3  rounded-lg  items-center justify-center text-center gap-3 mx-auto hidden lg:flex">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[12px]">MON</span>
          <Sun size={20} />
          <span className="text-[12px]">
            69 <sup>o</sup>
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-[12px]">TUE</span>
          <CloudLightning size={20} />
          <span className="text-[12px]">
            74 <sup>o</sup>
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-[12px]">WED</span>
          <CloudMoon size={20} />
          <span className="text-[12px]">
            73 <sup>o</sup>
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-[12px]">THU</span>
          <CloudSun size={20} />
          <span className="text-[12px]">
            68 <sup>o</sup>
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-[12px]">FRI</span>
          <CloudHail size={20} />
          <span className="text-[12px]">
            55 <sup>o</sup>
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-[12px]">SAT</span>
          <CloudRainWind size={20} />
          <span className="text-[12px]">
            58 <sup>o</sup>
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-[12px]">SUN</span>
          <Haze size={20} />
          <span className="text-[12px]">
            64 <sup>o</sup>
          </span>
        </div>
      </div>
      <div className="text-lg font-semibold mt-3">Sunday, 18th 2018</div>
      <span className="flex items-center mx-auto text-sm mb-2">
        <MapPin size={15} />
        Los Angeles, CA
      </span>
    </div>
  );
}

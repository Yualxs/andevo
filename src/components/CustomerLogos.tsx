// EN: src/components/CustomerLogos.tsx
import { Container } from "./Container";
import Image from 'next/image';

// Un sub-componente interno solo para este archivo, que maneja el efecto de hover.
const LogoItem = ({ imgWhite, imgColor, alt }: { imgWhite: string; imgColor: string; alt: string; }) => {
  return (
    // 'group' nos permite controlar el hover de los hijos
    <div className="relative group flex items-center justify-center h-16 md:h-20">
      
      {/* 1. Logo Blanco (visible por defecto) */}
      <Image
        src={imgWhite}
        alt={alt}
        fill
        className="object-contain
                   transition-opacity duration-300 ease-in-out
                   group-hover:opacity-0"
        sizes="(max-width: 768px) 50vw, 16.6vw"
      />
      
      {/* 2. Logo de Color (oculto por defecto) 
         - CORRECCIÓN: Se quitó 'p-2'.
         - 'm-auto' lo centra perfectamente sobre el otro logo.
      */}
      <Image
        src={imgColor}
        alt={alt}
        fill
        className="object-contain
                   opacity-0 transition-opacity duration-300 ease-in-out
                   group-hover:opacity-100"
        sizes="(max-width: 768px) 50vw, 16.6vw"
      />
    </div>
  );
};

// Array con toda la data de los logos (sin cambios)
const logoData = [
  { alt: "Andes", white: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/680ac147044dd95a0d810d00_Andes%20White.svg", color: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/680ac1472af03d94347c443e_Andes%20Color.svg" },
  { alt: "Alpaca Expeditions", white: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/680ac147535859be1f7a8abb_Alpaca%20Expeditions%20White.svg", color: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/680ac14794e1f8e203c3ef87_Alpaca%20Expeditions%20Color.svg" },
  { alt: "Cusela", white: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/680ac149533bb06e1c196f97_Cusela%20White.svg", color: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/680ac1495a37900321320748_Cusela%20Color.svg" },
  { alt: "Sam Travel", white: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/680ac14fa447c81f47995d1d_Sam%20Travel%20White.svg", color: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/680ac14d08d861c7d9c3efe9_Sam%20Travel%20Color.svg" },
  { alt: "Remax", white: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/680ac14cce02981ac290217f_Remax%20White.svg", color: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/680ac14cab922fc3995194e1_Remax%20Color.svg" },
  { alt: "Super Jump Park", white: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/680ac14df431bfabf8d34e43_Super%20Jump%20Park%20White.svg", color: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/680ac14f5198ac3d54c2ff6b_Super%20Jump%20Park%20Color.svg" },
  { alt: "Century 21", white: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/680ac14958d7ccc12cdb0eaa_Century%2021%20White.svg", color: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/680ac147a763c1bdcf46c301_Century%2021%20Color.svg" },
  { alt: "Huaypo Adventure", white: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/680ac14bc9dd4b9269546577_Huaypo%20Adventure%20White.svg", color: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/680ac14b8aa30760941001cb_Huaypo%20Adventure%20Color.svg" },
  { alt: "Group Travel", white: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/680ac14994e1f8e203c3f238_Group%20Travel%20White.svg", color: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/680ac1497f8cb20a0ac4fc75_Group%20Travel%20Color.svg" },
  { alt: "Fun House", white: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/680ac149122caffaf6e307fc_Fun%20House%20White.svg", color: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/680ac1495a37900321320750_Fun%20House%20Color.svg" },
  { alt: "Orange Nation", white: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/680ac14c61bf738d0ebdd9c9_Orange%20Nation%20White.svg", color: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/680ac14c7f8cb20a0ac4ffa3_Orange%20Nation%20Color.svg" },
  { alt: "Bioandean Expeditions", white: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/680ac1496c56d4bb7b5ee7ae_Bioandean%20Expeditions%20White.svg", color: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/680abf4ba447c81f479777ae_Bioandean%20Expeditions%20Color.svg" },
  { alt: "Sacred Loom Peru", white: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/680c42cffee124cd0ed7c973_Sacred%20Loom%20Peru%20White.svg", color: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/680c42ce0c687a098d46d0e0_Sacred%20Loom%20Peru%20Color.svg" },
  { alt: "Inca Peru Travel", white: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/680c42cb2db265232af8752e_Inca%20Peru%20Travel%20White.svg", color: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/680c42cbe95a768568ebc1b6_Inca%20Peru%20Travel%20Color.svg" },
  { alt: "Uros Expeditions", white: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/680ac14f76c3d0c79515682a_Uros%20Expeditions%20White.svg", color: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/680ac14f3e047dabab678429_Uros%20Expeditions%20Color.svg" },
  { alt: "Machulas Journey", white: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/680c42cdd07e8bfb9bb4a62f_Machulas%20Journey%20White.svg", color: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/680c42cd2db265232af875c7_Machulas%20Journey%20Color.svg" },
  { alt: "Kanka Salones & Eventos", white: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/680c42cb8a0f514d21fa3727_Kanka%20Salones%20%26%20Eventos%20White.svg", color: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/680c42cbe53510a6429844dc_Kanka%20Salones%20%26%20Eventos%20Color.svg" },
  { alt: "Lux Store", white: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/680c42cba508fe47cc21e790_Lux%20Store%20White.svg", color: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/680c42cb2e5910cf2f0120e9_Lux%20Store%20Color.svg" },
  { alt: "Royal Carpet Cleaning", white: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/680c42cd7e230b47575ad437_Royal%20Carpet%20Cleaning%20White.svg", color: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/680c42ceb37b2d0c0b5edc6a_Royal%20Carpet%20Cleaning%20Color.svg" },
  { alt: "Aguilas Adventure", white: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/680c450a10e51406aa9db6b3_Aguilas%20Adventure%20White.svg", color: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/680c450ae53510a6429926c2_Aguilas%20Adventure%20Color.svg" },
  { alt: "Discover Pachamama", white: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/680c42cbb7075cbfe0719562_Discover%20Pachamama%20White.svg", color: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/680c42cbff3e7d8260207226_Discover%20Pachamama%20Color.svg" },
  { alt: "Peru Hikers", white: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/680c42cd7c49075223a086ef_Peru%20Hikers%20White.svg", color: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/680c42cedba1dd9ee387aba3_Peru%20Hikers%20Color.svg" },
  { alt: "Salkantay Explorer", white: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/680ac14c9a8adcdde894c362_Salkantay%20Explorer%20White.svg", color: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/680ac14cde55f2214abd188a_Salkantay%20Explorer%20Color.svg" },
  { alt: "Action Valley", white: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/680ac146de55f2214abd15bd_Action%20Valley%20White.svg", color: "https://cdn.prod.website-files.com/65e7d2ecaa6371ad74acb2dd/680ac14608d861c7d9c3eb13_Action%20Valley%20Color.svg" },
];

// El componente principal de la sección
export const CustomerLogos = () => {
  return (
    // 'bg-black' replica el 'background-color-primary'
    // CORRECCIÓN: 
    // - Añadimos 'relative z-10' para apilarlo sobre la sección anterior.
    // - Añadimos 'rounded-t-[3.2rem]' (51.2px) para las esquinas.
    // - Añadimos '-mt-[3.2rem]' para "meterlo" debajo de la sección Hero.
    <section className="relative z-10 py-24 md:py-32 bg-black text-white rounded-t-[5rem] -mt-20">
      {/* Para que el "scoop" funcione, la sección anterior (Hero) 
        necesita tener un padding-bottom generoso, lo cual ya tiene (md:pb-32).
      */}
      <Container>
        {/* Título de la sección */}
        <div className="mb-16 md:mb-24">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium">
            <span className="italic">Hemos trabajado</span> con
          </h2>
        </div>
        
        {/* Cuadrícula de Logos */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-12 items-center">
          {logoData.map((logo) => (
            <LogoItem 
              key={logo.alt}
              alt={logo.alt}
              imgWhite={logo.white}
              imgColor={logo.color}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};
export function Load() {
 return(
   <>
    <p className="mb-4 animate-pulse">
  <span
    className="inline-block min-h-[1em] w-full flex-auto cursor-wait bg-current align-middle text-base text-neutral-700 opacity-50 dark:text-neutral-50"></span>
    </p>
    <p
      className="mb-4 animate-[placeholder-wave_2s_linear_infinite] [mask-size:200%_100%]"
      style={{
       WebkitMaskImage: 'linear-gradient(130deg, #000 55%, rgba(0, 0, 0, 0.8) 75%, #000 95%)',
       maskImage: 'linear-gradient(130deg, #000 55%, rgba(0, 0, 0, 0.8) 75%, #000 95%)',
      }}>
  <span
    className="inline-block min-h-[1em] w-full flex-auto cursor-wait bg-current align-middle text-base text-neutral-700 opacity-50 dark:text-neutral-50"></span>
    </p>
   </>
 )
}

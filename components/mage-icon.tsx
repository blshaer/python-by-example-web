import { cn } from "@/lib/utils";

const mage = {
  search:
    '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.783 18.828a8.05 8.05 0 0 0 7.439-4.955a8.03 8.03 0 0 0-1.737-8.765a8.045 8.045 0 0 0-13.735 5.68c0 2.131.846 4.174 2.352 5.681a8.05 8.05 0 0 0 5.68 2.359m5.706-2.337l4.762 4.759"/>',
  multiply:
    '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 5L5 19m14 0L5 5"/>',
  "dash-menu":
    '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1.5" d="M4.5 12h15m-15 5.77h15M4.5 6.23h15"/>',
  book: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.75 16.401a1.15 1.15 0 0 0 1.16 1.15a16.7 16.7 0 0 1 3.535.333c1.64.204 3.204.81 4.555 1.761V6.442A10.24 10.24 0 0 0 7.445 4.68a16.6 16.6 0 0 0-3.6-.322a1.15 1.15 0 0 0-1.074 1.15zm18.5 0a1.15 1.15 0 0 1-1.16 1.15a16.7 16.7 0 0 0-3.535.333c-1.64.204-3.204.81-4.555 1.761V6.442a10.24 10.24 0 0 1 4.555-1.762a16.6 16.6 0 0 1 3.6-.322a1.15 1.15 0 0 1 1.073 1.15z"/>',
  folder:
    '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21.25 9.883v7.698a3.083 3.083 0 0 1-3.083 3.083H5.833a3.083 3.083 0 0 1-3.083-3.083V6.419a3.083 3.083 0 0 1 3.083-3.083h3.084a3.08 3.08 0 0 1 2.57 1.377l.873 1.326a1.75 1.75 0 0 0 1.449.77h4.358a3.084 3.084 0 0 1 3.083 3.074"/>',
  github:
    '<path fill="currentColor" d="M11.963 2.382C.554 2.621-1.82 17.93 8.852 21.602c.498.093.684-.219.684-.478v-1.68c-2.79.601-3.38-1.317-3.38-1.317a2.6 2.6 0 0 0-1.121-1.442c-.902-.612.072-.602.072-.602a2.07 2.07 0 0 1 1.536 1.038a2.167 2.167 0 0 0 2.924.819c.052-.5.275-.965.633-1.317c-2.23-.25-4.564-1.1-4.564-4.875a3.76 3.76 0 0 1 1.038-2.645a3.46 3.46 0 0 1 .103-2.634s.84-.26 2.76 1.037a9.6 9.6 0 0 1 5.02 0c1.908-1.276 2.748-1.038 2.748-1.038c.365.828.398 1.763.093 2.614a3.75 3.75 0 0 1 1.037 2.645c0 3.786-2.344 4.626-4.574 4.865c1.038.55.602 4.086.664 4.522c0 .259.176.57.695.477c10.642-3.64 8.152-18.97-3.257-19.209"/>',
  dollar:
    '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M12 21.5a9.5 9.5 0 1 0 0-19a9.5 9.5 0 0 0 0 19"/><path d="M9 14.433a2.82 2.82 0 0 0 3 2.57c2.42 0 3-1.39 3-2.57s-1-2.43-3-2.43s-3-.79-3-2.4a2.75 2.75 0 0 1 3-2.6a2.89 2.89 0 0 1 3 2.6M12 18.5v-1.3m0-11.7v1.499"/></g>',
  goals:
    '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M10.66 10.66A1.9 1.9 0 0 0 10.1 12a1.9 1.9 0 0 0 1.9 1.9a1.9 1.9 0 0 0 1.34-.56"/><path d="M12 6.3a5.7 5.7 0 1 0 5.7 5.7"/><path d="M12 2.5a9.5 9.5 0 1 0 9.5 9.5m-5.975-3.524L12.95 11.05"/><path d="M20.94 5.844L17.7 6.3l.456-3.24a.19.19 0 0 0-.313-.161l-2.148 2.137a1.9 1.9 0 0 0-.513 1.72l.342 1.72l1.72.341a1.9 1.9 0 0 0 1.72-.513L21.1 6.157a.19.19 0 0 0-.162-.313"/></g>',
  "water-drop":
    '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M20 13.277c0-4.525-4.59-8.481-6.81-10.136a2 2 0 0 0-2.38 0C8.59 4.796 4 8.752 4 13.277c0 5.98 5 7.973 8 7.973s8-1.993 8-7.973"/><path d="M7 13.277c0 1.322.527 2.59 1.464 3.524A5 5 0 0 0 12 18.26"/></g>',
  sun: '<g fill="none"><g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" clip-path="url(#mage-sun-clip)"><path d="M12 17.885a5.885 5.885 0 1 0 0-11.77a5.885 5.885 0 0 0 0 11.77m-9.281-5.879H1.5m21 0h-1.207m-9.287-9.287V1.5m0 21v-1.207M5.435 5.435l-.859-.859m14.848 14.848l-.86-.86m.001-13.129l.858-.859M4.576 19.424l.86-.86"/></g><defs><clipPath id="mage-sun-clip"><path fill="#fff" d="M0 0h24v24H0z"/></clipPath></defs></g>',
  moon: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21.182 14.86A9.474 9.474 0 1 1 9.139 2.819a1.053 1.053 0 0 1 1.38 1.295a7.7 7.7 0 0 0-.085 4.642a7 7 0 0 0 4.81 4.811c1.52.45 3.14.42 4.643-.084a1.053 1.053 0 0 1 1.295 1.379"/>',
  copy: '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M8 8.5V6.75A1.75 1.75 0 0 1 9.75 5h7.5A1.75 1.75 0 0 1 19 6.75v7.5A1.75 1.75 0 0 1 17.25 16H15.5"/><rect width="11" height="11" x="4" y="8" rx="1.75"/></g>',
  check:
    '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 12.5 9.5 17 19 7.5"/>',
} as const;

export type MageIconName = keyof typeof mage;

export function MageIcon({
  name,
  className,
}: {
  name: MageIconName;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={cn("h-4 w-4 shrink-0", className)}
      aria-hidden
      dangerouslySetInnerHTML={{ __html: mage[name] }}
    />
  );
}

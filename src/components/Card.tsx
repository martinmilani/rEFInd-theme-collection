import ColorSwatchIcon from "@icons/ColorSwatchIcon.tsx";
import GitHubIcon from "@src/icons/GitHubIcon.tsx";
import ImageCarousel from "./ImageCarousel";
import ImagePlaceholder from "./ImagePlaceholder.tsx";

type Props = {
  id: string;
  name: string;
  description: string;
  link: string;
  user: string;
  user_url: string;
  images: string[];
  multipleThemes: boolean;
  isNew?: boolean;
};

export default function Card({
  name,
  description,
  link,
  user,
  user_url,
  images,
  multipleThemes,
  isNew
}: Props) {
  return (
    <div className="w-full">
      <div className="relative">
        <div className="aspect-video h-auto overflow-hidden rounded-lg transition duration-200 ease-in-out hover:scale-105">
          {images.length === 0 ? (
            <ImagePlaceholder />
          ) : (
            <a href={link} target="_blank">
              <ImageCarousel images={images} alt={name} />
            </a>
          )}
        </div>

        <div className="px-1 py-4">
          <div className="flex w-full flex-row items-center justify-between gap-x-2">
            <div className="flex flex-row items-center gap-x-1">
              <a href={link} target="_blank" className="font-medium">
                {name}
              </a>
              {multipleThemes && (
                <div className="group relative inline-block">
                  <ColorSwatchIcon className="size-4 hover:text-dracula-400" />
                  <div className="absolute -left-[51px] bottom-6 z-10 hidden w-[120px] justify-center rounded bg-aro/95 p-2 text-center text-xs text-white shadow-lg transition group-hover:flex">
                    Multiple Themes
                    <svg
                      className="absolute -bottom-2 left-0 h-2 w-full text-aro/95"
                      viewBox="0 0 255 255"
                    >
                      <polygon
                        className="fill-current"
                        points="0,0 127.5,127.5 255,0"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>
            {isNew && (
              <span className="me-2 cursor-default rounded-full bg-dracula-400 px-2.5 py-0.5 text-xs font-medium text-white">
                New!
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <p className="mt-2 line-clamp-1 font-sans text-sm font-normal text-gray-900/80 dark:text-white/90">
              {description}
            </p>
            <a
              href={user_url}
              target="_blank"
              className="mt-2 flex items-center gap-x-1 text-xs font-normal text-gray-900/80 transition hover:text-dracula-400 dark:text-white/80 dark:hover:text-dracula-400"
            >
              <GitHubIcon className="size-4" />
              {user}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

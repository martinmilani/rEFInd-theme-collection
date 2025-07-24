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
  images
}: Props) {
  return (
    <div className="w-full">
      <div className="relative">
        <div className="aspect-video h-auto overflow-hidden rounded-lg transition duration-200 ease-in-out lg:hover:scale-105">
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
            </div>
          </div>

          <div className="flex flex-col">
            <p className="mt-2 line-clamp-1 font-sans text-sm font-normal text-gray-900/70 dark:text-white/70">
              {description}
            </p>
            <a
              href={user_url}
              target="_blank"
              className="mt-2 flex items-center gap-x-1 text-xs font-normal text-gray-900/70 transition hover:text-dracula-400 dark:text-white/70 dark:hover:text-dracula-400"
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

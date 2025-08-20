import GitHubIcon from "@src/icons/GitHubIcon.tsx";
import ImagePlaceholder from "./ImagePlaceholder.tsx";

type Props = {
  id: string;
  name: string;
  description: string;
  link: string;
  user: string;
  user_url: string;
  images: string[];
  recently_added: boolean;
};

export default function Card({ name, description, link, user, user_url, images, recently_added }: Props) {
  return (
    <div className="w-full">
      <div className="relative">
        <div className="aspect-video h-auto overflow-hidden rounded-lg transition duration-200 ease-in-out lg:hover:scale-105">
          {images.length === 0 ? (
            <a href={link} target="_blank" rel="noopener noreferrer">
              <ImagePlaceholder />
            </a>
          ) : (
            <a href={link} target="_blank" rel="noopener noreferrer">
              <img src={images[0]} alt={name} />
            </a>
          )}
        </div>

        <div className="px-1 py-4">
          <div className="flex w-full flex-row items-center justify-between gap-x-2">
            <div className="flex w-full flex-row items-center justify-between gap-x-1">
              <a href={link} target="_blank" className="font-medium" rel="noopener noreferrer">
                {name}
              </a>
              {recently_added && (
                <span className="me-2 cursor-default rounded-full bg-dracula-400 px-2.5 py-0.5 text-xs font-medium text-white">
                  New!
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <p className="mt-2 line-clamp-1 font-sans text-sm font-normal text-gray-900/70 dark:text-white/70">
              {description || "No description available"}
            </p>
            <a
              href={user_url}
              target="_blank"
              rel="noopener noreferrer"
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

export const SITE_URL = "https://refind-themes-collection.netlify.app";

const publisher = {
  "@type": "Person",
  name: "Martin Milani",
  url: "https://github.com/martinmilani"
};

export function homeStructuredData(themeCount: number) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "rEFInd Themes Collection",
        description: `Curated collection of ${themeCount} clean, minimalist, and dark themes for the rEFInd UEFI boot manager. Image previews for all themes, screenshots, and direct download links.`,
        publisher
      },
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: "rEFInd Themes Gallery",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        description:
          "Browse minimalist, dark, and colorful themes for rEFInd, the UEFI boot manager. Image previews for all themes and direct download links to customize your boot screen."
      },
      {
        "@type": "HowTo",
        "@id": `${SITE_URL}/#howto`,
        name: "How to Install a rEFInd Theme",
        description:
          "Step-by-step instructions to download and apply a custom theme for the rEFInd UEFI boot manager.",
        step: [
          {
            "@type": "HowToStep",
            name: "Locate the Themes Directory",
            text: "Find or create the 'themes' directory within your rEFInd installation directory (typically /boot/efi/EFI/refind/themes/)."
          },
          {
            "@type": "HowToStep",
            name: "Download the Theme",
            text: "Clone the chosen theme repository or extract its files directly into the 'themes' directory."
          },
          {
            "@type": "HowToStep",
            name: "Modify refind.conf",
            text: "Open refind.conf in a text editor with admin rights and append 'include themes/theme-folder-name/theme.conf' at the end."
          },
          {
            "@type": "HowToStep",
            name: "Reboot",
            text: "Save the configuration file and reboot your computer to see the newly applied theme."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What is rEFInd?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "rEFInd is an advanced, open-source UEFI boot manager maintained by Rod Smith. It is designed to manage multi-boot environments (such as Linux, macOS, and Windows) with a clean graphical user interface."
            }
          },
          {
            "@type": "Question",
            name: "Where is the refind.conf configuration file located?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The path to refind.conf varies: /boot/efi/EFI/refind/refind.conf on Linux, /Volumes/ESP/EFI/refind/refind.conf on macOS (after mounting the ESP), or S:\\EFI\\refind\\refind.conf on Windows after mounting ESP to drive S:."
            }
          },
          {
            "@type": "Question",
            name: "How do I install a rEFInd theme?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "To install a rEFInd theme: 1. Locate/create /boot/efi/EFI/refind/themes/. 2. Clone/download the theme files into that directory. 3. Edit /boot/efi/EFI/refind/refind.conf and append 'include themes/theme-folder-name/theme.conf' at the bottom."
            }
          },
          {
            "@type": "Question",
            name: "Can I customize OS icons and backgrounds in rEFInd themes?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. rEFInd themes define custom graphics for OS selection icons, tool icons, and backgrounds. You can manually replace individual PNG assets in the theme folder."
            }
          }
        ]
      }
    ]
  };
}

export interface ImageApiResponse {
  id: number;
  image: string;
  title: string;
  description: string;
  tags: string[];
}

export interface GalleryItem {
  id: number;
  src: string;
  srcPreview?: string;
  alt: string;
  title: string;
  description: string;
  tags: string[];
  loading?: "auto" | "eager" | "lazy";
}

function addPreviewToFilename(url: string) {
  const lastDotIndex = url.lastIndexOf('.');
  if (lastDotIndex === -1) return url; // No extension found

  const beforeExt = url.slice(0, lastDotIndex);
  const ext = url.slice(lastDotIndex);

  return beforeExt + '-preview' + ext;
}

export const ImgResponseToGalleryItem = (
  response: ImageApiResponse[],
  loading: "auto" | "eager" | "lazy" = "lazy"
): GalleryItem[] => {
  const galleryItems: GalleryItem[] = [];

  for (const imageData of response) {
    const galleryItem: GalleryItem = {
      id: imageData.id,
      src: imageData.image,
      srcPreview: addPreviewToFilename(imageData.image),
      alt: imageData.title,
      title: imageData.title,
      description: imageData.description,
      tags: imageData.tags.slice(0),
      loading,
    };

    galleryItems.push(galleryItem);
  }

  return galleryItems;
};

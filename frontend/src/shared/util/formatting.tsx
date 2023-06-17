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
  alt: string;
  title: string;
  description: string;
  tags: string[];
  loading?: "auto" | "eager" | "lazy";
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
      alt: imageData.title,
      title: imageData.title,
      description: imageData.description,
      tags: imageData.tags.slice(0, -1),
      loading,
    };

    galleryItems.push(galleryItem);
  }

  return galleryItems;
};

import { STORAGE_KEYS } from "../lib/storageKeys";
import { useLocalStorage } from "./useLocalStorage";

export interface Photo {
  id: string;
  url: string;
  caption: string;
  date: string;
  createdAt: string;
}

export interface NewPhoto {
  file: File;
  caption: string;
}

const initialPhotos: Photo[] = [];

function createPhotoId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getTodayDate() {
  return new Intl.DateTimeFormat("en-CA").format(new Date());
}

function readImageFile(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

async function createCompressedImageUrl(file: File) {
  const dataUrl = await readImageFile(file);
  const image = await loadImage(dataUrl);
  const maxSize = 1200;
  const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
  const width = Math.round(image.width * scale);
  const height = Math.round(image.height * scale);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    return dataUrl;
  }

  canvas.width = width;
  canvas.height = height;
  context.drawImage(image, 0, 0, width, height);

  return canvas.toDataURL("image/jpeg", 0.82);
}

export function usePhotos() {
  const [photos, setPhotos] = useLocalStorage<Photo[]>(STORAGE_KEYS.photos, initialPhotos);

  const addPhoto = async ({ file, caption }: NewPhoto) => {
    if (!file.type.startsWith("image/")) {
      return false;
    }

    const trimmedCaption = caption.trim() || "新的回忆";
    const url = await createCompressedImageUrl(file);

    setPhotos((currentPhotos) => [
      {
        id: createPhotoId(),
        url,
        caption: trimmedCaption,
        date: getTodayDate(),
        createdAt: new Date().toISOString(),
      },
      ...currentPhotos,
    ]);

    return true;
  };

  const deletePhoto = (id: string) => {
    setPhotos((currentPhotos) => currentPhotos.filter((photo) => photo.id !== id));
  };

  return {
    photos,
    addPhoto,
    deletePhoto,
  };
}

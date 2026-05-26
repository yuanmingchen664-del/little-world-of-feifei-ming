import { useState } from "react";
import { usePhotos } from "../hooks/usePhotos";
import { PixelCamera, PixelHeart, PixelImage, PixelTrash } from "./PixelIcons";

export function PhotosPage() {
  const { photos, addPhoto, deletePhoto } = usePhotos();
  const [isUploading, setIsUploading] = useState(false);
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      return;
    }

    setIsSaving(true);
    const didSave = await addPhoto({ file, caption });
    setIsSaving(false);

    if (didSave) {
      setCaption("");
      setFile(null);
      setIsUploading(false);
      event.currentTarget.reset();
    }
  };

  return (
    <div className="h-full flex flex-col bg-amber-200" style={{ fontFamily: 'Press Start 2P, monospace' }}>
      <header className="flex-shrink-0 p-4 bg-amber-900 border-b-4 border-black">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[10px] flex items-center gap-2 text-amber-100">
              <PixelImage size={16} />
              照片墙
            </h1>
            <p className="text-[7px] text-amber-300 mt-1">珍藏美好回忆</p>
          </div>
          <button
            type="button"
            onClick={() => setIsUploading((current) => !current)}
            className="bg-orange-500 border-4 border-black text-white px-5 py-3 flex items-center gap-2 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all min-h-[52px]"
          >
            <PixelCamera size={16} />
            <span className="text-[10px]">{isUploading ? "收起" : "上传"}</span>
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-auto">
        {isUploading && (
          <form
            onSubmit={handleSubmit}
            className="m-4 bg-white border-4 border-black p-4 space-y-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            <label htmlFor="photo-file" className="block bg-amber-50 border-4 border-black px-3 py-4 text-[8px] text-gray-700 text-center active:translate-y-[1px]">
              {file ? file.name : "选择一张照片"}
            </label>
            <input
              id="photo-file"
              type="file"
              accept="image/*"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
              className="sr-only"
            />

            <label htmlFor="photo-caption" className="sr-only">照片说明</label>
            <input
              id="photo-caption"
              value={caption}
              onChange={(event) => setCaption(event.target.value)}
              placeholder="写一句照片说明"
              className="w-full bg-amber-50 border-4 border-black px-3 py-3 text-[8px] text-gray-800 placeholder:text-gray-400 outline-none focus:bg-white"
            />

            <button
              type="submit"
              disabled={!file || isSaving}
              className="w-full bg-orange-500 border-4 border-black text-white px-5 py-3 flex items-center justify-center gap-2 active:translate-x-[2px] active:translate-y-[2px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all min-h-[48px] disabled:opacity-60 disabled:active:translate-x-0 disabled:active:translate-y-0"
            >
              <PixelCamera size={16} />
              <span className="text-[10px]">{isSaving ? "保存中" : "保存照片"}</span>
            </button>
          </form>
        )}

        {photos.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 p-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="relative aspect-[3/4] border-4 border-black overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
              >
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover"
                  style={{ imageRendering: 'pixelated' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-2 text-white">
                    <p className="text-[7px] mb-1 leading-relaxed line-clamp-2">{photo.caption}</p>
                    <p className="text-[6px] opacity-90">{photo.date}</p>
                  </div>
                </div>
                <div className="absolute top-2 right-2">
                  <PixelHeart size={12} filled className="text-white drop-shadow-lg" />
                </div>
                <button
                  type="button"
                  aria-label={`删除${photo.caption}`}
                  onClick={() => deletePhoto(photo.id)}
                  className="absolute top-2 left-2 bg-red-500 text-white border-4 border-black p-1.5 active:translate-x-[1px] active:translate-y-[1px]"
                >
                  <PixelTrash size={12} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-center text-gray-400 px-4">
            <div className="bg-white border-4 border-black p-6">
              <PixelImage size={32} className="mx-auto mb-3 opacity-40" />
              <p className="text-[8px] leading-relaxed">还没有照片<br/>上传你们的第一张照片吧</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

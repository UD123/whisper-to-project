import { useRef, useState } from "react";
import { Loader2, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { detectKind, STORAGE_BUCKET, STORAGE_PREFIX, useSiteMedia } from "@/lib/site-media";

export function MediaSlotEditor({ slotId }: { slotId: string }) {
  const { raw, refresh } = useSiteMedia();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [link, setLink] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const current = raw[slotId];

  async function save(url: string) {
    const { error } = await supabase
      .from("site_media")
      .upsert({ slot_id: slotId, url, kind: detectKind(url) }, { onConflict: "slot_id" });
    if (error) throw error;
    await refresh();
  }

  async function handleFile(file: File) {
    setBusy(true);
    try {
      const ext = file.name.split(".").pop() ?? "mp4";
      const path = `${slotId}/${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from(STORAGE_BUCKET).upload(path, file, {
        cacheControl: "3600",
        upsert: true,
        contentType: file.type,
      });
      if (error) throw error;
      await save(`${STORAGE_PREFIX}${path}`);
      toast.success("Медиа загружено");
      setOpen(false);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Не удалось загрузить файл");
    } finally {
      setBusy(false);
    }
  }

  async function handleLink() {
    if (!link.trim()) return;
    setBusy(true);
    try {
      await save(link.trim());
      toast.success("Ссылка сохранена");
      setLink("");
      setOpen(false);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Не удалось сохранить ссылку");
    } finally {
      setBusy(false);
    }
  }

  async function handleClear() {
    setBusy(true);
    try {
      const { error } = await supabase.from("site_media").delete().eq("slot_id", slotId);
      if (error) throw error;
      await refresh();
      toast.success("Слот очищен");
      setOpen(false);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Не удалось очистить слот");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="absolute top-2 right-2 z-20 flex items-center gap-1.5 rounded-md border border-background/25 bg-foreground/85 px-2.5 py-1.5 text-background shadow-lg backdrop-blur transition hover:bg-foreground"
        >
          <Upload className="h-3 w-3" strokeWidth={2} />
          <span className="mono-label">видео / фото</span>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-mono text-sm tracking-tight">{slotId}</DialogTitle>
          <DialogDescription>
            Загрузите видео (MP4/WebM) или изображение, либо вставьте прямую ссылку / YouTube URL.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div>
            <input
              ref={fileRef}
              type="file"
              accept="video/mp4,video/webm,video/quicktime,image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) void handleFile(f);
                e.target.value = "";
              }}
            />
            <Button
              type="button"
              className="w-full"
              disabled={busy}
              onClick={() => fileRef.current?.click()}
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
              Выбрать файл (до 100 МБ)
            </Button>
          </div>

          <div className="flex gap-2">
            <Input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://…/video.mp4 или YouTube URL"
              className="font-mono text-xs"
            />
            <Button type="button" variant="secondary" disabled={busy} onClick={() => void handleLink()}>
              Сохранить
            </Button>
          </div>

          {current ? (
            <div className="flex items-center justify-between rounded-md border border-border px-3 py-2">
              <span className="truncate font-mono text-[11px] text-muted-foreground">
                {current.url}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={busy}
                onClick={() => void handleClear()}
              >
                <Trash2 className="h-4 w-4" />
                Очистить
              </Button>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}

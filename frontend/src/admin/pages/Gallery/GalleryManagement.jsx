import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Edit3, Image, Loader2, Plus, Trash2, Upload, Video } from "lucide-react";
import api from "../../../services/api";
import { galleryService } from "../../../services/contentService";
import Modal from "../../components/Modal";
import Loading from "../../components/Loading";
import StatusBadge from "../../components/StatusBadge";
import { Field, inputClass, selectClass, textareaClass } from "../../components/form.jsx";
import compressImageForUpload from "../../../utils/compressImageForUpload.js";
import displayImageUrl from "../../../utils/displayImageUrl.js";

const categories = ["Aviation", "Operations", "Distribution", "Marine", "Agrochemicals", "Future energy", "Heritage", "General"];
const emptyForm = { title: "", description: "", category: "General", type: "image", src: "", poster: "", alt: "", sortOrder: 0, status: "published" };

const GalleryManagement = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [uploading, setUploading] = useState("");
  const sourceInput = useRef(null);
  const posterInput = useRef(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await galleryService.getAll({ limit: 200 });
      setItems(response.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load gallery");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (item) => {
    setEditing(item);
    setForm({
      title: item.title || "", description: item.description || "", category: item.category || "General",
      type: item.type || "image", src: item.src || "", poster: item.poster || "", alt: item.alt || "",
      sortOrder: item.sortOrder ?? 0, status: item.status || "published",
    });
    setShowModal(true);
  };
  const set = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

  const uploadImage = async (event, field) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(field);
    try {
      const readyFile = await compressImageForUpload(file);
      const body = new FormData();
      body.append("image", readyFile);
      const response = await api.post("/upload/image", body);
      const origin = (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api").replace(/\/+$/, "").replace(/\/api$/, "");
      const url = response.data.data.url;
      setForm((current) => ({ ...current, [field]: url.startsWith("http") ? url : `${origin}${url}` }));
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Image upload failed");
    } finally {
      setUploading("");
      event.target.value = "";
    }
  };

  const save = async (event) => {
    event.preventDefault();
    if (!form.src.trim()) return toast.error(form.type === "video" ? "Add a video embed URL" : "Add or upload an image");
    setSaving(true);
    try {
      const payload = { ...form, sortOrder: Number(form.sortOrder) || 0 };
      if (editing) await galleryService.update(editing._id, payload);
      else await galleryService.create(payload);
      toast.success(editing ? "Gallery item updated" : "Gallery item created");
      setShowModal(false);
      load();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save gallery item");
    } finally { setSaving(false); }
  };

  const remove = async () => {
    try {
      await galleryService.remove(deleting._id);
      toast.success("Gallery item deleted");
      setDeleting(null);
      load();
    } catch (error) { toast.error(error.response?.data?.message || "Failed to delete item"); }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div><h1 className="text-xl font-extrabold text-[#092f3b] font-['Manrope']">Gallery Management</h1><p className="text-sm text-[#66767d] mt-1">Manage public gallery photos, videos, categories and display order.</p></div>
        <button onClick={openCreate} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#dc2626] hover:bg-[#b91c1c] text-white text-sm font-semibold"><Plus className="w-4 h-4" /> Add media</button>
      </div>

      {loading ? <Loading /> : items.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-slate-300 rounded-xl bg-white"><Image className="w-10 h-10 mx-auto text-slate-300 mb-3" /><h2 className="font-bold text-[#092f3b]">No gallery media yet</h2><p className="text-sm text-slate-500 mt-1">Add the first photo or video to publish it on the Gallery page.</p></div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {items.map((item) => <article key={item._id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="relative aspect-[16/10] bg-slate-100">
              {(item.poster || item.type === "image") ? <img src={displayImageUrl(item.poster || item.src)} alt="" className="w-full h-full object-cover" /> : <div className="grid h-full place-items-center"><Video className="w-10 h-10 text-slate-300" /></div>}
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/80 text-white text-[10px] font-bold uppercase">{item.type}</span>
              <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 text-[#092f3b] text-[10px] font-bold">#{item.sortOrder}</span>
            </div>
            <div className="p-4"><div className="flex items-start justify-between gap-3"><div><p className="text-[10px] font-extrabold tracking-wider uppercase text-red-600">{item.category}</p><h3 className="font-bold text-[#092f3b] mt-1">{item.title}</h3></div><StatusBadge status={item.status} /></div>
              <p className="text-xs text-slate-500 line-clamp-2 mt-2 min-h-8">{item.description || "No description"}</p>
              <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-slate-100"><button onClick={() => openEdit(item)} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100" aria-label={`Edit ${item.title}`}><Edit3 className="w-4 h-4" /></button><button onClick={() => setDeleting(item)} className="p-2 rounded-lg text-red-600 hover:bg-red-50" aria-label={`Delete ${item.title}`}><Trash2 className="w-4 h-4" /></button></div>
            </div>
          </article>)}
        </div>
      )}

      <Modal open={showModal} onClose={() => setShowModal(false)} title={editing ? "Edit gallery media" : "Add gallery media"} size="lg">
        <form onSubmit={save} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4"><Field label="Title" required><input className={inputClass} value={form.title} onChange={set("title")} required /></Field><Field label="Category" required><input className={inputClass} list="gallery-categories" value={form.category} onChange={set("category")} required /><datalist id="gallery-categories">{categories.map((category) => <option value={category} key={category} />)}</datalist></Field></div>
          <div className="grid sm:grid-cols-3 gap-4"><Field label="Media type"><select className={selectClass} value={form.type} onChange={set("type")}><option value="image">Image</option><option value="video">Video</option></select></Field><Field label="Status"><select className={selectClass} value={form.status} onChange={set("status")}><option value="published">Published</option><option value="draft">Draft</option><option value="archived">Archived</option></select></Field><Field label="Display order"><input className={inputClass} type="number" min="0" value={form.sortOrder} onChange={set("sortOrder")} /></Field></div>
          <Field label={form.type === "video" ? "Video embed URL" : "Image URL"} required hint={form.type === "video" ? "Use an embeddable YouTube or other HTTPS player URL." : "Upload an image or enter its URL."}><div className="flex gap-2"><input className={inputClass} type="url" value={form.src} onChange={set("src")} required />{form.type === "image" && <><input ref={sourceInput} className="hidden" type="file" accept="image/*" onChange={(event) => uploadImage(event, "src")} /><button type="button" onClick={() => sourceInput.current?.click()} disabled={!!uploading} className="px-4 rounded-lg border border-slate-300 text-sm font-semibold text-[#092f3b]">{uploading === "src" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}</button></>}</div></Field>
          {form.type === "video" && <Field label="Video poster image" hint="Shown on the gallery card before the video opens."><div className="flex gap-2"><input className={inputClass} type="url" value={form.poster} onChange={set("poster")} /><input ref={posterInput} className="hidden" type="file" accept="image/*" onChange={(event) => uploadImage(event, "poster")} /><button type="button" onClick={() => posterInput.current?.click()} disabled={!!uploading} className="px-4 rounded-lg border border-slate-300"><Upload className="w-4 h-4" /></button></div></Field>}
          {form.src && (form.type === "image" || form.poster) && <img src={displayImageUrl(form.type === "image" ? form.src : form.poster)} alt="Preview" className="w-full h-52 rounded-lg object-cover bg-slate-100" />}
          <Field label="Accessible image description" hint="Describe the image for visitors using screen readers."><input className={inputClass} value={form.alt} onChange={set("alt")} /></Field>
          <Field label="Description"><textarea className={textareaClass} value={form.description} onChange={set("description")} /></Field>
          <div className="flex justify-end gap-3 pt-2"><button type="button" onClick={() => setShowModal(false)} className="px-4 py-2.5 rounded-lg border border-slate-300 text-sm font-semibold">Cancel</button><button disabled={saving || !!uploading} className="px-5 py-2.5 rounded-lg bg-red-600 text-white text-sm font-semibold disabled:opacity-50">{saving ? "Saving…" : editing ? "Save changes" : "Create item"}</button></div>
        </form>
      </Modal>

      <Modal open={!!deleting} onClose={() => setDeleting(null)} title="Delete gallery item" size="sm"><p className="text-sm text-slate-600">Delete <strong>{deleting?.title}</strong>? This cannot be undone.</p><div className="flex justify-end gap-3 mt-6"><button onClick={() => setDeleting(null)} className="px-4 py-2 rounded-lg border border-slate-300 text-sm font-semibold">Cancel</button><button onClick={remove} className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold">Delete</button></div></Modal>
    </div>
  );
};

export default GalleryManagement;

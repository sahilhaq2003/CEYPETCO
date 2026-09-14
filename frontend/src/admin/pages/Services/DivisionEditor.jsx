import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  Save,
  Upload,
  Loader2,
  Plus,
  Trash2,
  ExternalLink,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import api from "../../../services/api";
import { divisionService } from "../../../services/contentService";
import { Field, inputClass, textareaClass, selectClass } from "../../components/form.jsx";
import Loading from "../../components/Loading";

const emptyForm = {
  title: "",
  subtitle: "",
  slug: "",
  order: 0,
  status: "published",
  kicker: "",
  heading: "",
  copy: "",
  image: "",
  stats: [{ value: "", label: "" }],
  features: "",
  detailTitle: "",
  detailRows: [{ name: "", value: "", unit: "" }],
  paragraphs: "",
  keyFacts: "",
  gallery: "",
};

const listToText = (list) => (Array.isArray(list) ? list.join("\n") : "");

const DivisionEditor = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [advanced, setAdvanced] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await divisionService.getBySlug(slug);
      const item = res.data;
      setForm({
        title: item.title || "",
        subtitle: item.subtitle || "",
        slug: item.slug || slug,
        order: item.order ?? 0,
        status: item.status || "published",
        kicker: item.kicker || "",
        heading: item.heading || "",
        copy: listToText(item.copy),
        image: item.image || "",
        stats:
          item.stats && item.stats.length
            ? item.stats.map((s) => ({ value: s.value || "", label: s.label || "" }))
            : [{ value: "", label: "" }],
        features: listToText(item.features),
        detailTitle: item.detailTitle || "",
        detailRows:
          item.detailRows && item.detailRows.length
            ? item.detailRows.map((d) => ({
                name: d.name || "",
                value: d.value || "",
                unit: d.unit || "",
              }))
            : [{ name: "", value: "", unit: "" }],
        paragraphs: listToText(item.paragraphs),
        keyFacts: listToText(item.keyFacts),
        gallery: listToText(item.gallery),
      });
      setAdvanced(
        JSON.stringify(
          {
            locations: item.locations || [],
            certs: item.certs || [],
            productGroups: item.productGroups || [],
            standards: item.standards || [],
            mission: item.mission || null,
            vision: item.vision || null,
          },
          null,
          2
        )
      );
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load division page");
      navigate("/admin/services-page/divisions");
    } finally {
      setLoading(false);
    }
  }, [slug, navigate]);

  useEffect(() => {
    load();
  }, [load]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const setStat = (index, key) => (e) =>
    setForm((f) => {
      const stats = f.stats.map((s, i) => (i === index ? { ...s, [key]: e.target.value } : s));
      return { ...f, stats };
    });

  const addStatRow = () =>
    setForm((f) => ({ ...f, stats: [...f.stats, { value: "", label: "" }] }));

  const removeStatRow = (index) =>
    setForm((f) => ({ ...f, stats: f.stats.filter((_, i) => i !== index) }));

  const setDetailRow = (index, key) => (e) =>
    setForm((f) => {
      const detailRows = f.detailRows.map((d, i) =>
        i === index ? { ...d, [key]: e.target.value } : d
      );
      return { ...f, detailRows };
    });

  const addDetailRow = () =>
    setForm((f) => ({
      ...f,
      detailRows: [...f.detailRows, { name: "", value: "", unit: "" }],
    }));

  const removeDetailRow = (index) =>
    setForm((f) => ({
      ...f,
      detailRows: f.detailRows.filter((_, i) => i !== index),
    }));

  const handleUpload = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("image", file);
      const res = await api.post("/upload/image", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const origin = (import.meta.env.VITE_API_BASE_URL || "")
        .replace(/\/+$/, "")
        .replace(/\/api$/, "");
      const fullUrl =
        res.data.data.url && res.data.data.url.startsWith("http")
          ? res.data.data.url
          : `${origin}${res.data.data.url}`;
      setForm((f) => ({ ...f, image: fullUrl }));
      toast.success("Image uploaded successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to upload image");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let parsed;
    try {
      parsed = JSON.parse(advanced || "{}");
    } catch (err) {
      toast.error("Advanced JSON is invalid. Please fix it before saving.");
      return;
    }
    setSaving(true);
    try {
      const current = await divisionService.getBySlug(slug);
      const payload = {
        ...form,
        order: Number(form.order) || 0,
        copy: (form.copy || "").split("\n").map((s) => s.trim()).filter(Boolean),
        stats: form.stats.filter((s) => s.value || s.label),
        features: (form.features || "").split("\n").map((s) => s.trim()).filter(Boolean),
        detailRows: form.detailRows.filter((d) => d.name),
        paragraphs: (form.paragraphs || "").split("\n").map((s) => s.trim()).filter(Boolean),
        keyFacts: (form.keyFacts || "").split("\n").map((s) => s.trim()).filter(Boolean),
        gallery: (form.gallery || "").split("\n").map((s) => s.trim()).filter(Boolean),
        locations: parsed.locations || [],
        certs: parsed.certs || [],
        productGroups: parsed.productGroups || [],
        standards: parsed.standards || [],
        mission: parsed.mission || null,
        vision: parsed.vision || null,
      };
      await divisionService.update(current.data._id, payload);
      toast.success("Division page updated successfully");
      navigate("/admin/services-page/divisions");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save division page");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loading label="Loading division page..." />;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-extrabold text-[#092f3b] font-['Manrope']">
            {form.title || "Division Page"}
          </h1>
          <p className="text-sm text-[#66767d] mt-1">
            {form.subtitle || form.slug}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={`/${slug}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-[#092f3b] hover:bg-slate-50 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View page
          </a>
          <Link
            to="/admin/services-page/divisions"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-[#092f3b] hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#dc2626] hover:bg-[#b91c1c] text-white text-sm font-semibold transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-sm font-extrabold uppercase tracking-[0.08em] text-[#092f3b] mb-4 font-['Manrope']">
            General
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Field label="Title">
              <input className={inputClass} value={form.title} onChange={set("title")} />
            </Field>
            <Field label="Subtitle">
              <input className={inputClass} value={form.subtitle} onChange={set("subtitle")} />
            </Field>
            <Field label="Order">
              <input
                type="number"
                min="0"
                className={inputClass}
                value={form.order}
                onChange={set("order")}
              />
            </Field>
            <Field label="Status">
              <select className={selectClass} value={form.status} onChange={set("status")}>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </Field>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-sm font-extrabold uppercase tracking-[0.08em] text-[#092f3b] mb-4 font-['Manrope']">
            Intro Section
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Kicker / Eyebrow">
                <input className={inputClass} value={form.kicker} onChange={set("kicker")} placeholder="REFINERY OPERATIONS" />
              </Field>
              <Field label="Image" hint="Upload an image or provide a URL">
                <div className="flex items-stretch gap-2">
                  <input className={inputClass} value={form.image} onChange={set("image")} placeholder="https://example.com/image.jpg" />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-semibold text-[#092f3b] hover:bg-slate-50 transition-colors disabled:opacity-50 shrink-0"
                  >
                    {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    {uploading ? "Uploading..." : "Upload"}
                  </button>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
                </div>
              </Field>
            </div>
            <Field label="Heading (H2)">
              <textarea className={`${textareaClass} min-h-[70px]`} value={form.heading} onChange={set("heading")} />
            </Field>
            <Field label="Intro paragraphs" hint="One paragraph per line">
              <textarea className={`${textareaClass} min-h-[110px]`} value={form.copy} onChange={set("copy")} />
            </Field>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-sm font-extrabold uppercase tracking-[0.08em] text-[#092f3b] mb-4 font-['Manrope']">
            Statistics
          </h2>
          <div className="space-y-3">
            {form.stats.map((stat, index) => (
              <div key={index} className="grid grid-cols-[1fr_1fr_auto] gap-3 items-center">
                <input
                  className={inputClass}
                  placeholder="Value · e.g. 1969"
                  value={stat.value}
                  onChange={setStat(index, "value")}
                />
                <input
                  className={inputClass}
                  placeholder="Label"
                  value={stat.label}
                  onChange={setStat(index, "label")}
                />
                <button
                  type="button"
                  onClick={() => removeStatRow(index)}
                  className="p-2.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addStatRow}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed border-slate-300 text-sm font-semibold text-[#66767d] hover:text-[#092f3b] hover:border-slate-400 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add statistic
            </button>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-sm font-extrabold uppercase tracking-[0.08em] text-[#092f3b] mb-4 font-['Manrope']">
            Body Content
          </h2>
          <div className="space-y-4">
            <Field label="Features" hint="One item per line">
              <textarea className={`${textareaClass} min-h-[100px]`} value={form.features} onChange={set("features")} placeholder={"Export-oriented refining\nQuality-control systems"} />
            </Field>
            <Field label="Narrative paragraphs" hint="One paragraph per line">
              <textarea className={`${textareaClass} min-h-[140px]`} value={form.paragraphs} onChange={set("paragraphs")} />
            </Field>
            <Field label="Key facts" hint="One item per line">
              <textarea className={`${textareaClass} min-h-[90px]`} value={form.keyFacts} onChange={set("keyFacts")} />
            </Field>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-sm font-extrabold uppercase tracking-[0.08em] text-[#092f3b] mb-4 font-['Manrope']">
            At-a-glance Table
          </h2>
          <div className="flex items-center gap-3 mb-4">
            <Field label="Table title">
              <input className={inputClass} value={form.detailTitle} onChange={set("detailTitle")} placeholder="Installed production capacity" />
            </Field>
          </div>
          <div className="space-y-3">
            {form.detailRows.map((row, index) => (
              <div key={index} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-3 items-center">
                <input className={inputClass} placeholder="Name" value={row.name} onChange={setDetailRow(index, "name")} />
                <input className={inputClass} placeholder="Value" value={row.value} onChange={setDetailRow(index, "value")} />
                <input className={inputClass} placeholder="Unit · e.g. MT/day" value={row.unit} onChange={setDetailRow(index, "unit")} />
                <button
                  type="button"
                  onClick={() => removeDetailRow(index)}
                  className="p-2.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addDetailRow}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed border-slate-300 text-sm font-semibold text-[#66767d] hover:text-[#092f3b] hover:border-slate-400 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add row
            </button>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <Field label="Gallery images" hint="One image URL per line">
            <textarea className={`${textareaClass} min-h-[90px]`} value={form.gallery} onChange={set("gallery")} placeholder={"https://example.com/photo-1.jpg\nhttps://example.com/photo-2.jpg"} />
          </Field>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <button
            type="button"
            onClick={() => setShowAdvanced((open) => !open)}
            className="w-full flex items-center justify-between px-6 py-4 text-left"
          >
            <div>
              <h2 className="text-sm font-extrabold uppercase tracking-[0.08em] text-[#092f3b] font-['Manrope']">
                Advanced Content
              </h2>
              <p className="text-xs text-[#66767d] mt-0.5">
                Page-specific data (locations, certifications, product groups, standards)
              </p>
            </div>
            {showAdvanced ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
          </button>
          {showAdvanced && (
            <div className="px-6 pb-6">
              <textarea
                className={`${textareaClass} min-h-[260px] font-mono text-xs`}
                value={advanced}
                onChange={(e) => setAdvanced(e.target.value)}
                spellCheck={false}
              />
              <p className="text-xs text-[#66767d] mt-2">
                Enter valid JSON for the keys: locations, certs, productGroups,
                standards, mission, vision.
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3">
          <Link
            to="/admin/services-page/divisions"
            className="px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-[#092f3b] hover:bg-slate-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#dc2626] hover:bg-[#b91c1c] text-white text-sm font-semibold transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DivisionEditor;
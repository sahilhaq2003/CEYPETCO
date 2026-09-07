import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Pencil,
  Link2,
  Globe,
  Building2,
  Smartphone,
  Droplets,
  ShieldCheck,
  Clock,
  Download,
  User,
  Phone,
  Fuel,
  Wrench,
} from "lucide-react";
import { homeServiceService } from "../../../services/contentService";
import StatusBadge from "../../components/StatusBadge";
import Pagination from "../../components/Pagination";
import Modal from "../../components/Modal";
import Loading from "../../components/Loading";
import { Field, inputClass, textareaClass, selectClass } from "../../components/form.jsx";

const iconOptions = [
  { value: "globe", label: "Globe", icon: Globe },
  { value: "building", label: "Building", icon: Building2 },
  { value: "app", label: "Mobile App", icon: Smartphone },
  { value: "droplet", label: "Droplet", icon: Droplets },
  { value: "shield", label: "Shield", icon: ShieldCheck },
  { value: "clock", label: "Clock", icon: Clock },
  { value: "download", label: "Download", icon: Download },
  { value: "user", label: "User", icon: User },
  { value: "phone", label: "Phone", icon: Phone },
  { value: "station", label: "Fuel Station", icon: Fuel },
];

const emptyForm = {
  title: "",
  description: "",
  icon: "globe",
  link: "",
  order: 0,
  status: "published",
};

const HomeServiceManagement = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [showDelete, setShowDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 10 };
      if (search) params.search = search;
      const res = await homeServiceService.getAll(params);
      setItems(res.data);
      setTotal(res.pagination.total);
      setTotalPages(res.pagination.pages);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load home services");
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    load();
  }, [load]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({
      title: item.title || "",
      description: item.description || "",
      icon: item.icon || "globe",
      link: item.link || "",
      order: item.order ?? 0,
      status: item.status || "published",
    });
    setShowModal(true);
  };

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, order: Number(form.order) || 0 };
      if (editing) {
        await homeServiceService.update(editing._id, payload);
        toast.success("Home service updated successfully");
      } else {
        await homeServiceService.create(payload);
        toast.success("Home service created successfully");
      }
      setShowModal(false);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save home service");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await homeServiceService.remove(showDelete._id);
      toast.success("Home service deleted");
      setShowDelete(null);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete home service");
    } finally {
      setDeleting(false);
    }
  };

  const PreviewIcon = ({ name, className }) => {
    const match = iconOptions.find((o) => o.value === name);
    const IconComponent = match ? match.icon : Wrench;
    return <IconComponent className={className} />;
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-extrabold text-[#092f3b] font-['Manrope']">
            Home Page Services
          </h1>
          <p className="text-sm text-[#66767d] mt-1">
            Manage the "Services and resources" section shown on the homepage.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#dc2626] hover:bg-[#b91c1c] text-white text-sm font-semibold transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          New Service
        </button>
      </div>

      <div className="relative mb-4 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSearch(searchInput);
              setPage(1);
            }
          }}
          placeholder="Search services..."
          className="w-full h-11 pl-10 pr-4 bg-white border border-slate-200 rounded-lg text-sm text-[#092f3b] placeholder-slate-400 outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
        />
      </div>

      {loading ? (
        <Loading label="Loading home services..." />
      ) : (
        <>
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-4 py-3 text-[11px] font-bold tracking-[0.08em] uppercase text-[#66767d]">
                    Order
                  </th>
                  <th className="px-4 py-3 text-[11px] font-bold tracking-[0.08em] uppercase text-[#66767d]">
                    Service
                  </th>
                  <th className="px-4 py-3 text-[11px] font-bold tracking-[0.08em] uppercase text-[#66767d] hidden lg:table-cell">
                    Link
                  </th>
                  <th className="px-4 py-3 text-[11px] font-bold tracking-[0.08em] uppercase text-[#66767d]">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right text-[11px] font-bold tracking-[0.08em] uppercase text-[#66767d]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center">
                      <Wrench className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                      <p className="text-sm font-semibold text-[#092f3b]">
                        No home services found
                      </p>
                      <p className="text-xs text-[#66767d] mt-1">
                        {search
                          ? "Try a different search term"
                          : "Create your first service to get started"}
                      </p>
                    </td>
                  </tr>
                ) : (
                  items.map((item) => (
                    <tr key={item._id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-4">
                        <span className="text-xs font-bold text-[#66767d]">
                          {String(item.order ?? 0).padStart(2, "0")}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
                            <PreviewIcon name={item.icon} className="w-4 h-4 text-red-600" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[#092f3b] line-clamp-1 max-w-xs">
                              {item.title}
                            </p>
                            {item.description && (
                              <p className="text-xs text-[#66767d] mt-0.5 line-clamp-1 max-w-xs">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 hidden lg:table-cell">
                        <span className="text-xs text-[#66767d] line-clamp-1 max-w-xs block">
                          {item.link || "—"}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <StatusBadge status={item.status} />
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button
                            onClick={() => openEdit(item)}
                            title="Edit"
                            className="p-2 rounded-lg text-slate-400 hover:text-[#092f3b] hover:bg-slate-100 transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setShowDelete(item)}
                            title="Delete"
                            className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {items.length > 0 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              total={total}
              onPageChange={setPage}
            />
          )}
        </>
      )}

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title={editing ? "Edit Home Service" : "New Home Service"}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Title" required>
            <input
              className={inputClass}
              value={form.title}
              onChange={set("title")}
              placeholder="Service title shown on the homepage card"
              required
            />
          </Field>

          <Field label="Description">
            <textarea
              className={`${textareaClass} min-h-[90px]`}
              value={form.description}
              onChange={set("description")}
              placeholder="Short description shown under the title"
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Icon">
              <select className={selectClass} value={form.icon} onChange={set("icon")}>
                {iconOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Order">
              <input
                type="number"
                min="0"
                className={inputClass}
                value={form.order}
                onChange={set("order")}
                placeholder="Display order"
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Link" required hint="Internal paths or external URLs are supported.">
              <div className="relative">
                <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  className={`${inputClass} pl-9`}
                  value={form.link}
                  onChange={set("link")}
                  placeholder="/regional-offices or https://..."
                  required
                />
              </div>
            </Field>
            <Field label="Status">
              <select className={selectClass} value={form.status} onChange={set("status")}>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </Field>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-semibold text-[#092f3b] hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#dc2626] hover:bg-[#b91c1c] text-white text-sm font-semibold transition-colors disabled:opacity-50"
            >
              <Pencil className="w-4 h-4" />
              {saving ? "Saving..." : editing ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </Modal>

      <Modal open={!!showDelete} onClose={() => setShowDelete(null)} title="Delete Home Service" size="sm">
        <div className="text-center">
          <div className="w-14 h-14 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-7 h-7 text-red-600" />
          </div>
          <p className="text-sm text-[#66767d] mb-2">
            Are you sure you want to delete this service?
          </p>
          <p className="text-sm font-bold text-[#092f3b] mb-6 line-clamp-2">
            {showDelete?.title}
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setShowDelete(null)}
              className="px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-semibold text-[#092f3b] hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4" />
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default HomeServiceManagement;
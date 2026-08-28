import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Users,
} from "lucide-react";
import { managementContactService } from "../../../services/contentService";
import StatusBadge from "../../components/StatusBadge";
import Modal from "../../components/Modal";
import Loading from "../../components/Loading";
import { Field, inputClass, selectClass } from "../../components/form.jsx";

const GROUP_OPTIONS = [
  "Corporate Management",
  "Senior Management · Refinery",
  "Head Office",
  "Operating Divisions",
];

const emptyForm = {
  group: GROUP_OPTIONS[0],
  name: "",
  role: "",
  phone: "",
  email: "",
  order: 0,
  status: "published",
};

const ManagementContactsManagement = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
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
      const params = { limit: 500 };
      if (search) params.search = search;
      const res = await managementContactService.getAll(params);
      const sorted = [...res.data].sort((a, b) => {
        if (a.group === b.group) return a.order - b.order;
        return String(a.group).localeCompare(String(b.group));
      });
      setItems(sorted);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load contacts");
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    load();
  }, [load]);

  const openCreate = () => {
    setEditing(null);
    setForm({ ...emptyForm });
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({
      group: item.group || GROUP_OPTIONS[0],
      name: item.name || "",
      role: item.role || "",
      phone: item.phone || "",
      email: item.email || "",
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
      if (editing) {
        await managementContactService.update(editing._id, form);
        toast.success("Contact updated");
      } else {
        await managementContactService.create(form);
        toast.success("Contact created");
      }
      setShowModal(false);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save contact");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await managementContactService.remove(showDelete._id);
      toast.success("Contact deleted");
      setShowDelete(null);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete contact");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-extrabold text-[#092f3b] font-['Manrope']">
            Management Directory
          </h1>
          <p className="text-sm text-[#66767d] mt-1">
            Manage the "Corporate and operational leadership" directory on the
            About page.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#dc2626] hover:bg-[#b91c1c] text-white text-sm font-semibold transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          New Contact
        </button>
      </div>

      <div className="relative mb-4 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") setSearch(searchInput);
          }}
          placeholder="Search by name, role, group or email..."
          className="w-full h-11 pl-10 pr-4 bg-white border border-slate-200 rounded-lg text-sm text-[#092f3b] placeholder-slate-400 outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
        />
      </div>

      {loading ? (
        <Loading label="Loading contacts..." />
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-3 text-[11px] font-bold tracking-[0.08em] uppercase text-[#66767d]">
                  Group
                </th>
                <th className="px-4 py-3 text-[11px] font-bold tracking-[0.08em] uppercase text-[#66767d]">
                  Name
                </th>
                <th className="px-4 py-3 text-[11px] font-bold tracking-[0.08em] uppercase text-[#66767d] hidden md:table-cell">
                  Role
                </th>
                <th className="px-4 py-3 text-[11px] font-bold tracking-[0.08em] uppercase text-[#66767d] hidden lg:table-cell">
                  Contact
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
                  <td colSpan={6} className="px-4 py-12 text-center">
                    <Users className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-[#092f3b]">
                      No contacts found
                    </p>
                    <p className="text-xs text-[#66767d] mt-1">
                      Create your first directory contact to get started
                    </p>
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-4 py-4">
                      <span className="inline-block px-2.5 py-1 rounded-md bg-slate-100 text-xs font-semibold text-[#092f3b] whitespace-nowrap">
                        {item.group}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm font-bold text-[#092f3b]">
                        {item.name}
                      </p>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <p className="text-sm text-[#66767d]">{item.role}</p>
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <div className="text-xs text-[#66767d] space-y-0.5">
                        {item.phone && <p>{item.phone}</p>}
                        {item.email && <p>{item.email}</p>}
                        {!item.phone && !item.email && <p>—</p>}
                      </div>
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
      )}

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title={editing ? "Edit Contact" : "New Contact"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Group">
            <select className={selectClass} value={form.group} onChange={set("group")}>
              {GROUP_OPTIONS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Name" required>
            <input
              className={inputClass}
              value={form.name}
              onChange={set("name")}
              placeholder="e.g. K G H Kodagoda"
              required
            />
          </Field>

          <Field label="Role">
            <input
              className={inputClass}
              value={form.role}
              onChange={set("role")}
              placeholder="e.g. Refinery Manager"
            />
          </Field>

          <Field label="Phone">
            <input
              className={inputClass}
              value={form.phone}
              onChange={set("phone")}
              placeholder="+94 11 0000000"
            />
          </Field>

          <Field label="Email">
            <input
              type="email"
              className={inputClass}
              value={form.email}
              onChange={set("email")}
              placeholder="name@ceypetco.gov.lk"
            />
          </Field>

          <Field label="Order">
            <input
              type="number"
              className={inputClass}
              value={form.order}
              onChange={set("order")}
            />
          </Field>

          <Field label="Status">
            <select
              className={selectClass}
              value={form.status}
              onChange={set("status")}
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </Field>

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
              {saving ? "Saving..." : editing ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        open={!!showDelete}
        onClose={() => setShowDelete(null)}
        title="Delete Contact"
        size="sm"
      >
        <div className="text-center">
          <div className="w-14 h-14 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-7 h-7 text-red-600" />
          </div>
          <p className="text-sm text-[#66767d] mb-2">
            Are you sure you want to delete this contact?
          </p>
          <p className="text-sm font-bold text-[#092f3b] mb-6">
            {showDelete?.name}
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

export default ManagementContactsManagement;

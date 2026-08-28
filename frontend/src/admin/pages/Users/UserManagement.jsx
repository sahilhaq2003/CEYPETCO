import { useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { Plus, Search, Edit3, Trash2, User as UserIcon, Pencil } from "lucide-react";
import { userService } from "../../../services/contentService";
import { useAuth } from "../../../context/AuthContext";
import StatusBadge from "../../components/StatusBadge";
import Pagination from "../../components/Pagination";
import Modal from "../../components/Modal";
import Loading from "../../components/Loading";
import { Field, inputClass, selectClass } from "../../components/form.jsx";

const emptyForm = {
  name: "",
  email: "",
  password: "",
  role: "admin",
  status: "active",
};

const UserManagement = () => {
  const { user: currentUser } = useAuth();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 10 };
      if (search) params.search = search;
      const res = await userService.getAll(params);
      setItems(res.data);
      setTotal(res.pagination.total);
      setTotalPages(res.pagination.pages);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load users");
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
      name: item.name || "",
      email: item.email || "",
      password: "",
      role: item.role || "admin",
      status: item.status || "active",
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form };
      if (!payload.password) delete payload.password;
      if (editing) {
        await userService.update(editing._id, payload);
        toast.success("User updated successfully");
      } else {
        await userService.create(payload);
        toast.success("User created successfully");
      }
      setShowModal(false);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save user");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await userService.remove(showDelete._id);
      toast.success("User deleted");
      setShowDelete(null);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete user");
    } finally {
      setDeleting(false);
    }
  };

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-extrabold text-[#092f3b] font-['Manrope']">
            User Management
          </h1>
          <p className="text-sm text-[#66767d] mt-1">
            Manage admin users, roles and account access.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#dc2626] hover:bg-[#b91c1c] text-white text-sm font-semibold transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add User
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
          placeholder="Search by name or email..."
          className="w-full h-11 pl-10 pr-4 bg-white border border-slate-200 rounded-lg text-sm text-[#092f3b] placeholder-slate-400 outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
        />
      </div>

      {loading ? (
        <Loading label="Loading users..." />
      ) : (
        <>
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-4 py-3 text-[11px] font-bold tracking-[0.08em] uppercase text-[#66767d]">User</th>
                  <th className="px-4 py-3 text-[11px] font-bold tracking-[0.08em] uppercase text-[#66767d] hidden md:table-cell">Role</th>
                  <th className="px-4 py-3 text-[11px] font-bold tracking-[0.08em] uppercase text-[#66767d] hidden sm:table-cell">Status</th>
                  <th className="px-4 py-3 text-[11px] font-bold tracking-[0.08em] uppercase text-[#66767d] hidden lg:table-cell">Last Login</th>
                  <th className="px-4 py-3 text-right text-[11px] font-bold tracking-[0.08em] uppercase text-[#66767d]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center">
                      <UserIcon className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                      <p className="text-sm font-semibold text-[#092f3b]">No users found</p>
                      <p className="text-xs text-[#66767d] mt-1">Add your first team member</p>
                    </td>
                  </tr>
                ) : (
                  items.map((item) => (
                    <tr key={item._id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-[#062e3b] rounded-full flex items-center justify-center shrink-0">
                            <span className="text-xs font-bold text-white uppercase">
                              {item.name?.charAt(0) || "U"}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-[#092f3b] truncate">
                              {item.name}
                              {currentUser?._id === item._id && (
                                <span className="ml-2 text-[10px] font-bold text-white bg-[#062e3b] px-1.5 py-0.5 rounded">YOU</span>
                              )}
                            </p>
                            <p className="text-xs text-[#66767d] truncate">{item.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <StatusBadge status={item.role} />
                      </td>
                      <td className="px-4 py-4 hidden sm:table-cell">
                        <StatusBadge status={item.status} />
                      </td>
                      <td className="px-4 py-4 hidden lg:table-cell">
                        <span className="text-xs text-[#66767d]">
                          {item.lastLogin ? new Date(item.lastLogin).toLocaleString() : "Never"}
                        </span>
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
                            disabled={currentUser?._id === item._id}
                            title={currentUser?._id === item._id ? "Cannot delete your own account" : "Delete"}
                            className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
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
            <Pagination page={page} totalPages={totalPages} total={total} onPageChange={setPage} />
          )}
        </>
      )}

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title={editing ? "Edit User" : "Add User"}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Full Name" required>
            <input className={inputClass} value={form.name} onChange={set("name")} placeholder="Full name" required />
          </Field>
          <Field label="Email" required>
            <input type="email" className={inputClass} value={form.email} onChange={set("email")} placeholder="user@ceypetco.gov.lk" required />
          </Field>
          <Field label={editing ? "New Password (leave blank to keep)" : "Password"} required={!editing}>
            <input type="password" className={inputClass} value={form.password} onChange={set("password")} placeholder={editing ? "••••••••" : "Minimum 6 characters"} required={!editing} minLength={editing ? undefined : 6} />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Role">
              <select className={selectClass} value={form.role} onChange={set("role")}>
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="super_admin">Super Admin</option>
              </select>
            </Field>
            <Field label="Status">
              <select className={selectClass} value={form.status} onChange={set("status")}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </Field>
          </div>
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
            <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-semibold text-[#092f3b] hover:bg-slate-50 transition-colors">Cancel</button>
            <button type="submit" disabled={saving} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#dc2626] hover:bg-[#b91c1c] text-white text-sm font-semibold transition-colors disabled:opacity-50">
              <Pencil className="w-4 h-4" />
              {saving ? "Saving..." : editing ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </Modal>

      <Modal open={!!showDelete} onClose={() => setShowDelete(null)} title="Delete User" size="sm">
        <div className="text-center">
          <div className="w-14 h-14 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-7 h-7 text-red-600" />
          </div>
          <p className="text-sm text-[#66767d] mb-2">Are you sure you want to delete this user?</p>
          <p className="text-sm font-bold text-[#092f3b] mb-6">{showDelete?.name}</p>
          <div className="flex items-center justify-center gap-3">
            <button onClick={() => setShowDelete(null)} className="px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-semibold text-[#092f3b] hover:bg-slate-50 transition-colors">Cancel</button>
            <button onClick={handleDelete} disabled={deleting} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors disabled:opacity-50">
              <Trash2 className="w-4 h-4" />
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserManagement;
